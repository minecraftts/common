import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";
import { Logger } from "@minecraftts/logger";

export default class JsonSerialize {
    public static jsonSerializer(writer: PacketWriter, value: any) {
        writer.writeString(JSON.stringify(value));
    }

    public static jsonDeserializer(reader: PacketReader): any {
        const data = reader.readString();

        try {
            return JSON.parse(data);
        } catch (e) {
            Logger.error(e);
            return {};
        }
    }
}