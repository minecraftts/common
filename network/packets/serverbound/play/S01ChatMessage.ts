import Packet from "../../Packet";

export default class S01ChatMessage extends Packet<S01ChatMessage> {
    public id: number = 0x01;
    public message: string = "";

    public register(): void {
        this.addSerializableField("message", "str");
    } 
}