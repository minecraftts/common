import EntityMetadata from "../../../../entity/EntityMetadata";
import EntityMetadataSerializer from "../../../serializers/EntityMetadataSerializer";
import Packet from "../../Packet";

export default class C0FSpawnMob extends Packet<C0FSpawnMob> {
    public id: number = 0x0f;

    public entityId: number = -1;
    public type: number = 0;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public yaw: number = 0;
    public pitch: number = 0;
    public headPitch: number = 0;
    public velocityX: number = 0;
    public velocityY: number = 0;
    public velocityZ: number = 0;
    public metadata: EntityMetadata = [];

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("type", "u8");
        this.addSerializableField("x", "i32");
        this.addSerializableField("y", "i32");
        this.addSerializableField("z", "i32");
        this.addSerializableField("yaw", "i8");
        this.addSerializableField("pitch", "i8");
        this.addSerializableField("headPitch", "i8");
        this.addSerializableField("velocityX", "i16");
        this.addSerializableField("velocityY", "i16");
        this.addSerializableField("velocityZ", "i16");
        this.addSerializableField("metadata", "custom", EntityMetadataSerializer.serialize, EntityMetadataSerializer.deserialize);
    }
}