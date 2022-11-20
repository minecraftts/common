import { PacketReader } from "@lilithmod/unborn-mcproto";

type PacketDeserializeFun = (reader: PacketReader) => any;

export default PacketDeserializeFun;