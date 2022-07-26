import {Tile} from '../gpu/tile';
import {MemoryDevice} from './bus';

export class VRam implements MemoryDevice {
    public readonly data: Uint8Array;
    public offset: number;

    public constructor(size = 0xffff, offset = 0x8000) {
        this.data = new Uint8Array(size);
        this.offset = offset;
    }
    public read8(address: number) {
        const realAddress = address - this.offset;
        return this.data[realAddress];
    }
    public read16(address: number) {
        const realAddress = address - this.offset;
        return (this.read8(realAddress + 1) << 8) | this.read8(realAddress);
    }

    public write8(address: number, byte: number) {
        const realAddress = address - this.offset;
        this.data[realAddress] = byte & 0xff;
    }

    public write16(address: number, value: number) {
        const realAddress = address - this.offset;
        this.write8(realAddress + 1, (value & 0xff00) >> 8);
        this.write8(realAddress, value & 0xff);
    }

    public getTile(address: number): Tile {
        if ((address & 0xffff) !== 0) {
            throw new Error(
                'Trying to load a tile that is not on the right starting point'
            );
        }
        const byteArray = new Array<number>(16);
        for (let i = 0; i < 16; i++) {
            byteArray[i] = this.read8(address);
        }
        return new Tile(byteArray);
    }

    public get map1() {
        const tileArray = new Array<Tile>(32 * 32);
        for (let i = 0; i < 32 * 32; i++) {
            tileArray[i] = this.getTile(0x9800 - this.offset + i);
        }
        return tileArray;
    }

    public get map2() {
        const tileArray = new Array<Tile>(32 * 32);
        for (let i = 0; i < 32 * 32; i++) {
            tileArray[i] = this.getTile(0x9c00 - this.offset + i);
        }
        return tileArray;
    }
}
