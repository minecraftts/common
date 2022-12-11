import { Position } from "@lilithmod/unborn-mcproto";
import Direction from "../../../../util/Direction";
import Packet from "../../Packet";

export default class C10SpawnPainting extends Packet<C10SpawnPainting> {
    public id: number = 0x10;

    public entityId: number = -1;
    public title: string = "";
    public location: Position = { x: 0, y: 0, z: 0 };
    public direction: Direction = Direction.NORTH;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("title", "str");
        this.addSerializableField("location", "pos");
        this.addSerializableField("direction", "u8");
    }
}