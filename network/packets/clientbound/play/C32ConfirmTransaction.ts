import Packet from "../../Packet";

export default class C32ConfirmTransaction extends Packet<C32ConfirmTransaction> {
    public id: number = 0x32;

    public windowId: number = 0;
    public actionNumber: number = 0;
    public accepted: boolean = false;

    public register(): void {
        this.addSerializableField("windowId", "i8");
        this.addSerializableField("actionNumber", "i16");
        this.addSerializableField("accepted", "bool");
    }
}