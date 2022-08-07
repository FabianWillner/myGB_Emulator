import {Timer} from '../timer/timer.js';
import {MemoryDevice} from './bus.js';
import {Memory} from './memory.js';

export class IO implements MemoryDevice {
    private SB_SerialTransferData = 0;
    private SC_SerialTransferControl = 0;
    private IF_InterruptFlag = 0;
    private memory: Memory = new Memory(0xffff);
    private timer: Timer;

    constructor(timer: Timer) {
        this.timer = timer;
    }

    read8(address: number): number {
        switch (address) {
            case 0xff01:
                return this.SB_SerialTransferData;
            case 0xff02:
                return this.SC_SerialTransferControl;
            case 0xff0f:
                return this.IF_InterruptFlag;
        }
        if (address >= 0xff04 && address <= 0xff07) {
            // TIMER
            this.timer.read8(address);
        }

        return this.memory.read8(address);
    }

    write8(address: number, value: number): void {
        switch (address) {
            case 0xff01:
                this.SB_SerialTransferData = value & 0xff;
                return;
            case 0xff02:
                console.log('something is written into it: ');
                this.SC_SerialTransferControl = value & 0xff;
                return;
            case 0xff0f:
                this.IF_InterruptFlag = value & 0xff;
                return;
        }
        if (address >= 0xff04 && address <= 0xff07) {
            // TIMER
            this.timer.write8(address, value);
        }

        this.memory.write8(address, value);
        return;
    }

    read16(address: number): number {
        return (this.read8(address + 1) << 8) | this.read8(address);
    }

    write16(address: number, value: number): void {
        this.write8(address + 1, (value & 0xff00) >> 8);
        this.write8(address, value & 0xff);
    }
}
