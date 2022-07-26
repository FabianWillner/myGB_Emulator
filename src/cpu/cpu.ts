import {CPURegisters} from './cpu_registers.js';
import * as instructions from '../instructions/instructions.js';
import {Bus} from '../memory/bus.js';
import {Cartridge} from '../cart/cartridge.js';
import {executeCpuInstruction} from './cpu_instruction.js';

export class CPU {
    public registers: CPURegisters;
    private halted = false;
    public bus: Bus;

    public constructor(cartPath: string) {
        this.registers = new CPURegisters();
        this.bus = new Bus(new Cartridge(cartPath));
    }

    private fetch() {
        const instructionAddress = this.registers.PC;
        const instruction = this.bus.read8(instructionAddress);
        return instruction;
    }

    public step() {
        const instruction = this.fetch();
        this.registers.PC = this.execute(instruction);
        return;
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
        return executeCpuInstruction(instruction, this.registers, this.bus);
    }

    private printInstruction(instruction: number) {
        console.log(
            'Instruction: %s\tHexcode: %s\tPC %s\tNext two Bytes: %s %s',
            instructions.OPCODES_DEFAULT_NAMES[instruction],
            '$' + instruction.toString(16),
            '$' + this.registers.PC.toString(16),
            '$' + this.bus.read8(this.registers.PC + 1).toString(16),
            '$' + this.bus.read8(this.registers.PC + 2).toString(16)
        );
    }
}
