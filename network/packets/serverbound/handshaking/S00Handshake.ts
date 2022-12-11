import ConnectionState from "../../../ConnectionState";
import Packet from "../../Packet";

export default class S00Handshake extends Packet<S00Handshake> {
    public id: number = 0;
    public protocolVersion: number = 0;
    public serverAddress: string = "";
    public serverPort: number = 0;
    public nextState: ConnectionState = ConnectionState.STATUS;

    public register(): void {
        this.addSerializableField("protocolVersion", "vint");
        this.addSerializableField("serverAddress", "str");
        this.addSerializableField("serverPort", "u16");
        this.addSerializableField("nextState", "vint");
    }
}