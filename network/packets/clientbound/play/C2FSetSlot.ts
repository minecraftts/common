import Slot from "../../../../items/Slot";
import SlotSerializer from "../../../serializers/SlotSerializer";
import Packet from "../../Packet";

export default class C2FSetSlot extends Packet<C2FSetSlot> {
    public id: number = 0x2f;

    public windowId: number = 0;
    public slot: number = 0;
    public slotData: Slot = { itemId: -1 };

    public register(): void {
        this.addSerializableField("windowId", "i8");
        this.addSerializableField("slot", "i16");
        this.addSerializableField("slotData", "custom", SlotSerializer.serialize, SlotSerializer.deserialize);
    }
}