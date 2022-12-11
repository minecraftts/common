import Packet from "../../Packet";

export default class S00KeepAlive extends Packet<S00KeepAlive> {
    public id: number = 0;

    public keepAliveId: number = -1;

    public register(): void {
        this.addSerializableField("keepAliveId", "vint");
    }
}