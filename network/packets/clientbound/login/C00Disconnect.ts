import ChatMessage from "../../../../chat/ChatMessage";
import ChatSerializer from "../../../serializers/ChatSerializer";
import Packet from "../../Packet";

export default class C00Disconnect extends Packet<C00Disconnect> {
    public id: number = 0x00;
    public reason: ChatMessage = {};

    public register(): void {
        this.addSerializableField("reason", "custom", ChatSerializer.serialize, ChatSerializer.deserialize);
    }
}