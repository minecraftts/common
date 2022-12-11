import Packet from "../../Packet";

export default class C11SpawnExperienceOrb extends Packet<C11SpawnExperienceOrb> {
    public id: number = 0x11;

    public entityId: number = -1;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public count: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("x", "i32");
        this.addSerializableField("y", "i32");
        this.addSerializableField("z", "i32");
        this.addSerializableField("count", "i16");
    }
}