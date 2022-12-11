import Packet from "../../Packet";

export default class C06UpdateHealth extends Packet<C06UpdateHealth> {
    public id: number = 0x06;

    public health: number = 20;
    public food: number = 20;
    public saturation: number = 5;

    public register(): void {
        this.addSerializableField("health", "f32");
        this.addSerializableField("food", "vint");
        this.addSerializableField("saturation", "f32");
    }
}