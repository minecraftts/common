import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";
import { NBT } from "prismarine-nbt";
import Slot from "../../items/Slot";
import StaticImplements from "../../util/StaticImplements";
import ISerializer from "./ISerializer";

@StaticImplements<ISerializer>()
export default class SlotSerializer {
    public static serialize(writer: PacketWriter, slot: Slot): void {
        writer.writeInt16(slot.itemId);

        if (slot.itemId !== -1 && "itemCount" in slot) {
            writer.writeInt8(slot.itemCount);
            writer.writeInt16(slot.itemDamage);

            if (slot.nbt) {
                writer.writeNBT(slot.nbt);
            } else {
                writer.writeInt8(0);
            }
        } 
    }

    public static deserialize(reader: PacketReader): Slot {
        const itemId = reader.readInt16();

        if (itemId === -1) {
            return { itemId };
        } else {
            const itemCount = reader.readInt8();
            const itemDamage = reader.readInt8();
            const hasNbt = reader.readInt8();

            if (hasNbt !== 0) {
                reader.offset--;
                const nbt = <NBT>reader.readNBT();

                return {
                    itemId,
                    itemCount,
                    itemDamage,
                    nbt
                };
            }

            return {
                itemId,
                itemCount,
                itemDamage
            };
        }
    }
}