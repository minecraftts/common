import Packet from "../../Packet";

export default class C09HeldItemChange extends Packet<C09HeldItemChange> {
    public id: number = 0x09;
    public slot: number = 0;

    public register(): void {
        this.addSerializableField("slot", "i8");
    }
}