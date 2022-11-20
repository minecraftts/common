import EntityMetadata from "./EntityMetadata";
import EntityMetadataValue from "./EntityMetadataValue";

export default abstract class AbstractEntity {
    protected entityId: number;

    protected x: number;
    protected y: number;
    protected z: number;

    protected entityMetadata: EntityMetadata;

    protected constructor(entityId: number) {
        this.entityId = entityId;

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.entityMetadata = [];
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getZ(): number {
        return this.z;
    }

    public getMetadata(): EntityMetadata {
        return this.entityMetadata;
    }

    public getMetadataByKey(key: number): EntityMetadataValue {
        const index = this.entityMetadata.findIndex(value => value.key === key);

        return this.entityMetadata[index];
    }

    public abstract setX(x: number): void;
    public abstract setY(y: number): void;
    public abstract setZ(z: number): void;

    public abstract setEntityMetadata(metadata: EntityMetadata): void;
}