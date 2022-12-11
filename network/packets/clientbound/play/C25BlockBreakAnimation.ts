import Position from "../../../../util/Position";
import Packet from "../../Packet";

export default class C25BlockBreakAnimation extends Packet<C25BlockBreakAnimation> {
    public id: number = 0x25;

    public entityId: number = 0;
    public location: Position = { x: 0, y: 0, z: 0 };
    public destroyStage: number = -1;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("location", "pos");
        this.addSerializableField("destroyStage", "i8");
    }
}