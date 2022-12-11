import { PacketReader } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class S01EncryptionResponse extends Packet<S01EncryptionResponse> {
    public id = 0x01;

    public sharedSecret: Buffer = Buffer.alloc(0);
    public verifyToken: Buffer = Buffer.alloc(0);

    public register(): void {}
    
    public deserialize(reader: PacketReader): Packet {
        const packet = new S01EncryptionResponse();

        packet.sharedSecret = reader.read(reader.readVarInt());
        packet.verifyToken = reader.read(reader.readVarInt());

        return packet;
    }
}