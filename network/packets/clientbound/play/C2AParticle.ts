import ListSerializer from "../../../serializers/ListSerializer";
import Packet from "../../Packet";

export default class C2AParticle extends Packet<C2AParticle> {
    public id: number = 0x2a;

    public particleId: number = 0;
    public longDistance: boolean = false;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public offsetX: number = 0;
    public offsetY: number = 0;
    public offsetZ: number = 0;
    public particleData: number = 0;
    public particleCount: number = 10;
    public data: number[] = [];

    public register(): void {
        this.addSerializableField("particleId", "i32");
        this.addSerializableField("longDistance", "bool");
        this.addSerializableField("x", "f32");
        this.addSerializableField("y", "f32");
        this.addSerializableField("z", "f32");
        this.addSerializableField("offsetX", "f32");
        this.addSerializableField("offsetY", "f32");
        this.addSerializableField("offsetZ", "f32");
        this.addSerializableField("particleData", "f32");
        this.addSerializableField("particleCount", "i32");
        this.addSerializableField("data", "custom",
            ListSerializer.createSerialize((writer, value: number) => writer.writeVarInt(value)),
            ListSerializer.createDeserialize(reader => reader.readVarInt()));
    }
}