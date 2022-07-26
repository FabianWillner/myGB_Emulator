export class Tile {
    public pixels = new Array<number>(8 * 8);

    constructor(bytes: Array<number>) {
        this.loadDataToTile(bytes);
    }

    public loadDataToTile(bytes: Array<number>) {
        if (bytes.length !== 16) {
            throw new Error('Didnt give 16 bytes of Data');
        }
        let offset = 0;
        for (let i = 0; i < 8; i++) {
            const highByte = this.ensureByte(bytes[offset + 1]);
            const lowByte = this.ensureByte(bytes[offset]);

            for (let j = 0; j < 8; j++) {
                const pixel = this.combineByte(highByte, lowByte, j);
                this.pixels[i * 8 + j] = pixel;
            }

            offset += 2;
        }
    }
    private combineByte(
        highByte: number,
        lowByte: number,
        position: number
    ): number {
        const hByte = ((highByte >> (7 - position)) & 1) << 1;
        const lByte = (lowByte >> (7 - position)) & 1;
        return hByte | lByte;
    }

    private ensureByte(byte: number): number {
        return byte & 0xff;
    }
}
