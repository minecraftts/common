import Position from "../../../../util/Position";
import Packet from "../../Packet";

export default class C27Explosion extends Packet<C27Explosion> {
    public id: number = 0x27;

    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    public records: Position[] = [];

    public playerMotionX: number = 0;
    public playerMotionY: number = 0;
    public playerMotionZ: number = 0;

    public register(): void {
        this.addSerializableField("x", "f32");
        this.addSerializableField("y", "f32");
        this.addSerializableField("z", "f32");

        this.addSerializableField("records", "custom", (writer, value: Position[]) => {
            writer.writeInt32(value.length);

            value.forEach(position => {
                writer.writeInt8(position.x);
                writer.writeInt8(position.y);
                writer.writeInt8(position.z);
            });
        }, (reader): Position[] => {
            const array = new Array(reader.readInt32());

            for (let i = 0; i < array.length; i++) {
                array[i] = {
                    x: reader.readInt8(),
                    y: reader.readInt8(),
                    z: reader.readInt8()
                };
            }

            return array;
        });

        this.addSerializableField("playerMotionX", "f32");
        this.addSerializableField("playerMotionY", "f32");
        this.addSerializableField("playerMotionZ", "f32")
    }
}