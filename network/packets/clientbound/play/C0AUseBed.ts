import { Position } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class C0AUseBed extends Packet<C0AUseBed> {
    public id: number = 0x0a;
    public entityId: number = -1;
    public location: Position = { x: 0, y: 0, z: 0 };

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("location", "pos");
    }
}