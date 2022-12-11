import Packet from "../../Packet";

export default class C03TimeUpdate extends Packet<C03TimeUpdate> {
    public id: number = 0x03;

    public worldAge: bigint = 0n;
    public timeOfDay: bigint = 0n;

    public register(): void {
        this.addSerializableField("worldAge", "i64");
        this.addSerializableField("timeOfDay", "i64");
    }
}