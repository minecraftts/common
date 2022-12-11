import { PacketWriter } from "@lilithmod/unborn-mcproto";
import Packet from "../../Packet";

export default class C0ESpawnObject extends Packet<C0ESpawnObject> {
    public id: number = 0x0e;

    public entityId: number = 0;
    public type: number = 0;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public pitch: number = 0;
    public yaw: number = 0;
    public data: number = 0;
    public velocityX: number = 0;
    public velocityY: number = 0;
    public velocityZ: number = 0;

    public register(): void {}

    public serialize(): PacketWriter {
        const writer = new PacketWriter(this.id)
            .writeVarInt(this.entityId)
            .writeInt8(this.type)
            .writeInt32(this.x)
            .writeInt32(this.y)
            .writeInt32(this.z)
            .writeInt8(this.pitch)
            .writeInt8(this.yaw)
            .writeInt32(this.data);

        if (this.data !== 0) {
            writer
                .writeInt16(this.velocityX)
                .writeInt16(this.velocityY)
                .writeInt16(this.velocityZ);
        }

        return writer;
    }
}