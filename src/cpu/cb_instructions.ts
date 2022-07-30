import * as ins from './../instructions/instructions.js';
import {ALU} from './alu.js';
import {CPU} from './cpu';

function uint8ToInt8(value: number): number {
    const maskedValue = value & 0xff;
    const sign = (maskedValue >> 7) & 1;
    return sign ? -(~maskedValue & 127) - 1 : maskedValue & 127;
}

export function executeCBInstruction(opcode: number, cpu: CPU): number {
    const registers = cpu.registers;
    const bus = cpu.bus;
    const stack = cpu.stack;
    let PC = registers.PC + 2;
    switch (opcode) {
        // RLC
        case 0x00: {
            const {value, Z, H, N, C} = ALU.rlc(registers.B);

            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }

        case 0x01: {
            const {value, Z, H, N, C} = ALU.rlc(registers.C);

            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x02: {
            const {value, Z, H, N, C} = ALU.rlc(registers.D);

            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x03: {
            const {value, Z, H, N, C} = ALU.rlc(registers.E);

            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x04: {
            const {value, Z, H, N, C} = ALU.rlc(registers.H);

            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x05: {
            const {value, Z, H, N, C} = ALU.rlc(registers.L);

            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x06: {
            const {value, Z, H, N, C} = ALU.rlc(bus.read8(registers.HL));
            bus.write8(registers.HL, value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x07: {
            const {value, Z, H, N, C} = ALU.rlc(registers.A);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }

        // Swap
        case 0x30: {
            const {value, Z, H, N, C} = ALU.swap(registers.B);
            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x31: {
            const {value, Z, H, N, C} = ALU.swap(registers.C);
            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x32: {
            const {value, Z, H, N, C} = ALU.swap(registers.D);
            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x33: {
            const {value, Z, H, N, C} = ALU.swap(registers.E);
            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x34: {
            const {value, Z, H, N, C} = ALU.swap(registers.H);
            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x35: {
            const {value, Z, H, N, C} = ALU.swap(registers.L);
            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x36: {
            const {value, Z, H, N, C} = ALU.swap(bus.read8(registers.HL));
            bus.write8(bus.read8(registers.HL), value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x37: {
            const {value, Z, H, N, C} = ALU.swap(registers.A);
            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
    }
    return 0;
}
