import Packet from "../../Packet";

export default class C2ECloseWindow extends Packet<C2ECloseWindow> {
    public id: number = 0x2e;

    public windowId: number = 0;

    public register(): void {
        this.addSerializableField("windowId", "u8");
    }
}