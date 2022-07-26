import {MemoryDevice} from './bus';

export class Memory implements MemoryDevice {
    public readonly data: Uint8Array;
    public offset: number;

    public constructor(size = 0xffff, offset = 0) {
        this.data = new Uint8Array(size);
        this.offset = offset;
    }
    public read8(address: number) {
        return this.data[address];
    }
    public read16(address: number) {
        return (this.read8(address + 1) << 8) | this.read8(address);
    }

    public write8(address: number, byte: number) {
        this.data[address] = byte & 0xff;
    }

    public write16(address: number, value: number) {
        this.write8(address + 1, (value & 0xff00) >> 8);
        this.write8(address, value & 0xff);
    }
}
