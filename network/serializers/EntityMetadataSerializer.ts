import { PacketReader, PacketWriter, Position } from "@lilithmod/unborn-mcproto";
import EntityMetadata from "../../entity/EntityMetadata";
import EntityMetadataType from "../../entity/EntityMetadataType";
import Rotation from "../../entity/Rotation";
import Slot from "../../items/Slot";
import StaticImplements from "../../util/StaticImplements";
import ISerializer from "./ISerializer";
import SlotSerializer from "./SlotSerializer";

@StaticImplements<ISerializer>()
export default class EntityMetadataSerializer {
    public static serialize(writer: PacketWriter, metadata: EntityMetadata): void {
        for (const meta of metadata) {
            const item = (meta.type << 5 | meta.key & 0x1f) & 0xff;

            writer.writeUInt8(item);

            switch (meta.type) {
                case EntityMetadataType.BYTE:
                    writer.writeInt8(meta.value);
                    break;
                case EntityMetadataType.SHORT:
                    writer.writeInt16(meta.value);
                    break;
                case EntityMetadataType.INT:
                    writer.writeInt32(meta.value);
                    break;
                case EntityMetadataType.FLOAT:
                    writer.writeFloat(meta.value);
                    break;
                case EntityMetadataType.STRING:
                    writer.writeString(meta.value);
                    break;
                case EntityMetadataType.SLOT:
                    SlotSerializer.serialize(writer, meta.value);
                    break;
                case EntityMetadataType.POSITION:
                    writer.writeInt32(meta.value.x);
                    writer.writeInt32(meta.value.y);
                    writer.writeInt32(meta.value.z);
                    break;
                case EntityMetadataType.ROTATION:
                    writer.writeFloat(meta.value.pitch);
                    writer.writeFloat(meta.value.yaw);
                    writer.writeFloat(meta.value.roll);
                    break;
            }
        }

        writer.writeUInt8(0x7f);
    }

    public static deserialize(reader: PacketReader): EntityMetadata {
        const metadata: EntityMetadata = [];

        while (true) {
            if (reader.offset >= reader.buffer.byteLength) {
                break;
            }

            const item = reader.readUInt8();

            if (item === 0x7f) {
                break;
            }

            const index = item & 0x1f;
            const type: EntityMetadataType = item >> 5;

            let value: number | string | Slot | Rotation | Position;

            switch (type) {
                case EntityMetadataType.BYTE:
                    value = reader.readInt8();
                    break;
                case EntityMetadataType.SHORT:
                    value = reader.readInt16();
                    break;
                case EntityMetadataType.INT:
                    value = reader.readInt32();
                    break;
                case EntityMetadataType.FLOAT:
                    value = reader.readFloat();
                    break;
                case EntityMetadataType.STRING:
                    value = reader.readString();
                    break;
                case EntityMetadataType.SLOT:
                    value = SlotSerializer.deserialize(reader);
                    break;
                case EntityMetadataType.POSITION:
                    value = {
                        x: reader.readInt32(),
                        y: reader.readInt32(),
                        z: reader.readInt32()
                    };
                    break;
                case EntityMetadataType.ROTATION:
                    value = {
                        pitch: reader.readFloat(),
                        yaw: reader.readFloat(),
                        roll: reader.readFloat()
                    };
                    break;
            }

            metadata.push({
                type,
                value: <any>value,
                key: index
            });
        }

        return metadata;
    }
}