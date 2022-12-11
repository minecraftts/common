import Packet from "../../Packet";

export default class C2CSpawnGlobalEntity extends Packet<C2CSpawnGlobalEntity> {
    public id: number = 0x2c;

    public entityId: number = 0;
    public type: number = 1;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("type", "i8");
        this.addSerializableField("x", "i32");
        this.addSerializableField("y", "i32");
        this.addSerializableField("z", "i32");
    }
}