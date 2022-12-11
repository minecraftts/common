import Slot from "../../../../items/Slot";
import SlotSerializer from "../../../serializers/SlotSerializer";
import Packet from "../../Packet";

export default class C04EntityEquipment extends Packet<C04EntityEquipment> {
    public id: number = 0x04;

    public entityId: number = -1;
    public slot: number = 0;
    public item: Slot = { itemId: -1 };

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("slot", "i16");
        this.addSerializableField("item", "custom", SlotSerializer.serialize, SlotSerializer.deserialize);
    }
}