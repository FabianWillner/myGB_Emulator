import {Cartridge} from '../cart/cartridge';

// Start	End	Description	Notes
// 0000	    3FFF	16 KiB ROM bank 00	From cartridge, usually a fixed bank
// 4000	    7FFF	16 KiB ROM Bank 01~NN	From cartridge, switchable bank via mapper (if any)
// 8000	    9FFF	8 KiB Video RAM (VRAM)	In CGB mode, switchable bank 0/1
// A000	    BFFF	8 KiB External RAM	From cartridge, switchable bank if any
// C000	    CFFF	4 KiB Work RAM (WRAM)
// D000	    DFFF	4 KiB Work RAM (WRAM)	In CGB mode, switchable bank 1~7
// E000	    FDFF	Mirror of C000~DDFF (ECHO RAM)	Nintendo says use of this area is prohibited.
// FE00	    FE9F	Sprite attribute table (OAM)
// FEA0	    FEFF	Not Usable	Nintendo says use of this area is prohibited
// FF00	    FF7F	I/O Registers
// FF80	    FFFE	High RAM (HRAM)
// FFFF	    FFFF	Interrupt Enable register (IE)

export interface MemoryDevice {
    read8(address: number): number;
    read16(address: number): number;
    write8(address: number, value: number): void;
    write16(address: number, value: number): void;
}

enum MemoryRanges {
    ROM_START = 0x0000,
    ROM_END = 0x7fff,
    VRAM_START = 0x8000,
    VRAM_END = 0x9fff,
    EXRAM_START = 0xa000,
    EXRAM_END = 0xbfff,
    WRAM_START = 0xc000,
    WRAM_END = 0xdfff,
    OAM_START = 0xfe00,
    OAM_END = 0xfe9f,
    IO_START = 0xff00,
    IO_END = 0xff7f,
    HRAM_START = 0xff80,
    HRAM_END = 0xfffe,
    IE = 0xffff,
}

export class Bus implements MemoryDevice {
    private cartridge: Cartridge;

    constructor(cartridge: Cartridge) {
        // TODO
        this.cartridge = cartridge;
    }

    public read8(address: number): number {
        const u16Address = address & 0xffff;
        // TODO
        if (u16Address <= MemoryRanges.ROM_END) {
            // Cartridge
            return this.cartridge.read8(u16Address);
        }

        console.log('Not implemented yet');
        return -1;
    }

    public read16(adress: number) {
        return (this.read8(adress + 1) << 8) | this.read8(adress);
    }

    public write8(address: number, value: number): void {
        const u16Address = address & 0xffff;
        const u8Data = value & 0xff;
        // TODO
        if (u16Address <= MemoryRanges.ROM_END) {
            // Cartridge
            return this.cartridge.write8(u16Address, u8Data);
        }
        console.log('Not implemented yet');
    }

    public write16(address: number, value: number): void {
        this.write8(address, (value >> 8) & 0xff);
        this.write8(address + 1, value & 0xff);
    }

    public loadCart(cartridge: Cartridge) {
        this.cartridge = cartridge;
    }
}
