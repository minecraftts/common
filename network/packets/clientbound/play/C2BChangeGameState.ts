import Packet from "../../Packet";

export default class C2BChangeGameState extends Packet<C2BChangeGameState> {
    public id: number = 0x2b;

    public reason: number = 0;
    public value: number = 0;

    public register(): void {
        this.addSerializableField("reason", "u8");
        this.addSerializableField("value", "f32");
    }
}