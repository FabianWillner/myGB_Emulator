import {Memory} from '../memory/memory.js';
import {CPURegisters} from './cpu_registers.js';
import * as instructions from '../instructions/instructions.js';

export class CPU {
    public registers: CPURegisters;
    private halted = false;
    public memory: Memory;

    public constructor() {
        this.registers = new CPURegisters();
        this.memory = new Memory();
    }

    private fetch() {
        const instructionAddress = this.registers.PC;
        const instruction = this.memory.get8Bit(instructionAddress);
        return instruction;
    }

    public step() {
        const instruction = this.fetch();

        return this.execute(instruction);
    }

    public run() {
        this.step();
        if (!this.halted) {
            setImmediate(() => this.run());
        }
    }

    public halt() {
        this.halted = true;
    }

    public start() {
        this.halted = false;
    }

    private execute(instruction: number) {
        this.printInstruction(instruction);
        const PC = this.registers.PC + 1;
        switch (instruction) {
            case instructions.NOP:
                return PC;

            default: {
                throw new Error(
                    'Instruction not implemented $' + instruction.toString(16)
                );
            }
        }
    }

    private printInstruction(instruction: number) {
        console.log(
            'Instruction: %s\tHexcode: %s\tPC %s',
            instructions.OPCODES_DEFAULT_NAMES[instruction],
            '$' + instruction.toString(16),
            '$' + this.registers.PC.toString(16)
        );
    }
}
