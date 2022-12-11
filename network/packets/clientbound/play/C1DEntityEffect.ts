import Packet from "../../Packet";

export default class C1DEntityEffect extends Packet<C1DEntityEffect> {
    public id: number = 0x1d;

    public entityId: number = -1;
    public effectId: number = 0;
    public amplifier: number = 0;
    public duration: number = 0;
    public hideParticles: boolean = false;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("effectId", "i8");
        this.addSerializableField("amplifier", "i8");
        this.addSerializableField("duration", "vint");
        this.addSerializableField("hideParticles", "bool");
    }
}