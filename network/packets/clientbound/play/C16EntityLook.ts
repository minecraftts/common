import Packet from "../../Packet";

export default class C16EntityLook extends Packet<C16EntityLook> {
    public id: number = 0x16;

    public entityId: number = -1;
    public yaw: number = 0;
    public pitch: number = 0;
    public onGround: boolean = true;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("yaw", "i8");
        this.addSerializableField("pitch", "i8");
        this.addSerializableField("onGround", "bool");
    }
}