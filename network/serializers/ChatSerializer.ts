import { PacketWriter, PacketReader } from "@lilithmod/unborn-mcproto";
import { Logger } from "@minecraftts/logger";
import ChatMessage from "../../chat/ChatMessage";
import StaticImplements from "../../util/StaticImplements";
import ISerializer from "./ISerializer";

@StaticImplements<ISerializer>()
export default class ChatSerializer {
    public static serialize(writer: PacketWriter, value: ChatMessage | string): void {
        if (typeof value === "string") {
            writer.writeString(value)
        } else {
            writer.writeString(JSON.stringify(value));
        }
    }

    public static deserialize(reader: PacketReader): ChatMessage | string {
        const data = reader.readString();

        try {
            return JSON.parse(data);
        } catch (e) {
            Logger.error(e);
            return data;
        }
    }
}