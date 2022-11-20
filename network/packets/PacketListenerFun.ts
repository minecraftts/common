import Packet from "./Packet";

type PacketListenerFun<T extends Packet> = ((packet: T) => void | Promise<void>);

export default PacketListenerFun;