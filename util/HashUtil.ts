export default class HashUtil {
    // slightly modified version of https://gist.github.com/andrewrk/4425843
    public static mcHexDigest(hash: Buffer): string {
        const negative = hash.readInt8(0) < 0;
        if (negative) this.performTwosCompliment(hash);
        return (negative ? "-" : "") + hash.toString("hex").replace(/^0+/g, "");
    }

    // slightly modified version of https://gist.github.com/andrewrk/4425843
    public static performTwosCompliment(hash: Buffer): void {
        let carry = true;

        for (let i = hash.length - 1; i >= 0; i--) {
            const value = hash.readUint8(i);
            const newByte = ~value & 0xff;

            if (carry) {
                carry = newByte === 0xff;
                hash.writeUint8(carry ? 0 : newByte + 1, i);
            } else {
                hash.writeUint8(newByte, i);
            }
        }
    }
}