import Packet from "../../Packet";

export default class C12EntityVelocity extends Packet<C12EntityVelocity> {
    public id: number = 0x12;

    public entityId: number = -1;
    public velocityX: number = 0;
    public velocityY: number = 0;
    public velocityZ: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("velocityX", "i16");
        this.addSerializableField("velocityY", "i16");
        this.addSerializableField("velocityZ", "i16");
    }
}