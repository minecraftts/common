import Packet from "../../Packet";

export default class C17EntityLookAndRelativeMove extends Packet<C17EntityLookAndRelativeMove> {
    public id: number = 0x17;

    public entityId: number = -1;
    public deltaX: number = 0;
    public deltaY: number = 0;
    public deltaZ: number = 0;
    public yaw: number = 0;
    public pitch: number = 0;
    public onGround: boolean = true;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("deltaX", "i8");
        this.addSerializableField("deltaY", "i8");
        this.addSerializableField("deltaZ", "i8");
        this.addSerializableField("yaw", "i8");
        this.addSerializableField("pitch", "i8");
        this.addSerializableField("onGround", "bool");
    }
}