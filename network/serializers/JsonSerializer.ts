import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";
import { Logger } from "@minecraftts/logger";
import StaticImplements from "../../util/StaticImplements";
import ISerializer from "./ISerializer";

@StaticImplements<ISerializer>()
export default class JsonSerializer {
    public static serialize(writer: PacketWriter, value: any) {
        writer.writeString(JSON.stringify(value));
    }

    public static deserialize(reader: PacketReader): any {
        const data = reader.readString();

        try {
            return JSON.parse(data);
        } catch (e) {
            Logger.error(e);
            return {};
        }
    }
}