import Dimension from "../../../../world/Dimension";
import Packet from "../../Packet";

export default class C07Respawn extends Packet<C07Respawn> {
    public id: number = 0x07;
    public dimension: Dimension = Dimension.OVERWORLD;

    public register(): void {
        
    }
}