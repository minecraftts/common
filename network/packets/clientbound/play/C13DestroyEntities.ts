import { PacketWriter } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class C13DestroyEntities extends Packet<C13DestroyEntities> {
    public id: number = 0x13;

    public entities: number[] = [];

    public register(): void {
        this.addSerializableField("entities", "custom", (writer: PacketWriter, values: number[]) => {
            writer.writeVarInt(values.length);
            values.forEach(id => writer.writeVarInt(id));
        }, () => {});
    }
}