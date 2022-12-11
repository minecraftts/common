import Packet from "../../Packet";

export default class C02LoginSuccess extends Packet<C02LoginSuccess> {
    public id: number = 0x02;
    public uuid: string = "";
    public username: string = "";

    public register(): void {
        this.addSerializableField("uuid", "str");
        this.addSerializableField("username", "str");
    }
}