import EntityMetadata from "../../../../entity/EntityMetadata";
import EntityMetadataSerializer from "../../../serializers/EntityMetadataSerializer";
import Packet from "../../Packet";

export default class C1CEntityMetadata extends Packet<C1CEntityMetadata> {
    public id: number = 0x1c;

    public entityId: number = -1;
    public metadata: EntityMetadata = [];

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("metadata", "custom", EntityMetadataSerializer.serialize, EntityMetadataSerializer.deserialize);
    }
}