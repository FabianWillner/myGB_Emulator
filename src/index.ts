import {CPU} from './cpu/cpu.js';
//import {GPU} from './gpu/gpu.js';

const cpu = new CPU();
const mem = cpu.memory;
//const gpu = new GPU();
mem.set8Bit(0x0000, 0x00);
mem.set8Bit(0x0001, 0x10);
mem.set8Bit(0x0002, 0x11);

//cpu.run();
//cpu.halt();
console.log('Test');
cpu.step();

function printHex(value: number) {
    console.log('$%d', value.toString(16));
}

function getHex(value: number) {
    return '$' + value.toString(16);
}

function printNext(adress: number, next: number = 8) {
    let mystring = '';
    for (let i = 0; i < next; i++) {
        mystring = mystring + getHex(mem.get8Bit(adress + i)) + ' ';
    }
    console.log(mystring);
}
