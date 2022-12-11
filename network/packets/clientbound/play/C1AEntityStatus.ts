import Packet from "../../Packet";

export default class C1AEntityStatus extends Packet<C1AEntityStatus> {
    public id = 0x1a;
    
    public entityId: number = -1;
    public entityStatus: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("entityStatus", "i8");
    }
}