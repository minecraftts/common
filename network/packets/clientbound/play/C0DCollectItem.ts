import Packet from "../../Packet";

export default class C0DCollectItem extends Packet<C0DCollectItem> {
    public id: number = 0x0d;

    public collectedId: number = -1;
    public collectorId: number = -1;

    public register(): void {
        this.addSerializableField("collectedId", "vint");
        this.addSerializableField("collectorId", "vint");
    }
}