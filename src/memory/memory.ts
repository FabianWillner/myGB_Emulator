export class Memory {
    public readonly data: Uint8Array;
    public constructor(size: number = 0xffff) {
        this.data = new Uint8Array(size);
    }

    public set8Bit(adress: number, byte: number) {
        this.data[adress] = byte & 0xff;
    }

    public get8Bit(adress: number) {
        return this.data[adress];
    }

    public set16Bit(adress: number, value: number) {
        this.set8Bit(adress + 1, (value & 0xff00) >> 8);
        this.set8Bit(adress, value & 0xff);
    }

    public get16Bit(adress: number) {
        return (this.get8Bit(adress + 1) << 8) | this.get8Bit(adress);
    }
}
