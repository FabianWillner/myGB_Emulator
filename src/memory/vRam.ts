import {Tile} from '../gpu/tile.js';
import {MemoryDevice} from './bus.js';

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

    private getTile(address: number): Tile {
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

    public tileAt(index: number, isSprite: boolean): Tile {
        if (this.bgAndWindowTileDataArea() || isSprite) {
            return this.getTile(0x8000 - this.offset + index * 16);
        }

        return this.getTile(0x8800 - this.offset + index * 16);
    }

    public get map1() {
        const tileArray = new Array<Tile>(32 * 32);
        for (let i = 0; i < 32 * 32; i++) {
            tileArray[i] = this.tileAt(
                this.read8(0x9800 - this.offset + i),
                false
            );
        }
        return tileArray;
    }

    public get map2() {
        const tileArray = new Array<Tile>(32 * 32);
        for (let i = 0; i < 32 * 32; i++) {
            tileArray[i] = this.tileAt(
                this.read8(0x9c00 - this.offset + i),
                false
            );
        }
        return tileArray;
    }

    public LCDandPPUEnable(): boolean {
        const value = this.read8(0xff40);
        return (value >> 7) & 1 ? true : false;
    }

    public winDowTileMapArea(): boolean {
        const value = this.read8(0xff40);
        return (value >> 6) & 1 ? true : false;
    }

    public winEnable(): boolean {
        const value = this.read8(0xff40);
        return (value >> 5) & 1 ? true : false;
    }

    public bgAndWindowTileDataArea(): boolean {
        const value = this.read8(0xff40);
        return (value >> 4) & 1 ? true : false;
    }
    public bgTileMapArea(): boolean {
        const value = this.read8(0xff40);
        return (value >> 3) & 1 ? true : false;
    }

    public objSize(): boolean {
        const value = this.read8(0xff40);
        return (value >> 2) & 1 ? true : false;
    }
    public objEnable(): boolean {
        const value = this.read8(0xff40);
        return (value >> 1) & 1 ? true : false;
    }

    public bgAndWinEnablePriority(): boolean {
        const value = this.read8(0xff40);
        return (value >> 0) & 1 ? true : false;
    }

    public get SCY(): number {
        return this.read8(0xff42);
    }

    public get SCX(): number {
        return this.read8(0xff43);
    }

    public get LY(): number {
        return this.read8(0xff44);
    }

    public get LYC(): number {
        return this.read8(0xff45);
    }

    public get WY(): number {
        return this.read8(0xff4a);
    }
}
