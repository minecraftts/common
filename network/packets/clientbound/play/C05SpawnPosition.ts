import { Position } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class C05SpawnPosition extends Packet<C05SpawnPosition> {
    public id: number = 0x05;
    public location: Position = { x: 0, y: 0, z: 0 };

    public register(): void {
        this.addSerializableField("location", "pos");
    }
}