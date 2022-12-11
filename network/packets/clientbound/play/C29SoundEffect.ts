import Packet from "../../Packet";

export default class C29SoundEffect extends Packet<C29SoundEffect> {
    public id: number = 0x29;

    public soundName: string = "";
    public effectPositionX: number = 0;
    public effectPositionY: number = 0;
    public effectPositionZ: number = 0;
    public volume: number = 1;
    public pitch: number = 63;

    public register(): void {
        this.addSerializableField("soundName", "str");
        this.addSerializableField("effectPositionX", "i32");
        this.addSerializableField("effectPositionY", "i32");
        this.addSerializableField("effectPositionZ", "i32");
        this.addSerializableField("volume", "f32");
        this.addSerializableField("pitch", "u8");
    }
}