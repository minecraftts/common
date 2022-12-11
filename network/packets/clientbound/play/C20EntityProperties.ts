import { PacketWriter } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class C20EntityProperties extends Packet<C20EntityProperties> {
    public id: number = 0x20;

    public entityId: number = -1;
    public properties: Array<{
        key: string,
        value: number,
        modifiers: {
            uuid: string,
            amount: number,
            operation: 0 | 1 | 2
        }[]
    }> = [];

    public register(): void {
        this.addSerializableField("entityId", "vint");
        this.addSerializableField("properties", "custom", (writer: PacketWriter, properties: typeof this.properties) => {
            writer.writeInt32(properties.length);

            for (const property of properties) {
                writer.writeString(property.key);
                writer.writeDouble(property.value);
                writer.writeVarInt(property.modifiers.length);
                
                for (const modifier of property.modifiers) {
                    writer.writeUUID(modifier.uuid);
                    writer.writeDouble(modifier.amount);
                    writer.writeInt8(modifier.operation);
                }
            }
        }, () => {});
    }
}