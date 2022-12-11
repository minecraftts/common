import ChatMessage from "../../../../chat/ChatMessage";
import Position from "../../../../util/Position";
import ChatSerializer from "../../../serializers/ChatSerializer";
import Packet from "../../Packet";

export default class C33UpdateSign extends Packet<C33UpdateSign> {
    public id: number = 0x33;

    public location: Position = { x: 0, y: 0, z: 0 };

    public line1: ChatMessage | string = "";
    public line2: ChatMessage | string = "";
    public line3: ChatMessage | string = "";
    public line4: ChatMessage | string = "";

    public register(): void {
        this.addSerializableField("location", "pos");
        this.addSerializableField("line1", "custom", ChatSerializer.serialize, ChatSerializer.deserialize);
        this.addSerializableField("line2", "custom", ChatSerializer.serialize, ChatSerializer.deserialize);
        this.addSerializableField("line3", "custom", ChatSerializer.serialize, ChatSerializer.deserialize);
        this.addSerializableField("line4", "custom", ChatSerializer.serialize, ChatSerializer.deserialize);
    }
}