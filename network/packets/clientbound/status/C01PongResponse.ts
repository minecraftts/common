import Packet from "../../Packet";

export default class C01PongResponse extends Packet<C01PongResponse> {
    public id: number = 0x01;

    public payload: bigint = 0n;

    public register(): void {
        this.addSerializableField("payload", "i64");
    }
}