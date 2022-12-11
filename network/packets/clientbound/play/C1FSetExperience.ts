import Packet from "../../Packet";

export default class C1FSetExperience extends Packet<C1FSetExperience> {
    public id: number = 0x1f;

    public expBar: number = 0;
    public level: number = 0;
    public totalExp: number = 0;

    public register(): void {
        this.addSerializableField("expBar", "f32");
        this.addSerializableField("level", "vint");
        this.addSerializableField("totalExp", "vint");
    }
}