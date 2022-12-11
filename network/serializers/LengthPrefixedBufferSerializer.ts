import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";
import StaticImplements from "../../util/StaticImplements";
import ISerializer from "./ISerializer";

@StaticImplements<ISerializer>()
export default class LengthPrefixedBufferSerializer {
    public static serialize(writer: PacketWriter, value: Buffer): void {
        writer.writeVarInt(value.length);
        writer.write(value);
    }

    public static deserialize(reader: PacketReader): Buffer {
        return reader.read(reader.readVarInt());
    }
}