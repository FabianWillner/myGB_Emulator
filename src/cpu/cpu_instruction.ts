import {Bus} from '../memory/bus';
import {CPURegisters} from './cpu_registers';
import * as ins from './../instructions/instructions.js';
import {ALU} from './alu.js';

export function executeCpuInstruction(
    opcode: number,
    registers: CPURegisters,
    bus: Bus
): number {
    let PC = registers.PC + 1;
    switch (opcode) {
        case ins.NOP:
            return PC;

        case ins.JP_a16:
            PC = bus.read16(PC);
            return PC;

        case ins.DI:
            // TODO DISABLE INTERRUPT
            console.log('Disable Interrupt not implemented yet');
            return PC;

        case ins.PUSH_HL:
            bus.write16(registers.SP + 1, registers.HL);
            registers.SP -= 2;
            return PC;

        case ins.LD_HL_D16:
            registers.HL = bus.read16(PC);
            return PC + 2;

        case ins.XOR_A: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.A);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.LD_A_D8:
            registers.A = bus.read8(PC);
            return PC + 1;

        case ins.LD_B_D8:
            registers.B = bus.read8(PC);
            return PC + 1;

        case ins.LD_C_D8:
            registers.C = bus.read8(PC);
            return PC + 1;

        case ins.LD_D_D8:
            registers.D = bus.read8(PC);
            return PC + 1;

        case ins.LD_E_D8:
            registers.E = bus.read8(PC);
            return PC + 1;

        case ins.LD_H_D8:
            registers.H = bus.read8(PC);
            return PC + 1;

        case ins.LD_L_D8:
            registers.L = bus.read8(PC);
            return PC + 1;

        case ins.LD_HLD_A:
            bus.write8(registers.HL, registers.A);
            return PC;

        case ins.INC_A: {
            const {value, H, Z, N} = ALU.inc(registers.A);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.INC_B: {
            const {value, H, Z, N} = ALU.inc(registers.B);
            registers.B = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.INC_C: {
            const {value, H, Z, N} = ALU.inc(registers.C);
            registers.C = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.INC_D: {
            const {value, H, Z, N} = ALU.inc(registers.D);
            registers.D = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.INC_E: {
            const {value, H, Z, N} = ALU.inc(registers.E);
            registers.E = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.INC_H: {
            const {value, H, Z, N} = ALU.inc(registers.H);
            registers.H = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.INC_L: {
            const {value, H, Z, N} = ALU.inc(registers.L);
            registers.L = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.DEC_A: {
            const {value, H, Z, N} = ALU.dec(registers.A);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.DEC_B: {
            const {value, H, Z, N} = ALU.dec(registers.B);
            registers.B = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.DEC_C: {
            const {value, H, Z, N} = ALU.dec(registers.C);
            registers.C = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.DEC_D: {
            const {value, H, Z, N} = ALU.dec(registers.D);
            registers.D = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.DEC_E: {
            const {value, H, Z, N} = ALU.dec(registers.E);
            registers.E = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.DEC_H: {
            const {value, H, Z, N} = ALU.dec(registers.H);
            registers.H = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.DEC_L: {
            const {value, H, Z, N} = ALU.dec(registers.L);
            registers.L = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            return PC;
        }

        case ins.JR_NZ_R8:
            if (registers.flags.Z) {
                // do nothing
            } else {
                PC = (PC - 1 + bus.read8(PC)) & 0xffff;
            }
            return PC;

        case ins.RRA: {
            const {value, C} = ALU.rr(registers.A, registers.flags.C);
            registers.A = value;
            registers.flags.H = 0;
            registers.flags.Z = 0;
            registers.flags.N = 0;
            registers.flags.C = C;
            return PC;
        }

        case ins.OR_B: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.B);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        default: {
            console.log(registers);
            throw new Error(
                'Instruction not implemented $' + opcode.toString(16)
            );
        }
    }
}
