import Packet from "../../Packet";

export default class C00KeepAlive extends Packet<C00KeepAlive> {
    public id: number = 0;

    public keepAliveId: number = -1;

    public register(): void {
        this.addSerializableField("keepAliveId", "vint");
    }
}