import Packet from "../../Packet";

// TODO
export default class C26MapChunkBulk extends Packet<C26MapChunkBulk> {
    public id: number = 0x26;

    public skyLightSent: boolean = true;

    public register(): void {
        this.addSerializableField("skyLightSent", "bool");
    }
}