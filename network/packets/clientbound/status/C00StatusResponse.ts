import JsonSerializer from "../../../serializers/JsonSerializer";
import Packet from "../../Packet";

export default class C00StatusResponse extends Packet<C00StatusResponse> {
    public id: number = 0x00;
    public body: {
        version: {
            name: string;
            protocol: number;
        },
        players: {
            max: number;
            online: number;
            sample: {
                name: string;
                id: string;
            }[]
        },
        description: {
            text: string;
        },
        favicon?: string
    } = <any>{};

    public register(): void {
        this.addSerializableField("body", "custom", JsonSerializer.jsonSerializer, JsonSerializer.jsonDeserializer);
    }
}