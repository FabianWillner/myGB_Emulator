import {Bus} from '../memory/bus';
import {Tile} from './tile';

function ensure8Bit(n: number): number {
    return n & 0xff;
}

function uint8ToInt8(value: number): number {
    const maskedValue = value & 0xff;
    const sign = (maskedValue >> 7) & 1;
    return sign ? -(~maskedValue & 127) - 1 : maskedValue & 127;
}

export class PPU {
    // 3 layer BG Win and Objects

    private bus: Bus;

    constructor(bus: Bus) {
        this.bus = bus;
    }

    public getspriteTileAt(index: number) {
        const ensuredIndex = ensure8Bit(index);
        const tileData = this.get8Bytes(0x8000 + 8 * ensuredIndex);
        return new Tile(tileData);
    }

    public getTileAt(index: number) {
        if (this.getLCDCbit(4)) {
            // $8000 addressing
            return this.getspriteTileAt(index);
        } else {
            // $8800 addressing
            const ensuredIndex = ensure8Bit(index);
            const signedIndex = uint8ToInt8(ensuredIndex);
            const tileData = this.get8Bytes(0x9000 + 8 * signedIndex);
            return new Tile(tileData);
        }
    }

    private get8Bytes(adress: number): Array<number> {
        const res = new Array<number>(8);
        for (let i = 0; i < 8; i++) {
            res[i] = this.bus.read8(adress + i);
        }
        return res;
    }

    get map1(): Array<Tile> {
        const ret = new Array<Tile>(32 * 32);
        for (let i = 0; i < 32 * 32; i++) {
            ret[i] = this.getTileAt(this.bus.read8(0x9800 + i));
        }
        return ret;
    }

    get map2(): Array<Tile> {
        const ret = new Array<Tile>(32 * 32);
        for (let i = 0; i < 32 * 32; i++) {
            ret[i] = this.getTileAt(this.bus.read8(0x9c00 + i));
        }
        return ret;
    }

    // Bit  Name                            Usage notes
    // 7    LCD and PPU enable              0=Off, 1=On
    // 6    Window tile map area            0=9800-9BFF, 1=9C00-9FFF
    // 5    Window enable                   0=Off, 1=On
    // 4    BG and Window tile data area    0=8800-97FF, 1=8000-8FFF
    // 3    BG tile map area                0=9800-9BFF, 1=9C00-9FFF
    // 2    OBJ size                        0=8x8, 1=8x16
    // 1    OBJ enable                      0=Off, 1=On
    // 0    BG and Window enable/priority   0=Off, 1=On
    public getLCDCbit(bit: number) {
        if (bit < 0 || bit > 8) {
            throw new Error(`bit is out of range ${bit}`);
        }
        return (this.lcdc >> bit) & 1 ? true : false;
    }

    get lcdc() {
        return this.bus.read8(0xff40);
    }
}
