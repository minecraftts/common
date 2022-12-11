import LengthPrefixedBufferSerializer from "../../../serializers/LengthPrefixedBufferSerializer";
import Packet from "../../Packet";

export default class S01EncryptionResponse extends Packet<S01EncryptionResponse> {
    public id = 0x01;

    public sharedSecret: Buffer = Buffer.alloc(0);
    public verifyToken: Buffer = Buffer.alloc(0);

    public register(): void {
        this.addSerializableField("sharedSecret", "custom", LengthPrefixedBufferSerializer.serialize, LengthPrefixedBufferSerializer.deserialize);
        this.addSerializableField("verifyToken", "custom", LengthPrefixedBufferSerializer.serialize, LengthPrefixedBufferSerializer.deserialize);
    }
}