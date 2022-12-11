import Packet from "../../Packet";

export default class S00LoginStart extends Packet<S00LoginStart> {
    public id = 0x00;
    public name: string = "";

    public register(): void {
        this.addSerializableField("name", "str");
    }
}