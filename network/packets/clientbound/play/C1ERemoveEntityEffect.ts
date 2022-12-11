import Packet from "../../Packet";

export default class C1ERemoveEntityEffect extends Packet<C1ERemoveEntityEffect> {
    public id: number = 0x1e;

    public entityId: number = -1;
    public effectId: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("effectId", "i8");
    }
}