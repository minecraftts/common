import { NBT } from "prismarine-nbt";

type Slot = {
    itemId: -1
} | {
    itemId: number,
    itemCount: number,
    itemDamage: number,
    nbt?: NBT
};

export default Slot;