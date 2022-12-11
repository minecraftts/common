import Packet from "../../Packet";

export default class S00StatusRequest extends Packet<S00StatusRequest> {
    public id = 0x00;

    public register(): void {}
}