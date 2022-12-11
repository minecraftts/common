import Packet from "../../Packet";

export default class C19EntityHeadLook extends Packet<C19EntityHeadLook> {
    public id: number = 0x19;

    public entityId: number = -1;
    public headYaw: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("headYaw", "i8");
    }
}