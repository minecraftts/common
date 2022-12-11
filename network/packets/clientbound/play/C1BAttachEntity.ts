import Packet from "../../Packet";

export default class C1BAttachEntity extends Packet<C1BAttachEntity> {
    public id: number = 0x1b;

    public entityId: number = -1;
    public vehicleId: number = -1;
    public leash: boolean = false;

    public register(): void {
        this.addSerializableField("entityId", "i32");
        this.addSerializableField("vehicleId", "i32");
        this.addSerializableField("leash", "bool");
    }
}