import Slot from "../../../../items/Slot";
import ShortPrefixedListSerializer from "../../../serializers/ShortPrefixedListSerializer";
import SlotSerializer from "../../../serializers/SlotSerializer";
import Packet from "../../Packet";

export default class C30WindowItems extends Packet<C30WindowItems> {
    public id: number = 0x30;

    public windowId: number = 0;
    public slotData: Slot[] = [];

    public register(): void {
        this.addSerializableField("windowId", "u8");
        this.addSerializableField("slotData", "custom",
            ShortPrefixedListSerializer.createSerialize(SlotSerializer.serialize),
            ShortPrefixedListSerializer.createDeserialize(SlotSerializer.deserialize));
    }
}