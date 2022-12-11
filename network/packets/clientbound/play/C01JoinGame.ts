import Dimension from "../../../../world/Dimension";
import Packet from "../../Packet";

export default class C01JoinGame extends Packet<C01JoinGame> {
    public id: number = 0x01;

    public entityId: number = 0;
    public gamemode: number = 0;
    public dimension: Dimension = Dimension.OVERWORLD;
    public difficulty: number = 2;
    public maxPlayers: number = 10;
    public levelType: string = "default";
    public reducedDebugInfo: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "i32");
        this.addSerializableField("gamemode", "u8");
        this.addSerializableField("dimension", "i8");
        this.addSerializableField("difficulty", "u8");
        this.addSerializableField("maxPlayers", "u8");
        this.addSerializableField("levelType", "str");
        this.addSerializableField("reducedDebugInfo", "u8");
    }
}