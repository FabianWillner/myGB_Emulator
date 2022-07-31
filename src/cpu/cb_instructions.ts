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
        // RRC
        case 0x08: {
            const {value, Z, H, N, C} = ALU.rrc(registers.B);
            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x09: {
            const {value, Z, H, N, C} = ALU.rrc(registers.C);
            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x0a: {
            const {value, Z, H, N, C} = ALU.rrc(registers.D);
            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x0b: {
            const {value, Z, H, N, C} = ALU.rrc(registers.E);
            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x0c: {
            const {value, Z, H, N, C} = ALU.rrc(registers.H);
            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x0d: {
            const {value, Z, H, N, C} = ALU.rrc(registers.L);
            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x0e: {
            const {value, Z, H, N, C} = ALU.rrc(bus.read8(registers.HL));
            bus.write8(registers.HL, value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x0f: {
            const {value, Z, H, N, C} = ALU.rrc(registers.A);
            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }

        // RL
        case 0x10: {
            const {value, Z, H, N, C} = ALU.rl(registers.B, registers.flags.C);
            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x11: {
            const {value, Z, H, N, C} = ALU.rl(registers.C, registers.flags.C);
            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x12: {
            const {value, Z, H, N, C} = ALU.rl(registers.D, registers.flags.C);
            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x13: {
            const {value, Z, H, N, C} = ALU.rl(registers.E, registers.flags.C);
            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x14: {
            const {value, Z, H, N, C} = ALU.rl(registers.H, registers.flags.C);
            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x15: {
            const {value, Z, H, N, C} = ALU.rl(registers.L, registers.flags.C);
            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x16: {
            const {value, Z, H, N, C} = ALU.rl(
                bus.read8(registers.HL),
                registers.flags.C
            );
            bus.write8(registers.HL, value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x17: {
            const {value, Z, H, N, C} = ALU.rl(registers.A, registers.flags.C);
            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        // RR
        case 0x18: {
            const {value, Z, H, N, C} = ALU.rr(registers.B, registers.flags.C);
            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x19: {
            const {value, Z, H, N, C} = ALU.rr(registers.C, registers.flags.C);
            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x1a: {
            const {value, Z, H, N, C} = ALU.rr(registers.D, registers.flags.C);
            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x1b: {
            const {value, Z, H, N, C} = ALU.rr(registers.E, registers.flags.C);
            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x1c: {
            const {value, Z, H, N, C} = ALU.rr(registers.H, registers.flags.C);
            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x1d: {
            const {value, Z, H, N, C} = ALU.rr(registers.L, registers.flags.C);
            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x1e: {
            const {value, Z, H, N, C} = ALU.rr(
                bus.read8(registers.HL),
                registers.flags.C
            );
            bus.write8(registers.HL, value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x1f: {
            const {value, Z, H, N, C} = ALU.rr(registers.A, registers.flags.C);
            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        // SLA
        case 0x20: {
            const {value, Z, H, N, C} = ALU.sla(registers.B);
            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x21: {
            const {value, Z, H, N, C} = ALU.sla(registers.C);
            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x22: {
            const {value, Z, H, N, C} = ALU.sla(registers.D);
            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x23: {
            const {value, Z, H, N, C} = ALU.sla(registers.E);
            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x24: {
            const {value, Z, H, N, C} = ALU.sla(registers.H);
            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x25: {
            const {value, Z, H, N, C} = ALU.sla(registers.L);
            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x26: {
            const {value, Z, H, N, C} = ALU.sla(bus.read8(registers.HL));
            bus.write8(registers.HL, value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x27: {
            const {value, Z, H, N, C} = ALU.sla(registers.A);
            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }

        // SRA
        case 0x28: {
            const {value, Z, H, N, C} = ALU.sra(registers.B);
            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x29: {
            const {value, Z, H, N, C} = ALU.sra(registers.C);
            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x2a: {
            const {value, Z, H, N, C} = ALU.sra(registers.D);
            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x2b: {
            const {value, Z, H, N, C} = ALU.sra(registers.E);
            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x2c: {
            const {value, Z, H, N, C} = ALU.sra(registers.H);
            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x2d: {
            const {value, Z, H, N, C} = ALU.sra(registers.L);
            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x2e: {
            const {value, Z, H, N, C} = ALU.sra(bus.read8(registers.HL));
            bus.write8(registers.HL, value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x2f: {
            const {value, Z, H, N, C} = ALU.sra(registers.A);
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
            bus.write8(registers.HL, value);
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

        // SRL
        case 0x38: {
            const {value, Z, H, N, C} = ALU.srl(registers.B);
            registers.B = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x39: {
            const {value, Z, H, N, C} = ALU.srl(registers.C);
            registers.C = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x3a: {
            const {value, Z, H, N, C} = ALU.srl(registers.D);
            registers.D = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x3b: {
            const {value, Z, H, N, C} = ALU.srl(registers.E);
            registers.E = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x3c: {
            const {value, Z, H, N, C} = ALU.srl(registers.H);
            registers.H = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x3d: {
            const {value, Z, H, N, C} = ALU.srl(registers.L);
            registers.L = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x3e: {
            const {value, Z, H, N, C} = ALU.srl(bus.read8(registers.HL));
            bus.write8(registers.HL, value);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x3f: {
            const {value, Z, H, N, C} = ALU.srl(registers.A);
            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }

        // BIT 0
        case 0x40: {
            const {Z, H, N} = ALU.bit(0, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x41: {
            const {Z, H, N} = ALU.bit(0, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x42: {
            const {Z, H, N} = ALU.bit(0, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x43: {
            const {Z, H, N} = ALU.bit(0, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x44: {
            const {Z, H, N} = ALU.bit(0, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x45: {
            const {Z, H, N} = ALU.bit(0, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x46: {
            const {Z, H, N} = ALU.bit(0, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x47: {
            const {Z, H, N} = ALU.bit(0, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }

        // BIT 1
        case 0x48: {
            const {Z, H, N} = ALU.bit(1, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x49: {
            const {Z, H, N} = ALU.bit(1, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x4a: {
            const {Z, H, N} = ALU.bit(1, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x4b: {
            const {Z, H, N} = ALU.bit(1, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x4c: {
            const {Z, H, N} = ALU.bit(1, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x4d: {
            const {Z, H, N} = ALU.bit(1, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x4e: {
            const {Z, H, N} = ALU.bit(1, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x4f: {
            const {Z, H, N} = ALU.bit(1, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        // BIT 2
        case 0x50: {
            const {Z, H, N} = ALU.bit(2, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x51: {
            const {Z, H, N} = ALU.bit(2, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x52: {
            const {Z, H, N} = ALU.bit(2, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x53: {
            const {Z, H, N} = ALU.bit(2, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x54: {
            const {Z, H, N} = ALU.bit(2, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x55: {
            const {Z, H, N} = ALU.bit(2, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x56: {
            const {Z, H, N} = ALU.bit(2, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x57: {
            const {Z, H, N} = ALU.bit(2, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }

        // BIT 3
        case 0x58: {
            const {Z, H, N} = ALU.bit(3, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x59: {
            const {Z, H, N} = ALU.bit(3, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x5a: {
            const {Z, H, N} = ALU.bit(3, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x5b: {
            const {Z, H, N} = ALU.bit(3, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x5c: {
            const {Z, H, N} = ALU.bit(3, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x5d: {
            const {Z, H, N} = ALU.bit(3, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x5e: {
            const {Z, H, N} = ALU.bit(3, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x5f: {
            const {Z, H, N} = ALU.bit(3, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        // BIT 4
        case 0x60: {
            const {Z, H, N} = ALU.bit(4, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x61: {
            const {Z, H, N} = ALU.bit(4, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x62: {
            const {Z, H, N} = ALU.bit(4, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x63: {
            const {Z, H, N} = ALU.bit(4, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x64: {
            const {Z, H, N} = ALU.bit(4, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x65: {
            const {Z, H, N} = ALU.bit(4, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x66: {
            const {Z, H, N} = ALU.bit(4, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x67: {
            const {Z, H, N} = ALU.bit(4, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }

        // BIT 5
        case 0x68: {
            const {Z, H, N} = ALU.bit(5, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x69: {
            const {Z, H, N} = ALU.bit(5, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x6a: {
            const {Z, H, N} = ALU.bit(5, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x6b: {
            const {Z, H, N} = ALU.bit(5, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x6c: {
            const {Z, H, N} = ALU.bit(5, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x6d: {
            const {Z, H, N} = ALU.bit(5, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x6e: {
            const {Z, H, N} = ALU.bit(5, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x6f: {
            const {Z, H, N} = ALU.bit(5, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        // BIT 6
        case 0x70: {
            const {Z, H, N} = ALU.bit(6, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x71: {
            const {Z, H, N} = ALU.bit(6, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x72: {
            const {Z, H, N} = ALU.bit(6, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x73: {
            const {Z, H, N} = ALU.bit(6, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x74: {
            const {Z, H, N} = ALU.bit(6, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x75: {
            const {Z, H, N} = ALU.bit(6, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x76: {
            const {Z, H, N} = ALU.bit(6, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x77: {
            const {Z, H, N} = ALU.bit(6, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }

        // BIT 7
        case 0x78: {
            const {Z, H, N} = ALU.bit(7, registers.B);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x79: {
            const {Z, H, N} = ALU.bit(7, registers.C);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x7a: {
            const {Z, H, N} = ALU.bit(7, registers.D);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x7b: {
            const {Z, H, N} = ALU.bit(7, registers.E);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x7c: {
            const {Z, H, N} = ALU.bit(7, registers.H);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x7d: {
            const {Z, H, N} = ALU.bit(7, registers.L);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x7e: {
            const {Z, H, N} = ALU.bit(7, bus.read8(registers.HL));
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(16);
            return PC;
        }
        case 0x7f: {
            const {Z, H, N} = ALU.bit(7, registers.A);
            registers.flags.Z = Z;
            registers.flags.H = H;
            registers.flags.N = N;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 0
        case 0x80: {
            registers.B = ALU.res(0, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x81: {
            registers.C = ALU.res(0, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x82: {
            registers.D = ALU.res(0, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x83: {
            registers.E = ALU.res(0, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x84: {
            registers.H = ALU.res(0, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x85: {
            registers.L = ALU.res(0, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x86: {
            bus.write8(registers.HL, ALU.res(0, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0x87: {
            registers.A = ALU.res(0, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 1
        case 0x88: {
            registers.B = ALU.res(1, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x89: {
            registers.C = ALU.res(1, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x8a: {
            registers.D = ALU.res(1, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x8b: {
            registers.E = ALU.res(1, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x8c: {
            registers.H = ALU.res(1, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x8d: {
            registers.L = ALU.res(1, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x8e: {
            bus.write8(registers.HL, ALU.res(1, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0x8f: {
            registers.A = ALU.res(1, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 2
        case 0x90: {
            registers.B = ALU.res(2, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x91: {
            registers.C = ALU.res(2, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x92: {
            registers.D = ALU.res(2, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x93: {
            registers.E = ALU.res(2, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x94: {
            registers.H = ALU.res(2, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x95: {
            registers.L = ALU.res(2, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x96: {
            bus.write8(registers.HL, ALU.res(2, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0x97: {
            registers.A = ALU.res(2, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 3
        case 0x98: {
            registers.B = ALU.res(3, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x99: {
            registers.C = ALU.res(3, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x9a: {
            registers.D = ALU.res(3, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x9b: {
            registers.E = ALU.res(3, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x9c: {
            registers.H = ALU.res(3, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x9d: {
            registers.L = ALU.res(3, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0x9e: {
            bus.write8(registers.HL, ALU.res(3, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0x9f: {
            registers.A = ALU.res(3, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 4
        case 0xa0: {
            registers.B = ALU.res(4, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xa1: {
            registers.C = ALU.res(4, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xa2: {
            registers.D = ALU.res(4, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xa3: {
            registers.E = ALU.res(4, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xa4: {
            registers.H = ALU.res(4, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xa5: {
            registers.L = ALU.res(4, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xa6: {
            bus.write8(registers.HL, ALU.res(4, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xa7: {
            registers.A = ALU.res(4, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 5
        case 0xa8: {
            registers.B = ALU.res(5, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xa9: {
            registers.C = ALU.res(5, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xaa: {
            registers.D = ALU.res(5, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xab: {
            registers.E = ALU.res(5, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xac: {
            registers.H = ALU.res(5, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xad: {
            registers.L = ALU.res(5, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xae: {
            bus.write8(registers.HL, ALU.res(5, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xaf: {
            registers.A = ALU.res(5, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 6
        case 0xb0: {
            registers.B = ALU.res(6, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xb1: {
            registers.C = ALU.res(6, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xb2: {
            registers.D = ALU.res(6, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xb3: {
            registers.E = ALU.res(6, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xb4: {
            registers.H = ALU.res(6, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xb5: {
            registers.L = ALU.res(6, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xb6: {
            bus.write8(registers.HL, ALU.res(6, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xb7: {
            registers.A = ALU.res(6, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // RES 7
        case 0xb8: {
            registers.B = ALU.res(7, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xb9: {
            registers.C = ALU.res(7, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xba: {
            registers.D = ALU.res(7, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xbb: {
            registers.E = ALU.res(7, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xbc: {
            registers.H = ALU.res(7, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xbd: {
            registers.L = ALU.res(7, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xbe: {
            bus.write8(registers.HL, ALU.res(7, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xbf: {
            registers.A = ALU.res(7, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // SET 0
        case 0xc0: {
            registers.B = ALU.set(0, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xc1: {
            registers.C = ALU.set(0, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xc2: {
            registers.D = ALU.set(0, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xc3: {
            registers.E = ALU.set(0, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xc4: {
            registers.H = ALU.set(0, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xc5: {
            registers.L = ALU.set(0, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xc6: {
            bus.write8(registers.HL, ALU.set(0, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xc7: {
            registers.A = ALU.set(0, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // set 1
        case 0xc8: {
            registers.B = ALU.set(1, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xc9: {
            registers.C = ALU.set(1, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xca: {
            registers.D = ALU.set(1, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xcb: {
            registers.E = ALU.set(1, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xcc: {
            registers.H = ALU.set(1, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xcd: {
            registers.L = ALU.set(1, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xce: {
            bus.write8(registers.HL, ALU.set(1, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xcf: {
            registers.A = ALU.set(1, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // SET 2
        case 0xd0: {
            registers.B = ALU.set(2, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xd1: {
            registers.C = ALU.set(2, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xd2: {
            registers.D = ALU.set(2, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xd3: {
            registers.E = ALU.set(2, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xd4: {
            registers.H = ALU.set(2, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xd5: {
            registers.L = ALU.set(2, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xd6: {
            bus.write8(registers.HL, ALU.set(2, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xd7: {
            registers.A = ALU.set(2, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // set 3
        case 0xd8: {
            registers.B = ALU.set(3, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xd9: {
            registers.C = ALU.set(3, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xda: {
            registers.D = ALU.set(3, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xdb: {
            registers.E = ALU.set(3, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xdc: {
            registers.H = ALU.set(3, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xdd: {
            registers.L = ALU.set(3, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xde: {
            bus.write8(registers.HL, ALU.set(3, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xdf: {
            registers.A = ALU.set(3, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // SET 4
        case 0xe0: {
            registers.B = ALU.set(4, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xe1: {
            registers.C = ALU.set(4, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xe2: {
            registers.D = ALU.set(4, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xe3: {
            registers.E = ALU.set(4, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xe4: {
            registers.H = ALU.set(4, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xe5: {
            registers.L = ALU.set(4, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xe6: {
            bus.write8(registers.HL, ALU.set(4, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xe7: {
            registers.A = ALU.set(4, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // set 5
        case 0xe8: {
            registers.B = ALU.set(5, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xe9: {
            registers.C = ALU.set(5, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xea: {
            registers.D = ALU.set(5, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xeb: {
            registers.E = ALU.set(5, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xec: {
            registers.H = ALU.set(5, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xed: {
            registers.L = ALU.set(5, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xee: {
            bus.write8(registers.HL, ALU.set(5, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xef: {
            registers.A = ALU.set(5, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // SET 6
        case 0xf0: {
            registers.B = ALU.set(6, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xf1: {
            registers.C = ALU.set(6, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xf2: {
            registers.D = ALU.set(6, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xf3: {
            registers.E = ALU.set(6, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xf4: {
            registers.H = ALU.set(6, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xf5: {
            registers.L = ALU.set(6, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xf6: {
            bus.write8(registers.HL, ALU.set(6, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xf7: {
            registers.A = ALU.set(6, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }

        // set 7
        case 0xf8: {
            registers.B = ALU.set(7, registers.B).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xf9: {
            registers.C = ALU.set(7, registers.C).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xfa: {
            registers.D = ALU.set(7, registers.D).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xfb: {
            registers.E = ALU.set(7, registers.E).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xfc: {
            registers.H = ALU.set(7, registers.H).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xfd: {
            registers.L = ALU.set(7, registers.L).value;
            cpu.emuCycle(8);
            return PC;
        }
        case 0xfe: {
            bus.write8(registers.HL, ALU.set(7, bus.read8(registers.HL)).value);
            cpu.emuCycle(16);
            return PC;
        }
        case 0xff: {
            registers.A = ALU.set(7, registers.A).value;
            cpu.emuCycle(8);
            return PC;
        }
    }
    return 0;
}
