import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";
import { Logger } from "@minecraftts/logger";
import PacketDeserializeFun from "./PacketDeserializeFun";
import PacketSerializeFun from "./PacketSerializeFun";
import SerializableFieldType from "./SerializableFieldType";

export default abstract class Packet<T extends Packet = any> {
    private __ctorValues: Partial<Record<keyof T, T[keyof T]>> = {};

    private serializableFields: Array<
        {
            type: SerializableFieldType,
            key: keyof T
        } | {
            type: "custom",
            key: keyof T,
            serialize: PacketSerializeFun,
            deserialize: PacketDeserializeFun
        }> = [];

    public id: number = -1;

    public constructor(values: Partial<Record<keyof T, T[keyof T]>> = {}) {
        this.__ctorValues = values;
    }

    protected addSerializableField(key: keyof T, type: SerializableFieldType): void;
    protected addSerializableField(key: keyof T, type: "custom", serializer: PacketSerializeFun, deserializer: PacketDeserializeFun): void;
    protected addSerializableField(key: keyof T, type: SerializableFieldType | "custom", serializer?: PacketSerializeFun, deserializer?: PacketDeserializeFun): void {
        if (type === "custom") {
            this.serializableFields.push({
                key,
                type,
                serialize: <PacketSerializeFun>serializer,
                deserialize: <PacketDeserializeFun>deserializer
            });
        } else {
            this.serializableFields.push({ key, type });
        }
    }

    public abstract register(): void;

    public serialize(): PacketWriter {
        const writer = new PacketWriter(this.id, 47);

        for (const fieldData of this.serializableFields) {
            const { key } = fieldData;

            if (!(key in this)) {
                Logger.error(`Failed to serialize field ${String(key)} because it does not exist`);
                continue;
            }

            const { type } = fieldData;
            const value = (<any>this)[key];

            switch (type) {
                case "u8": {
                    writer.writeUInt8(value);
                    break;
                }
                case "u16": {
                    writer.writeUInt16(value);
                    break;
                }
                case "u32": {
                    writer.writeUInt32(value);
                    break;
                }
                case "u64": {
                    writer.writeUInt64(value);
                    break;
                }
                case "i8": {
                    writer.writeInt8(value);
                    break;
                }
                case "i16": {
                    writer.writeInt16(value);
                    break;
                }
                case "i32": {
                    writer.writeInt32(value);
                    break;
                }
                case "i64": {
                    writer.writeInt64(value);
                    break;
                }
                case "vint": {
                    writer.writeVarInt(value);
                    break;
                }
                case "vlong": {
                    writer.writeVarLong(value);
                    break;
                }
                case "buf": {
                    writer.write(value);
                    break;
                }
                case "f32": {
                    writer.writeFloat(value);
                    break;
                }
                case "f64": {
                    writer.writeDouble(value);
                    break;
                }
                case "str": {
                    writer.writeString(value);
                    break;
                }
                case "pos": {
                    writer.writePosition(value);
                    break;
                }
                case "uuid": {
                    writer.writeUUID(value);
                    break;
                }
                case "bool": {
                    writer.writeBool(value);
                    break;
                }
                case "custom": {
                    const { serialize } = fieldData;

                    serialize(writer, value);

                    break;
                }
            }
        }

        return writer;
    }

    // not sure what i was smoking when i wrote this but it works so don't touch
    public deserialize(reader: PacketReader): Packet {
        const PacketClazz = <any>Object.getPrototypeOf(this).constructor;
        const newInstance = <Packet>new PacketClazz();

        for (const fieldData of this.serializableFields) {
            const { key } = fieldData;

            if (!(key in newInstance)) {
                Logger.error(`Failed to deserialize field ${String(key)} because it does not exist`);
                continue;
            }

            const { type } = fieldData;

            let value: any;

            switch (type) {
                case "u8": {
                    value = reader.readUInt8();
                    break;
                }
                case "u16": {
                    value = reader.readUInt16();
                    break;
                }
                case "u32": {
                    value = reader.readUInt32();
                    break;
                }
                case "u64": {
                    value = reader.readUInt64();
                    break;
                }
                case "i8": {
                    value = reader.readInt8();
                    break;
                }
                case "i16": {
                    value = reader.readInt16();
                    break;
                }
                case "i32": {
                    value = reader.readInt32();
                    break;
                }
                case "i64": {
                    value = reader.readInt64();
                    break;
                }
                case "vint": {
                    value = reader.readVarInt();
                    break;
                }
                case "vlong": {
                    value = reader.readVarLong();
                    break;
                }
                case "buf": {
                    value = reader.readRest();
                    break;
                }
                case "f32": {
                    value = reader.readFloat();
                    break;
                }
                case "f64": {
                    value = reader.readDouble();
                    break;
                }
                case "str": {
                    value = reader.readString();
                    break;
                }
                case "pos": {
                    value = reader.readPosition();
                    break;
                }
                case "uuid": {
                    value = reader.readUUID();
                    break;
                }
                case "bool": {
                    value = reader.readBool();
                    break;
                }
                case "custom": {
                    const { deserialize } = fieldData;

                    value = deserialize(reader);

                    break;
                }
            }

            (<any>newInstance)[key] = value;
        }

        return newInstance;
    }

    // this also just works:tm: so no touching
    public preSerialize(): void {
        const entries = Object.entries(this.__ctorValues);

        for (const [ key, value ] of entries) {
            (<{ [key: string]: any }>this)[key] = value;
        }

        delete (<any>this).__ctorValues;
    }
}