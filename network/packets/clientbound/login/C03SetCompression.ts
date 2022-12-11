import Packet from "../../Packet";

export default class C03SetCompression extends Packet<C03SetCompression> {
    public id = 0x03;
    public threshold: number = -1;

    public register(): void {
        this.addSerializableField("threshold", "vint");
    }
}