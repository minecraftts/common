import { PacketReader, PacketWriter } from "@lilithmod/unborn-mcproto";

export default interface ISerializer {
    serialize(writer: PacketWriter, value: unknown, ...args: any[]): void;
    deserialize(reader: PacketReader, ...args: any): any;
}