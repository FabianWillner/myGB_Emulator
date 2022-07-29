import {Bus} from '../memory/bus';
import {CPURegisters} from './cpu_registers';

export class Stack {
    private bus: Bus;
    private registers: CPURegisters;

    constructor(bus: Bus, registers: CPURegisters) {
        this.bus = bus;
        this.registers = registers;
    }

    public push8(data: number) {
        this.registers.SP--;
        this.bus.write8(this.registers.SP, data);
    }

    public push16(data: number) {
        this.push8((data >> 8) & 0xff);
        this.push8(data & 0xff);
    }

    public pop8() {
        return this.bus.read8(this.registers.SP++);
    }

    public pop16(): number {
        const lo = this.pop8();
        const hi = this.pop8();
        return (hi << 8) | lo;
    }
}
