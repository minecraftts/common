import ListSerializer from "../../../serializers/ListSerializer";
import Packet from "../../Packet";

type BlockRecord = {
    x: number,
    y: number,
    z: number,
    blockId: number
};

export default class C22MultiBlockChange extends Packet<C22MultiBlockChange> {
    public id: number = 0x22;

    public chunkX: number = 0;
    public chunkZ: number = 0;
    public blockChanges: BlockRecord[] = [];

    public register(): void {
        this.addSerializableField("chunkX", "i32");
        this.addSerializableField("chunkZ", "i32");
        this.addSerializableField("blockChanges",
            "custom",
            ListSerializer.createSerialize((writer, value: BlockRecord) => {
                writer.writeUInt8(value.x << 4 | (value.z & 15));
                writer.writeUInt8(value.y);
                writer.writeVarInt(value.blockId);
            }), ListSerializer.createDeserialize((reader): BlockRecord => {
                const horizontalPosition = reader.readUInt8();

                return {
                    x: horizontalPosition >> 4,
                    y: reader.readUInt8(),
                    z: horizontalPosition & 15,
                    blockId: reader.readVarInt()
                };
            }));
    }
}