import * as ins from './../instructions/instructions.js';
import {ALU} from './alu.js';
import {executeCBInstruction} from './cb_instructions.js';
import {CPU} from './cpu';

function uint8ToInt8(value: number): number {
    const maskedValue = value & 0xff;
    const sign = (maskedValue >> 7) & 1;
    return sign ? -(~maskedValue & 127) - 1 : maskedValue & 127;
}

export function executeCpuInstruction(opcode: number, cpu: CPU): number {
    const registers = cpu.registers;
    const bus = cpu.bus;
    const stack = cpu.stack;
    let PC = registers.PC + 1;
    switch (opcode) {
        case ins.NOP:
            return PC;

        case ins.CB:
            return executeCBInstruction(bus.read8(PC), cpu);

        case ins.JP_a16:
            PC = bus.read16(PC);
            return PC;

        case ins.DI:
            cpu.emuCycle(4);
            cpu.masterInterrupt = false;
            return PC;

        case ins.HALT:
            cpu.emuCycle(4);
            cpu.halt();
            return PC;

        case ins.LD_A_HLD:
            registers.A = bus.read8(registers.HL--);
            cpu.emuCycle(8);
            return PC;

        case ins.LD_A_HLI:
            registers.A = bus.read8(registers.HL++);
            cpu.emuCycle(8);
            return PC;

        case ins.LD_DE_A:
            bus.write8(registers.DE, registers.A);
            cpu.emuCycle(8);
            return PC;

        case ins.EI:
            cpu.emuCycle(4);
            cpu.shouldEnableInterrupt;
            return PC;

        case ins.PUSH_HL:
            stack.push16(registers.HL);
            return PC;

        case ins.LD_BC_D16:
            registers.BC = bus.read16(PC);
            return PC + 2;

        case ins.LD_DE_D16:
            registers.DE = bus.read16(PC);
            return PC + 2;

        case ins.LD_HL_D16:
            registers.HL = bus.read16(PC);
            return PC + 2;

        case ins.LD_SP_D16:
            registers.SP = bus.read16(PC);
            return PC + 2;

        case ins.XOR_A: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.A);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.XOR_B: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.B);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.XOR_C: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.C);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.XOR_D: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.D);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.XOR_E: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.E);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.XOR_H: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.H);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.XOR_L: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, registers.L);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.XOR_HL: {
            const {value, H, Z, N, C} = ALU.xor(
                registers.A,
                bus.read8(registers.HL)
            );
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case ins.XOR_D8: {
            const {value, H, Z, N, C} = ALU.xor(registers.A, bus.read8(PC));
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC + 1;
        }

        case ins.ADD_A_A: {
            const {value, H, Z, N, C} = ALU.add(registers.A, registers.A);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.ADD_A_B: {
            const {value, H, Z, N, C} = ALU.add(registers.A, registers.B);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.ADD_A_C: {
            const {value, H, Z, N, C} = ALU.add(registers.A, registers.C);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.ADD_A_D: {
            const {value, H, Z, N, C} = ALU.add(registers.A, registers.D);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.ADD_A_E: {
            const {value, H, Z, N, C} = ALU.add(registers.A, registers.E);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.ADD_A_H: {
            const {value, H, Z, N, C} = ALU.add(registers.A, registers.H);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.ADD_A_L: {
            const {value, H, Z, N, C} = ALU.add(registers.A, registers.L);
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.ADD_A_HL: {
            const {value, H, Z, N, C} = ALU.add(
                registers.A,
                bus.read8(registers.HL)
            );
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case ins.ADD_A_D8: {
            const {value, H, Z, N, C} = ALU.add(registers.A, bus.read8(PC));
            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC + 1;
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
            bus.write8(registers.HL--, registers.A);
            cpu.emuCycle(8);
            return PC;

        case ins.LD_HLI_A:
            bus.write8(registers.HL++, registers.A);
            cpu.emuCycle(8);
            return PC;

        case ins.LD_A_A:
            registers.A = registers.A;
            return PC;

        case ins.LD_A_B:
            registers.A = registers.B;
            return PC;

        case ins.LD_A_C:
            registers.A = registers.C;
            return PC;

        case ins.LD_A_D:
            registers.A = registers.D;
            return PC;

        case ins.LD_A_E:
            registers.A = registers.E;
            return PC;

        case ins.LD_A_H:
            registers.A = registers.H;
            return PC;

        case ins.LD_A_L:
            registers.A = registers.L;
            return PC;

        case ins.LD_A_HL:
            registers.A = bus.read8(registers.HL);
            return PC;

        case ins.LD_B_A:
            registers.B = registers.A;
            return PC;

        case ins.LD_B_B:
            registers.B = registers.B;
            return PC;

        case ins.LD_B_C:
            registers.B = registers.C;
            return PC;

        case ins.LD_B_D:
            registers.B = registers.D;
            return PC;

        case ins.LD_B_E:
            registers.B = registers.E;
            return PC;

        case ins.LD_B_H:
            registers.B = registers.H;
            return PC;

        case ins.LD_B_L:
            registers.B = registers.L;
            return PC;

        case ins.LD_B_HL:
            registers.B = bus.read8(registers.HL);
            return PC;

        case ins.LD_C_A:
            registers.C = registers.A;
            return PC;

        case ins.LD_C_B:
            registers.C = registers.B;
            return PC;

        case ins.LD_C_C:
            registers.C = registers.C;
            return PC;

        case ins.LD_C_D:
            registers.C = registers.D;
            return PC;

        case ins.LD_C_E:
            registers.C = registers.E;
            return PC;

        case ins.LD_C_H:
            registers.C = registers.H;
            return PC;

        case ins.LD_C_L:
            registers.C = registers.L;
            return PC;

        case ins.LD_C_HL:
            registers.C = bus.read8(registers.HL);
            return PC;

        case ins.LD_D_A:
            registers.D = registers.A;
            return PC;

        case ins.LD_D_B:
            registers.D = registers.B;
            return PC;

        case ins.LD_D_C:
            registers.D = registers.C;
            return PC;

        case ins.LD_D_D:
            registers.D = registers.D;
            return PC;

        case ins.LD_D_E:
            registers.D = registers.E;
            return PC;

        case ins.LD_D_H:
            registers.D = registers.H;
            return PC;

        case ins.LD_D_L:
            registers.D = registers.L;
            return PC;

        case ins.LD_D_HL:
            registers.D = bus.read8(registers.HL);
            return PC;

        case ins.LD_E_A:
            registers.E = registers.A;
            return PC;

        case ins.LD_E_B:
            registers.E = registers.B;
            return PC;

        case ins.LD_E_C:
            registers.E = registers.C;
            return PC;

        case ins.LD_E_D:
            registers.E = registers.D;
            return PC;

        case ins.LD_E_E:
            registers.E = registers.E;
            return PC;

        case ins.LD_E_H:
            registers.E = registers.H;
            return PC;

        case ins.LD_E_L:
            registers.E = registers.L;
            return PC;

        case ins.LD_E_HL:
            registers.E = bus.read8(registers.HL);
            return PC;

        case ins.LD_H_A:
            registers.H = registers.A;
            return PC;

        case ins.LD_H_B:
            registers.H = registers.B;
            return PC;

        case ins.LD_H_C:
            registers.H = registers.C;
            return PC;

        case ins.LD_H_D:
            registers.H = registers.D;
            return PC;

        case ins.LD_H_E:
            registers.H = registers.E;
            return PC;

        case ins.LD_H_H:
            registers.H = registers.H;
            return PC;

        case ins.LD_H_L:
            registers.H = registers.L;
            return PC;

        case ins.LD_H_HL:
            registers.H = bus.read8(registers.HL);
            return PC;

        case ins.LD_L_A:
            registers.L = registers.A;
            return PC;

        case ins.LD_L_B:
            registers.L = registers.B;
            return PC;

        case ins.LD_L_C:
            registers.L = registers.C;
            return PC;

        case ins.LD_L_D:
            registers.L = registers.D;
            return PC;

        case ins.LD_L_E:
            registers.L = registers.E;
            return PC;

        case ins.LD_L_H:
            registers.L = registers.H;
            return PC;

        case ins.LD_L_L:
            registers.L = registers.L;
            return PC;

        case ins.LD_L_HL:
            registers.H = bus.read8(registers.HL);
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
        case ins.CALL_A16:
            stack.push16(PC + 2);
            cpu.emuCycle(24);
            return bus.read16(PC);
        case ins.CALL_NZ:
            if (registers.flags.Z) {
                cpu.emuCycle(12);
                return PC + 2;
            }
            stack.push16(PC + 2);
            cpu.emuCycle(24);
            return bus.read16(PC);
        case ins.CALL_Z:
            if (!registers.flags.Z) {
                cpu.emuCycle(12);
                return PC + 2;
            }
            stack.push16(PC + 2);
            cpu.emuCycle(24);
            return bus.read16(PC);
        case ins.CALL_NC:
            if (registers.flags.C) {
                cpu.emuCycle(12);
                return PC + 2;
            }
            stack.push16(PC + 2);
            cpu.emuCycle(24);
            return bus.read16(PC);
        case ins.CALL_C:
            if (!registers.flags.C) {
                cpu.emuCycle(12);
                return PC + 2;
            }
            stack.push16(PC + 2);
            cpu.emuCycle(24);
            return bus.read16(PC);

        case ins.LD_A_DE:
            registers.A = bus.read8(registers.DE);
            cpu.emuCycle(8);
            return PC;

        case ins.JR_R8:
            const signedVal = uint8ToInt8(bus.read8(PC));
            cpu.emuCycle(12);
            return PC + 1 + signedVal;

        case ins.LD_BC_A:
            bus.write8(registers.BC, registers.A);
            cpu.emuCycle(8);
            return PC;

        case ins.RET:
            cpu.emuCycle(8);
            return stack.pop16();
        case ins.RET_NZ:
            cpu.emuCycle(8);
            if (!registers.flags.Z) {
                return stack.pop16();
            }
            return PC;
        case ins.RET_Z:
            cpu.emuCycle(8);
            if (registers.flags.Z) {
                return stack.pop16();
            }
            return PC;
        case ins.RET_NC:
            cpu.emuCycle(8);
            if (!registers.flags.C) {
                return stack.pop16();
            }
            return PC;
        case ins.RET_C:
            cpu.emuCycle(8);
            if (registers.flags.C) {
                return stack.pop16();
            }
            return PC;

        case ins.POP_AF:
            registers.AF = stack.pop16();
            cpu.emuCycle(12);
            return PC;
        case ins.POP_BC:
            registers.BC = stack.pop16();
            cpu.emuCycle(12);
            return PC;
        case ins.POP_DE:
            registers.DE = stack.pop16();
            cpu.emuCycle(12);
            return PC;
        case ins.POP_HL:
            registers.HL = stack.pop16();
            cpu.emuCycle(12);
            return PC;

        case ins.PUSH_AF:
            stack.push16(registers.AF);
            cpu.emuCycle(16);
            return PC;
        case ins.PUSH_BC:
            stack.push16(registers.BC);
            cpu.emuCycle(16);
            return PC;
        case ins.PUSH_DE:
            stack.push16(registers.DE);
            cpu.emuCycle(16);
            return PC;

        case ins.LD_A16_A:
            bus.write8(bus.read16(PC), registers.A);
            cpu.emuCycle(16);
            return PC + 2;

        case ins.LD_A_A16:
            registers.A = bus.read8(bus.read16(PC));
            cpu.emuCycle(16);
            return PC + 2;

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
                cpu.emuCycle(8);
                PC++;
            } else {
                const offset = uint8ToInt8(bus.read8(PC));
                PC = PC + 1 + offset;
                cpu.emuCycle(12);
            }
            return PC;
        case ins.JR_Z_R8:
            if (!registers.flags.Z) {
                cpu.emuCycle(8);
                PC++;
            } else {
                const offset = uint8ToInt8(bus.read8(PC));
                PC = PC + 1 + offset;
                cpu.emuCycle(12);
            }
            return PC;
        case ins.JR_NC_R8:
            if (registers.flags.C) {
                cpu.emuCycle(8);
                PC++;
            } else {
                const offset = uint8ToInt8(bus.read8(PC));
                PC = PC + 1 + offset;
                cpu.emuCycle(12);
            }
            return PC;
        case ins.JR_C_R8:
            if (!registers.flags.C) {
                cpu.emuCycle(8);
                PC++;
            } else {
                const offset = uint8ToInt8(bus.read8(PC));
                PC = PC + 1 + offset;
                cpu.emuCycle(12);
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

        case ins.AND_A: {
            const {value, H, Z, N, C} = ALU.and(registers.A, registers.A);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.AND_B: {
            const {value, H, Z, N, C} = ALU.and(registers.A, registers.B);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.AND_C: {
            const {value, H, Z, N, C} = ALU.and(registers.A, registers.C);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.AND_D: {
            const {value, H, Z, N, C} = ALU.and(registers.A, registers.D);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.AND_E: {
            const {value, H, Z, N, C} = ALU.and(registers.A, registers.E);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.AND_H: {
            const {value, H, Z, N, C} = ALU.and(registers.A, registers.H);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.AND_L: {
            const {value, H, Z, N, C} = ALU.and(registers.A, registers.L);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.AND_HL: {
            const {value, H, Z, N, C} = ALU.and(
                registers.A,
                bus.read8(registers.HL)
            );

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC;
        }
        case ins.AND_D8: {
            const {value, H, Z, N, C} = ALU.and(registers.A, bus.read8(PC));

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(8);
            return PC + 1;
        }

        case ins.OR_A: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.A);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }

        case ins.OR_B: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.B);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.OR_C: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.C);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.OR_D: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.D);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.OR_E: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.E);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.OR_H: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.H);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }
        case ins.OR_L: {
            const {value, H, Z, N, C} = ALU.or(registers.A, registers.L);

            registers.A = value;
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            cpu.emuCycle(4);
            return PC;
        }

        case ins.CP_A: {
            const {H, Z, N, C} = ALU.sub(registers.A, registers.A);
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_B: {
            const {H, Z, N, C} = ALU.sub(registers.A, registers.B);
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_C: {
            const {H, Z, N, C} = ALU.sub(registers.A, registers.C);
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_D: {
            const {H, Z, N, C} = ALU.sub(registers.A, registers.D);
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_E: {
            const {H, Z, N, C} = ALU.sub(registers.A, registers.E);
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_H: {
            const {H, Z, N, C} = ALU.sub(registers.A, registers.H);
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_L: {
            const {H, Z, N, C} = ALU.sub(registers.A, registers.L);
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_HL: {
            const {H, Z, N, C} = ALU.sub(registers.A, bus.read8(registers.HL));
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC;
        }

        case ins.CP_D8: {
            const {H, Z, N, C} = ALU.sub(registers.A, bus.read8(PC));
            registers.flags.H = H;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.C = C;
            return PC + 1;
        }

        case ins.ADD_HL_BC: {
            const {value, N, H, C} = ALU.add16(registers.HL, registers.BC);

            registers.HL = value;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADD_HL_DE: {
            const {value, N, H, C} = ALU.add16(registers.HL, registers.DE);

            registers.HL = value;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADD_HL_HL: {
            const {value, N, H, C} = ALU.add16(registers.HL, registers.HL);

            registers.HL = value;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADD_HL_SP: {
            const {value, N, H, C} = ALU.add16(registers.HL, registers.SP);

            registers.HL = value;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.LD_HL_A: {
            bus.write8(registers.HL, registers.A);
            return PC;
        }
        case ins.LD_HL_B: {
            bus.write8(registers.HL, registers.B);
            return PC;
        }
        case ins.LD_HL_C: {
            bus.write8(registers.HL, registers.C);
            return PC;
        }
        case ins.LD_HL_D: {
            bus.write8(registers.HL, registers.D);
            return PC;
        }
        case ins.LD_HL_E: {
            bus.write8(registers.HL, registers.E);
            return PC;
        }
        case ins.LD_HL_H: {
            bus.write8(registers.HL, registers.H);
            return PC;
        }
        case ins.LD_HL_L: {
            bus.write8(registers.HL, registers.L);
            return PC;
        }
        case ins.LD_HL_D8: {
            bus.write8(registers.HL, bus.read8(PC));
            return PC + 1;
        }
        case ins.RLCA: {
            const shifted = registers.A << 1;
            const carry = (shifted >> 8) & 1;

            registers.A = (shifted & 0xff) | carry;
            registers.flags.Z = 0;
            registers.flags.N = 0;
            registers.flags.H = 0;
            registers.flags.C = carry;
            return PC;
        }

        case ins.LD_A16_SP:
            bus.write16(bus.read16(PC), registers.SP);
            return PC + 2;

        case ins.JP_NZ_A16:
            if (registers.flags.Z) {
                PC += 2;
            } else {
                PC = bus.read16(PC);
            }
            return PC;

        case ins.JP_Z_A16:
            if (!registers.flags.Z) {
                PC += 2;
            } else {
                PC = bus.read16(PC);
            }
            return PC;

        case ins.JP_NC_A16:
            if (registers.flags.C) {
                PC += 2;
            } else {
                PC = bus.read16(PC);
            }
            return PC;

        case ins.JP_C_A16:
            if (!registers.flags.C) {
                PC += 2;
            } else {
                PC = bus.read16(PC);
            }
            return PC;

        case ins.INC_BC: {
            const {value} = ALU.inc16(registers.BC);
            registers.BC = value;
            return PC;
        }
        case ins.INC_DE: {
            const {value} = ALU.inc16(registers.DE);
            registers.DE = value;
            return PC;
        }
        case ins.INC_HL: {
            const {value} = ALU.inc16(registers.HL);
            registers.HL = value;
            return PC;
        }
        case ins.INC_BC: {
            const {value} = ALU.inc16(registers.BC);
            registers.BC = value;
            return PC;
        }

        case ins.ADC_A_A: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                registers.A,
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_B: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                registers.B,
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_C: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                registers.C,
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_D: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                registers.D,
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_E: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                registers.E,
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_H: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                registers.H,
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_L: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                registers.L,
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_HL: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                bus.read8(registers.HL),
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }

        case ins.ADC_A_D8: {
            const {value, Z, N, H, C} = ALU.adc(
                registers.A,
                bus.read8(PC),
                registers.flags.C
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC + 1;
        }

        case ins.SUB_A: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, registers.A);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_B: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, registers.B);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_C: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, registers.C);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_D: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, registers.D);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_E: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, registers.E);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_H: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, registers.H);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_L: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, registers.L);

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_HL: {
            const {value, Z, N, H, C} = ALU.sub(
                registers.A,
                bus.read8(registers.HL)
            );

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC;
        }
        case ins.SUB_D8: {
            const {value, Z, N, H, C} = ALU.sub(registers.A, bus.read8(PC));

            registers.A = value;
            registers.flags.Z = Z;
            registers.flags.N = N;
            registers.flags.H = H;
            registers.flags.C = C;
            return PC + 1;
        }

        case ins.LDH_A8_A:
            bus.write16(0xff00 + bus.read8(PC), registers.A);
            return PC + 1;

        case ins.LDH_A_A8:
            registers.A = bus.read8((0xff00 + bus.read8(PC)) & 0xffff);
            return PC + 1;

        default: {
            console.log(registers);
            throw new Error(
                'Instruction not implemented $' + opcode.toString(16)
            );
        }
    }
}
