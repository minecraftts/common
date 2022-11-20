import { PacketWriter, PacketReader } from "@lilithmod/unborn-mcproto";
import { Logger } from "@minecraftts/logger";
import ChatMessage from "../../chat/ChatMessage";

export default class ChatSerialize {
    public static chatSerializer(writer: PacketWriter, value: ChatMessage | string): void {
        if (typeof value === "string") {
            writer.writeString(value)
        } else {
            writer.writeString(JSON.stringify(value));
        }
    }

    public static chatDeserializer(reader: PacketReader): ChatMessage | string {
        const data = reader.readString();

        try {
            return JSON.parse(data);
        } catch (e) {
            Logger.error(e);
            return data;
        }
    }
}