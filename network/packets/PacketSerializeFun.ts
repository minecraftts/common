import { PacketWriter } from "@lilithmod/unborn-mcproto";

type PacketSerializeFun = (writer: PacketWriter, value: any) => void;

export default PacketSerializeFun;