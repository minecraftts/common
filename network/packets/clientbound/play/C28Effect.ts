import Position from "../../../../util/Position";
import Packet from "../../Packet";

export default class C28Effect extends Packet<C28Effect> {
    public id: number = 0x28;

    public effectId: number = 0;
    public location: Position = { x: 0, y: 0, z: 0 };
    public data: number = 0;
    public disableRelativeVolume = false;

    public register(): void {
        this.addSerializableField("effectId", "i32");
        this.addSerializableField("location", "pos");
        this.addSerializableField("data", "i32");
        this.addSerializableField("disableRelativeVolume", "bool");
    }
}