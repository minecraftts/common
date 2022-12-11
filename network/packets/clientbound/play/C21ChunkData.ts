import Packet from "../../Packet";

export default class C21ChunkData extends Packet<C21ChunkData> {
    public id: number = 0x21;

    public chunkX: number = 0;
    public chunkZ: number = 0;
    public groundUp: boolean = true;
    public primaryBitMask: number = 0xffff;
    // TODO
    // public chunk: Chunk = <Chunk><unknown>undefined;

    public register(): void {
        this.addSerializableField("chunkX", "i32");
        this.addSerializableField("chunkZ", "i32");
        this.addSerializableField("groundUp", "bool");
        this.addSerializableField("primaryBitMask", "u16");
        // TODO
        // this.addSerializableField("chunk", "custom", () => {}, () => {});
    }
}