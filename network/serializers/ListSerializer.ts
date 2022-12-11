import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";
import StaticImplements from "../../util/StaticImplements";
import PacketDeserializeFun from "../packets/PacketDeserializeFun";
import PacketSerializeFun from "../packets/PacketSerializeFun";
import ISerializer from "./ISerializer";

@StaticImplements<ISerializer>()
export default class ListSerializer {
    public static serialize(writer: PacketWriter, list: unknown[], itemSerializer: PacketSerializeFun): void {
        writer.writeVarInt(list.length);

        list.forEach(value => itemSerializer(writer, value));
    }

    public static deserialize(reader: PacketReader, itemDeserializer: PacketDeserializeFun): unknown[] {
        const count = reader.readVarInt();
        const array = new Array(count);

        for (let i = 0; i < count; i++) {
            array[i] = itemDeserializer(reader);
        }

        return array;
    }

    public static createSerialize(itemSerializer: PacketSerializeFun): PacketSerializeFun {
        return (writer: PacketWriter, value: any) => {
            ListSerializer.serialize(writer, value, itemSerializer);
        }
    }

    public static createDeserialize(itemDeserializer: PacketDeserializeFun): PacketDeserializeFun {
        return (reader: PacketReader): any => {
            ListSerializer.deserialize(reader, itemDeserializer);
        }
    }
}