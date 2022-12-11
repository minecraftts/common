import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";
import ChatMessage from "../../../../chat/ChatMessage";
import ChatSerializer from "../../../serializers/ChatSerializer";
import Packet from "../../Packet";

export default class C2DOpenWindow extends Packet<C2DOpenWindow> {
    public id: number = 0x2d;

    public windowId: number = 0;
    public windowType: string = "";
    public windowTitle: ChatMessage | string = "";
    public numberOfSlots: number = 10;
    public entityId: number = -1;

    public register(): void {}

    public serialize(): PacketWriter {
        const writer = new PacketWriter(this.id)
            .writeUInt8(this.windowId)
            .writeString(this.windowType);

        ChatSerializer.serialize(writer, this.windowTitle);

        writer.writeUInt8(this.numberOfSlots);

        if (this.windowType === "EntityHorse") {
            writer.writeInt32(this.entityId);
        }

        return writer;
    }

    public deserialize(reader: PacketReader): Packet {
        const packet = new C2DOpenWindow({
            windowId: reader.readUInt8(),
            windowType: reader.readString(),
            windowTitle: ChatSerializer.deserialize(reader),
            numberOfSlots: reader.readUInt8()
        });

        if (packet.windowType === "EntityHorse") {
            packet.entityId = reader.readInt32();
        }

        return packet;
    }
}