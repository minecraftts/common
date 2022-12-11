import EntityMetadata from "../../../../entity/EntityMetadata";
import EntityMetadataSerializer from "../../../serializers/EntityMetadataSerializer";
import Packet from "../../Packet";

export default class C0CSpawnPlayer extends Packet<C0CSpawnPlayer> {
    public id: number = 0x0c;
    public entityId: number = -1;
    public playerUuid: string = "";
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public yaw: number = 0;
    public pitch: number = 0;
    public currentItem: number = 0;
    public metadata: EntityMetadata = [];

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("playerUuid", "uuid");
        this.addSerializableField("x", "i32");
        this.addSerializableField("y", "i32");
        this.addSerializableField("z", "i32");
        this.addSerializableField("yaw", "i8");
        this.addSerializableField("pitch", "i8");
        this.addSerializableField("currentItem", "i16");
        this.addSerializableField("metadata", "custom", EntityMetadataSerializer.serialize, EntityMetadataSerializer.deserialize);
    }
}