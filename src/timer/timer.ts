import {InterruptHandler, InterruptType} from '../cpu/interruptHandler.js';
import {MemoryDevice} from '../memory/bus.js';

export class Timer implements MemoryDevice {
    private div = 0; // FF04
    private tima = 0; // FF05
    private tma = 0; // FF06
    private tac = 0; // FF07
    private interruptHandler: InterruptHandler;

    constructor(interruptHandler: InterruptHandler) {
        this.interruptHandler = interruptHandler;
    }
    read8(address: number): number {
        switch (address) {
            case 0xff04:
                // DIV
                return this.div >> 8;
            case 0xff05:
                // TIMA
                return this.tima;
            case 0xff06:
                //TMA
                return this.tma;
            case 0xff07:
                //TAC
                return this.tac;

            default:
                return 0;
        }
    }
    read16(address: number): number {
        throw new Error('Method not implemented.');
    }
    write8(address: number, value: number): void {
        switch (address) {
            case 0xff04:
                // DIV
                this.div = 0;
                break;
            case 0xff05:
                // TIMA
                this.tima = value;
                return;
            case 0xff06:
                //TMA
                this.tma = value;
                return;
            case 0xff07:
                //TAC
                this.tac = value;
                return;

            default:
                break;
        }
        throw new Error('Method not implemented.');
    }
    write16(address: number, value: number): void {
        throw new Error('Method not implemented.');
    }

    public init() {
        this.div = 0xac00;
    }

    public tick() {
        const prevDiv = this.div;

        this.div++;

        let timerUpdate: boolean | number = false;

        switch (this.tac & 0b11) {
            case 0b00:
                timerUpdate = prevDiv & (1 << 9) && !(this.div & (1 << 9));
                break;
            case 0b01:
                timerUpdate = prevDiv & (1 << 3) && !(this.div & (1 << 9));
                break;
            case 0b10:
                timerUpdate = prevDiv & (1 << 5) && !(this.div & (1 << 9));
                break;
            case 0b11:
                timerUpdate = prevDiv & (1 << 7) && !(this.div & (1 << 9));
                break;

            default:
                break;
        }

        if (timerUpdate && this.tac & (1 << 2)) {
            this.tima++;
            if (this.tima >= 0xff) {
                this.tima = this.tma;
                this.interruptHandler.setInterruptFlags(
                    InterruptType.Timer,
                    true
                );
            }
        }
    }
}
