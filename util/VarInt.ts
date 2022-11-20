export default class VarInt {
    public static decodeVarInt(buffer: Buffer, offset: number = 0): [number, number] {
        let numRead: number = 0;
        let result: number = 0;
        let byte: number = 0;
        let value: number = 0;

        do {
            byte = buffer.readUint8(offset);

            offset++;

            value = (byte & 0b01111111);
            result |= value << (7 * numRead);

            numRead++;

            if (numRead > 5) throw new Error("varint too large");
        } while ((byte & 0b10000000) !== 0);

        return [ result, offset ];
    }

    public static encodeVarInt(value: number): Buffer {
        const bytes: number[] = [];

        do {
            let temp = value & 0b01111111;

            value >>>= 7;

            if (value !== 0) {
                temp |= 0b10000000;
            }

            bytes.push(temp);
        } while (value !== 0);

        return Buffer.from(bytes);
    }
}