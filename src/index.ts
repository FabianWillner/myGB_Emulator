import {CPU} from './cpu/cpu.js';

const cpu = new CPU();

//cpu.registers.PC = 0x0100;
//cpu.loadCart('../../../roms/Tetris.rom');
//cpu.loadCart('../../../roms/dmg-acid2.gb');
//cpu.loadCart('../../../roms/01-special.gb');
cpu.loadCart('../../../roms/02-interrupts.gb');
//cpu.loadCart('../../../roms/03-op sp,hl.gb');
//cpu.loadCart('../../../roms/04-op r,imm.gb');
//cpu.loadCart('../../../roms/05-op rp.gb');
//cpu.loadCart('../../../roms/06-ld r,r.gb');
//cpu.loadCart('../../../roms/07-jr,jp,call,ret,rst.gb'); // This one failed
//cpu.loadCart('../../../roms/08-misc instrs.gb'); // Failed
//cpu.loadCart('../../../roms/09-op r,r.gb'); // I think passed
//cpu.loadCart('../../../roms/10-bit ops.gb'); // doesnt end
//cpu.loadCart('../../../roms/11-op a,(hl).gb'); // doesnt end
cpu.registers.PC = 0x0100;

cpu.run();
//cpu.halt();

//checkRegisters({PC: 0x0034});

const tileData = [
    0xff, 0x00, 0x7e, 0xff, 0x85, 0x81, 0x89, 0x83, 0x93, 0x85, 0xa5, 0x8b,
    0xc9, 0x97, 0x7e, 0xff,
];
const tileData2 = [
    0x7c, 0x7c, 0x00, 0xc6, 0xc6, 0x00, 0x00, 0xfe, 0xc6, 0xc6, 0x00, 0xc6,
    0xc6, 0x00, 0x00, 0x00,
];
//const tile = new Tile();

//tile.loadDataToTile(tileData);
//gpu.printTile(tile, 0, 0);
//gpu.printallTile(tile);

function printHex(value: number) {
    console.log('$%s', value.toString(16));
}

function getHex(value: number) {
    return '$' + value.toString(16);
}

function printNext(adress: number, next = 8) {
    const mystring = '';
    for (let i = 0; i < next; i++) {
        //mystring = mystring + getHex(mem.get8Bit(adress + i)) + ' ';
    }
    console.log(mystring);
}
