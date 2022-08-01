import {MemoryDevice} from './bus';

export class RAM implements MemoryDevice {
    private vram = new Uint8Array(0x2000);
    private wram = new Uint8Array(0x2000);
    private hram = new Uint8Array(0x7f);

    public read8(address: number) {
        if (address < 0xa000) {
            return this.vram[(address - 0x8000) & 0xffff];
        } else if (address < 0xe000) {
            return this.wram[(address - 0xc000) & 0xffff];
        } else if (address < 0xffff) {
            return this.hram[(address - 0xff80) & 0xffff];
        }
        return 0;
    }

    public write8(address: number, byte: number) {
        if (address < 0xa000) {
            this.vram[(address - 0x8000) & 0xffff] = byte;
            return;
        } else if (address < 0xe000) {
            this.wram[(address - 0xc000) & 0xffff] = byte;
            return;
        } else if (address < 0xffff) {
            this.hram[(address - 0xff80) & 0xffff] = byte;
            return;
        }
        return;
    }

    public read16(address: number) {
        return (this.read8(address + 1) << 8) | this.read8(address);
    }

    public write16(address: number, value: number) {
        this.write8(address + 1, (value & 0xff00) >> 8);
        this.write8(address, value & 0xff);
    }
}
