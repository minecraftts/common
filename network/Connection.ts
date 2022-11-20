import { PacketReader } from "@lilithmod/unborn-mcproto";
import { Logger } from "@minecraftts/logger";
import crypto, { Cipher, Decipher } from "crypto";
import { Socket } from "net";
import ConnectionState from "./ConnectionState";
import Packet from "./packets/Packet";
import PacketDirection from "./packets/PacketDirection";
import PacketListenerFun from "./packets/PacketListenerFun";
import PacketRegistry from "./packets/PacketRegistry";
import PacketFramer from "./transform/PacketFramer";
import PacketSplitter from "./transform/PacketSplitter";

export default class Connection {
    private readonly packetRegistry: PacketRegistry;

    private readonly socket: Socket;
    private readonly direction: PacketDirection;

    private readonly splitter: PacketSplitter;
    private readonly framer: PacketFramer;

    private readonly listeners: Map<ConnectionState, Map<number, PacketListenerFun<Packet>[]>>;

    private state: ConnectionState;

    private secret?: Buffer;

    private cipher?: Cipher;
    private decipher?: Decipher;

    public constructor(socket: Socket, direction: PacketDirection) {
        this.packetRegistry = PacketRegistry.getInstance();

        this.socket = socket;
        this.direction = direction;

        this.framer = new PacketFramer();
        this.splitter = new PacketSplitter();

        this.listeners = new Map();

        this.socket.pipe(this.splitter);
        this.framer.pipe(this.socket);

        this.state = ConnectionState.HANDSHAKING;

        this.splitter.on("error", (e) => {
            Logger.error(e);
            this.socket.destroy(e);
        });

        this.splitter.on("data", (data: Buffer) => {
            const packetReader = new PacketReader(data);
            const id = packetReader.id;

            const registration = this.packetRegistry.getPacketRegistration(id, this.state, this.direction);

            if (!registration) {
                Logger.warn(`Failed to find packet registration for 0x${id.toString(16).padStart(2, "0")}`);
                return;
            }

            const deserialized = registration.packet.deserialize(packetReader);

            if (!this.listeners.has(this.state)) {
                this.listeners.set(this.state, new Map());
            }

            const statePacketListeners = this.listeners.get(this.state);

            if (!statePacketListeners) {
                throw new Error(`state ${this.state} does not have a listeners map`);
            }

            const listenersArray = statePacketListeners.get(id) ?? [];

            listenersArray.forEach(listener => {
                listener(deserialized);
            });
        });

        this.splitter.on("close", () => this.framer.end());
    }

    public addListener<T extends Packet>(id: number, state: ConnectionState, listener: PacketListenerFun<T>): void {
        if (!this.listeners.has(state)) {
            this.listeners.set(state, new Map());
        }

        const statePacketListeners = this.listeners.get(state);

        if (!statePacketListeners) {
            throw new Error(`state ${state} does not have a listeners map`);
        }

        const listenersArray = statePacketListeners.get(id) ?? [];

        if (!statePacketListeners.has(id)) {
            statePacketListeners.set(id, listenersArray);
        }

        listenersArray.push(<PacketListenerFun<any>>listener);
    }


    public removeListener(id: number, state: ConnectionState, listener: PacketListenerFun<any>): void {
        if (!this.listeners.has(state)) {
            this.listeners.set(state, new Map());
        }

        const statePacketListeners = this.listeners.get(state);

        if (!statePacketListeners) {
            throw new Error(`state ${state} does not have a listeners map`);
        }

        const listenersArray = statePacketListeners.get(id) ?? [];
        const index = listenersArray.findIndex(value => value === listener);

        listenersArray.splice(index, 1);
    }

    public awaitPacket<T extends Packet>(timeout: number, id: number, state: ConnectionState): Promise<T> {
        const timeoutPromise = new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Packet wait timed out"));
            }, timeout);
        });

        const packetPromise = new Promise<T>(resolve => {
            const listener = (packet: T) => {
                this.removeListener(id, state, listener);

                resolve(packet);
            }

            this.addListener<T>(id, state, listener);
        });

        return Promise.race<T>([
            packetPromise,
            timeoutPromise
        ]);
    }

    public writeRaw(packet: Buffer): void {
        this.framer.write(packet);
    }

    public writePacket(packet: Packet): void {
        packet.preSerialize();

        this.writeRaw(packet.serialize().encode());
    }

    public setEncryption(secret: Buffer): void {
        this.secret = secret;

        this.cipher = crypto.createCipheriv("aes-128-cfb8", secret, secret);
        this.decipher = crypto.createDecipheriv("aes-128-cfb8", secret, secret);

        this.socket.unpipe();
        this.framer.unpipe();

        this.socket.pipe(this.decipher).pipe(this.splitter);
        this.framer.pipe(this.cipher).pipe(this.socket);
    }

    public setCompression(threshold: number): void {
        this.framer.setCompressionThreshold(threshold);
        this.splitter.setCompressionThreshold(threshold);
    }

    public setState(state: ConnectionState): void {
        this.state = state;
    }

    public getState(): ConnectionState {
        return this.state;
    }

    public getSocket(): Socket {
        return this.socket;
    }

    public isEncrypted(): boolean {
        return typeof this.secret !== "undefined";
    }
}