import ChatMessage from "../../../../chat/ChatMessage";
import ChatPosition from "../../../../chat/ChatPosition";
import ChatSerializer from "../../../serializers/ChatSerializer";
import Packet from "../../Packet";

export default class C02ChatMessage extends Packet<C02ChatMessage> {
    public id: number = 0x02;
    public message: ChatMessage = {};
    public position: ChatPosition = ChatPosition.CHAT;

    public register(): void {
        this.addSerializableField("message", "custom", ChatSerializer.serialize, ChatSerializer.deserialize);
        this.addSerializableField("position", "i8");
    }
}