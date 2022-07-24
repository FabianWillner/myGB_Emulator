import {CPU} from './cpu/cpu.js';
import {GPU} from './gpu/gpu.js';
import {Tile} from './gpu/tile.js';

const cpu = new CPU();
const gpu = new GPU();
const mem = cpu.memory;
//const gpu = new GPU();
mem.set8Bit(0x0000, 0x00);
mem.set8Bit(0x0001, 0x10);
mem.set8Bit(0x0002, 0x11);

//cpu.run();
//cpu.halt();
console.log('Test');
cpu.step();

const tile = new Tile();
const tileData = [
    0xff, 0x00, 0x7e, 0xff, 0x85, 0x81, 0x89, 0x83, 0x93, 0x85, 0xa5, 0x8b,
    0xc9, 0x97, 0x7e, 0xff,
];
const tileData2 = [
    0x7c, 0x7c, 0x00, 0xc6, 0xc6, 0x00, 0x00, 0xfe, 0xc6, 0xc6, 0x00, 0xc6,
    0xc6, 0x00, 0x00, 0x00,
];
tile.loadDataToTile(tileData2);
//gpu.printTile(tile, 0, 0);
gpu.printallTile(tile);

function printHex(value: number) {
    console.log('$%d', value.toString(16));
}

function getHex(value: number) {
    return '$' + value.toString(16);
}

function printNext(adress: number, next = 8) {
    let mystring = '';
    for (let i = 0; i < next; i++) {
        mystring = mystring + getHex(mem.get8Bit(adress + i)) + ' ';
    }
    console.log(mystring);
}
