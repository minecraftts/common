import { PacketWriter } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class C01EncryptionRequest extends Packet<C01EncryptionRequest> {
    public id: number = 0x01;
    public serverId: string = "";
    public publicKey: Buffer = Buffer.alloc(0);
    public verifyToken: Buffer = Buffer.alloc(0);

    public register(): void {}

    public serialize(): PacketWriter {
        return new PacketWriter(this.id)
            .writeString(this.serverId)
            .writeVarInt(this.publicKey.length)
            .write(this.publicKey)
            .writeVarInt(this.verifyToken.length)
            .write(this.verifyToken);
    }
}