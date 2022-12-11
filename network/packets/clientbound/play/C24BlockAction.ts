import Position from "../../../../util/Position";
import Packet from "../../Packet";

export default class C24BlockAction extends Packet<C24BlockAction> {
    public id: number = 0x24;

    public position: Position = {x: 0, y: 0, z: 0};
    public dataByte1: number = 0;
    public dataByte2: number = 0;
    public blockType: number = 0;

    public register(): void {
        this.addSerializableField("position", "pos");
        this.addSerializableField("dataByte1", "u8");
        this.addSerializableField("dataByte2", "u8");
        this.addSerializableField("blockType", "vint");
    }
}