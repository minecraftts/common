import Packet from "../../Packet";

export default class S01PingRequest extends Packet<S01PingRequest> {
    public id: number = 0x01;

    public payload: bigint = 0n;

    public register(): void {
        this.addSerializableField("payload", "i64");
    }
}