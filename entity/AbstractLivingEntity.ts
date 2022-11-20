import AbstractEntity from "./AbstractEntity";

export default abstract class AbstractLivingEntity extends AbstractEntity {
    protected health: number;
    protected maxHealth: number;

    protected constructor(entityId: number) {
        super(entityId);

        this.maxHealth = 20.0;
        this.health = 20.0;
    }

    public getHealth(): number {
        return this.health;
    }

    public getMaxHealth(): number {
        return this.maxHealth;
    }

    public abstract setHealth(health: number): void;
    public abstract setMaxHealth(maxHealth: number): void;

    public abstract kill(): void;
}