import Position from "../../../../util/Position";
import Packet from "../../Packet";

export default class C23BlockChange extends Packet<C23BlockChange> {
    public id: number = 0x23;

    public position: Position = {x: 0, y: 0, z: 0};
    public blockId: number = 0;

    public register(): void {
        this.addSerializableField("position", "pos");
        this.addSerializableField("blockId", "vint");
    }
}
