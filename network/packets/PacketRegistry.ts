import { Logger } from "@minecraftts/logger";
import fs from "fs";
import path from "path";
import ConnectionState from "../ConnectionState";
import Packet from "./Packet";
import PacketDirection from "./PacketDirection";
import PacketRegistration from "./PacketRegistration";

export default class PacketRegistry {
    private static instance: PacketRegistry;

    private readonly clientboundPacketDir: string;
    private readonly serverboundPacketDir: string;

    private clientboundPackets: Map<number, PacketRegistration>;
    private serverboundPackets: Map<number, PacketRegistration>;

    private constructor() {
        PacketRegistry.instance = this;

        this.clientboundPackets = new Map();
        this.serverboundPackets = new Map();

        this.clientboundPacketDir = path.join(__dirname, "clientbound");
        this.serverboundPacketDir = path.join(__dirname, "serverbound");
    }

    public registerPackets() {
        this.registerServerbound();
        this.registerClientbound();
    }

    public getPacketRegistration(id: number, state: ConnectionState, direction: PacketDirection): PacketRegistration | undefined {
        if (direction === PacketDirection.CLIENTBOUND) {
            return this.clientboundPackets.get(id + Math.pow(10, state));
        } else {
            return this.serverboundPackets.get(id + Math.pow(10, state));
        }
    }

    private registerPacketsInDir(state: ConnectionState, direction: PacketDirection, dir: string): void {
        if (!fs.existsSync(dir)) {
            Logger.error(`Failed to load packets from ${path.relative(__dirname, dir)} because it does not exist`);
            return;
        }

        const packetFiles: string[] = fs.readdirSync(dir).filter(value => value.endsWith(".js"));
        
        for (const packetFile of packetFiles) {
            const PacketClazz: any = require(path.join(dir, packetFile)).default;

            try {
                const packetInst: Packet = new PacketClazz();
                const packetId: number = packetInst.id;

                if (packetId === -1) {
                    throw new Error(`invalid id ${packetId}`);
                }

                packetInst.register();

                if (direction === PacketDirection.CLIENTBOUND) {
                    this.clientboundPackets.set(packetId + Math.pow(10, state), { state, packet: packetInst, direction });
                } else {
                    this.serverboundPackets.set(packetId + Math.pow(10, state), { state, packet: packetInst, direction });
                }
            } catch (e) {
                Logger.error(`A packet definition (${packetFile.replace(".js", "")}) failed to load with reason: ${(<Error>e).message}. A full stack is available below`);
                Logger.error(e);
            }
        }
    }

    private registerServerbound() {
        const handshakeDir: string = path.join(this.serverboundPacketDir, "handshaking");
        const statusDir: string = path.join(this.serverboundPacketDir, "status");
        const loginDir: string = path.join(this.serverboundPacketDir, "login");
        const playDir: string = path.join(this.serverboundPacketDir, "play");

        this.registerPacketsInDir(ConnectionState.HANDSHAKING, PacketDirection.SERVERBOUND, handshakeDir);
        this.registerPacketsInDir(ConnectionState.STATUS, PacketDirection.SERVERBOUND, statusDir);
        this.registerPacketsInDir(ConnectionState.LOGIN, PacketDirection.SERVERBOUND, loginDir);
        this.registerPacketsInDir(ConnectionState.PLAY, PacketDirection.SERVERBOUND, playDir);
    }

    private registerClientbound() {
        const statusDir: string = path.join(this.clientboundPacketDir, "status");
        const loginDir: string = path.join(this.clientboundPacketDir, "login");
        const playDir: string = path.join(this.clientboundPacketDir, "play");

        this.registerPacketsInDir(ConnectionState.STATUS, PacketDirection.CLIENTBOUND, statusDir);
        this.registerPacketsInDir(ConnectionState.LOGIN, PacketDirection.CLIENTBOUND, loginDir);
        this.registerPacketsInDir(ConnectionState.PLAY, PacketDirection.CLIENTBOUND, playDir);
    }

    public static getInstance(): PacketRegistry {
        return PacketRegistry.instance;
    }

    static {
        new PacketRegistry();
    }
}