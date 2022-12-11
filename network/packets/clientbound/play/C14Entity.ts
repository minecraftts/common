import Packet from "../../Packet";

export default class C14Entity extends Packet<C14Entity> {
    public id: number = 0x14;

    public entityId: number = -1;

    public register(): void {
        this.addSerializableField("entityId", "vint");
    }
}