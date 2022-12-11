import Packet from "../../Packet";

export default class C08PositionAndLook extends Packet<C08PositionAndLook> {
    public id: number = 0x08;

    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public yaw: number = 0;
    public pitch: number = 0;
    public flags: number = 0;

    public register(): void {
        this.addSerializableField("x", "f64");
        this.addSerializableField("y", "f64");
        this.addSerializableField("z", "f64");
        this.addSerializableField("yaw", "f32");
        this.addSerializableField("pitch", "f32");
        this.addSerializableField("flags", "i8");
    }
}