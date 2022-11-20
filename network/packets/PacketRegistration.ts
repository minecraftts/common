import ConnectionState from "../ConnectionState";
import Packet from "./Packet";
import PacketDirection from "./PacketDirection";

type PacketRegistration = {
    packet: Packet,
    direction: PacketDirection,
    state: ConnectionState
};

export default PacketRegistration;