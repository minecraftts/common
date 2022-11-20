import { Position } from "@lilithmod/unborn-mcproto";
import Slot from "../items/Slot";
import EntityMetadataType from "./EntityMetadataType";
import Rotation from "./Rotation";

type EntityMetadataValue = {
    type: EntityMetadataType.BYTE | EntityMetadataType.SHORT | EntityMetadataType.INT | EntityMetadataType.FLOAT,
    value: number,
    key: number
} | {
    type: EntityMetadataType.STRING,
    value: string,
    key: number
} | {
    type: EntityMetadataType.SLOT,
    value: Slot,
    key: number
} | {
    type: EntityMetadataType.POSITION,
    value: Position,
    key: number
} | {
    type: EntityMetadataType.ROTATION,
    value: Rotation,
    key: number
};

export default EntityMetadataValue;