import { PacketReader } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class SFELegacyServerListPing extends Packet<SFELegacyServerListPing> {
    public id: number = 0xFE;

    public valid: boolean = true;

    public register(): void {
        
    }

    public deserialize(reader: PacketReader): Packet {
        const packet = new SFELegacyServerListPing();

        this.valid = reader.readUInt8() === 0x01 && reader.readUInt8() === 0xfa;

        return packet;
    }
}