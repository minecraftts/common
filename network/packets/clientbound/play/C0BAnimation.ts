import Packet from "../../Packet";

export default class C0BAnimation extends Packet<C0BAnimation> {
    public id: number = 0x0b;
    public entityId: number = -1;
    public animation: number = 0;

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("animation", "u8");
    }
}