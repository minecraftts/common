import AbstractLivingEntity from "../AbstractLivingEntity";

export default abstract class AbstractPlayerEntity extends AbstractLivingEntity {
    protected uuid: string;
    protected username: string;

    protected constructor(entityId: number, uuid: string, username: string) {
        super(entityId);

        this.uuid = uuid;
        this.username = username;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public getUsername(): string {
        return this.username;
    }

    public abstract setUuid(uuid: string): void;
    public abstract setUsername(username: string): void;

    public abstract respawn(): void;
}
