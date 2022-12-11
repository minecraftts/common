import Packet from "../../Packet";

export default class C18EntityTeleport extends Packet<C18EntityTeleport> {
    public id: number = 0x18;

    public entityId: number = -1;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public yaw: number = 0;
    public pitch: number = 0;
    public onGround: boolean = true;

    public register(): void {
        this.addSerializableField("x", "i32");
        this.addSerializableField("y", "i32");
        this.addSerializableField("z", "i32");
        this.addSerializableField("yaw", "i8");
        this.addSerializableField("pitch", "i8");
        this.addSerializableField("onGround", "bool");
    }
}