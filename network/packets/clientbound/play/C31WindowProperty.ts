import Packet from "../../Packet";

export default class C31WindowProperty extends Packet<C31WindowProperty> {
    public id: number = 0x31;

    public windowId: number = 0;
    public property: number = 0;
    public value: number = 0;

    public register(): void {
        this.addSerializableField("windowId", "u8");
        this.addSerializableField("property", "i16");
        this.addSerializableField("value", "i16");
    }
}