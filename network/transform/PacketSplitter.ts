import { Logger } from "@minecraftts/logger";
import { Transform, TransformCallback } from "stream";
import zlib from "zlib";
import VarInt from "../../util/VarInt";

/**
 * Based on code from https://github.com/janispritzkau/mcproto/blob/master/src/transforms.ts
 */
export default class PacketSplitter extends Transform {
    private compressionThreshold: number;
    private buffer: Buffer;
    private transforming: boolean;

    private flushCallback?: () => void;

    public constructor() {
        super();

        this.compressionThreshold = -1;
        this.buffer = Buffer.alloc(0);
        this.transforming = false;
    }

    public setCompressionThreshold(threshold: number): void {
        this.compressionThreshold = threshold;
    }

    public async _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): Promise<void> {
        this.buffer = Buffer.concat([ this.buffer, chunk ]);
        this.transforming = true;

        let offset: number = 0;
        let length: number;

        while (true) {
            const packetStart: number = offset;

            try {
                [ length, offset ] = VarInt.decodeVarInt(this.buffer, offset);
            } catch (e) {
                break;
            }

            if (offset + length > this.buffer.length) {
                offset = packetStart;
                break;
            }

            try {
                if (this.compressionThreshold === -1) {
                    this.push(this.buffer.subarray(offset, offset + length));
                } else {
                    const [ len, off ] = VarInt.decodeVarInt(this.buffer, offset);
                    const buffer = this.buffer.subarray(off, offset + length);

                    if (len === 0) {
                        this.push(buffer);
                    } else {
                        this.push(await new Promise((resolve, reject) => {
                            zlib.inflate(buffer, {
                                finishFlush: zlib.constants.Z_SYNC_FLUSH
                            }, (e, buffer) => {
                                if (e) {
                                    Logger.error(e);
                                    reject(e);
                                }

                                resolve(buffer);
                            });
                        }));
                    }
                }
            } catch (e) {
                Logger.error(e);
                return <void><unknown>this.destroy(e as Error | undefined);
            }

            offset += length;
            await Promise.resolve();
        }

        this.buffer = this.buffer.subarray(offset);
        
        if (this.flushCallback) {
            this.flushCallback();
        }

        this.transforming = false;
        callback();
    }

    public flush(callback: () => void): void {
        if (this.transforming) {
            this.flushCallback = callback;
        } else {
            callback();
        }
    }
}