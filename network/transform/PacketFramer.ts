import { Transform, TransformCallback } from "stream";
import { Logger } from "@minecraftts/logger";
import VarInt from "../../util/VarInt";
import zlib from "zlib";

/**
 * Based on code from https://github.com/janispritzkau/mcproto/blob/master/src/transforms.ts
 */
export default class PacketFramer extends Transform {
    private compressionThreshold: number = -1;

    public _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
        if (this.compressionThreshold === -1) {
            this.push(Buffer.concat([VarInt.encodeVarInt(chunk.length), chunk]));
        } else {
            if (chunk.length < this.compressionThreshold) {
                this.push(Buffer.concat([
                    VarInt.encodeVarInt(chunk.length + 1),
                    VarInt.encodeVarInt(0),
                    chunk
                ]));
            } else {
                return zlib.deflate(chunk, (e, buffer) => {
                    if (e) {
                        Logger.error(e);
                        return callback(e);
                    }

                    const length = VarInt.encodeVarInt(chunk.length);
                    const packetLength = VarInt.encodeVarInt(length.length + buffer.length);

                    this.push(Buffer.concat([ packetLength, length, buffer ]));

                    callback();
                });
            }
        }
        callback();
    }

    public setCompressionThreshold(threshold: number) {
        this.compressionThreshold = threshold;
    }
}