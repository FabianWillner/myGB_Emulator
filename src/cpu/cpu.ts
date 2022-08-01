import {CPURegisters} from './cpu_registers.js';
import * as instructions from '../instructions/instructions.js';
import {Bus} from '../memory/bus.js';
import {Cartridge} from '../cart/cartridge.js';
import {executeCpuInstruction} from './cpu_instruction.js';
import {GPU} from '../gpu/gpu.js';
import {Stack} from './stack.js';
import {getTokenSourceMapRange} from 'typescript';
import {timeStamp} from 'console';
import {InterruptHandler, InterruptType} from './interruptHandler.js';
import {DBG} from '../misc/dbg.js';

export class CPU {
    public registers: CPURegisters;
    private halted = false;
    private stopped = false;
    public bus: Bus;
    //public gpu: GPU;
    public firstStartup = true;
    public stack: Stack;
    public masterInterrupt: boolean = true;
    public shouldEnableInterrupt = false;
    public interruptHandler: InterruptHandler;
    public dbg: DBG;

    public constructor() {
        this.registers = new CPURegisters();
        this.bus = new Bus(new Cartridge());
        //this.gpu = new GPU();
        this.stack = new Stack(this.bus, this.registers);
        this.interruptHandler = new InterruptHandler(this);
        this.dbg = new DBG(this.bus);
    }

    private fetch() {
        const instructionAddress = this.registers.PC;
        const instruction = this.bus.read8(instructionAddress);
        return instruction;
    }

    public loadCart(cartPath: string) {
        this.bus.loadCart(cartPath);
    }

    public step() {
        if (this.stopped) {
            return;
        }
        const interrupt = this.interruptHandler.getCurrentInterrupt();
        this.interruptHandler.exeInterrupt(interrupt);
        const instruction = this.fetch();
        this.registers.PC = this.execute(instruction);
    }

    public run() {
        if (this.firstStartup) {
            this.exefirstStartup();
            this.firstStartup = false;
        }
        this.internalRun();
    }

    private internalRun() {
        this.step();
        if (!this.halted) {
            setImmediate(() => this.internalRun());
        } else if (this.masterInterrupt) {
            while (
                this.interruptHandler.getCurrentInterrupt() ===
                InterruptType.None
            ) {
                // Do nothing
            }
            this.start();
            setImmediate(() => this.internalRun());
            return;
        } else {
            const interrupt = this.interruptHandler.getCurrentInterrupt();
            if (interrupt === InterruptType.None) {
                while (
                    this.interruptHandler.getCurrentInterrupt() ===
                    InterruptType.None
                ) {
                    // Do nothing
                }
                this.start();
                setImmediate(() => this.internalRun());
                return;
            } else {
                // HALT BUG
                this.start();
                const instruction = this.fetch();
                this.registers.PC--;
                this.registers.PC = this.execute(instruction);
                setImmediate(() => this.internalRun());
            }
        }
    }

    public halt() {
        this.halted = true;
    }

    public start() {
        this.halted = false;
    }

    public stop() {
        this.stopped = true;
    }

    private execute(instruction: number) {
        //this.printAll();
        //this.printInstruction(instruction);
        this.dbg.update();
        this.dbg.print();
        return executeCpuInstruction(instruction, this);
    }

    public emuCycle(cycles: number, enableInterrupt: boolean = false) {
        // TODO

        if (cycles > 0) {
            if (enableInterrupt) {
                this.shouldEnableInterrupt = false;
                this.masterInterrupt = true;
                this.emuCycle(cycles - 1, false);
                return;
            } else if (this.shouldEnableInterrupt) {
                this.emuCycle(cycles - 1, true);
                return;
            }
            this.emuCycle(cycles - 1, enableInterrupt);
        }
        return;
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

    private printAll() {
        console.log(
            'A: %s F: %s B: %s C: %s D: %s E: %s H: %s L: %s SP: %s PC: 00:%s (%s %s %s %s)',
            toHex(this.registers.A),
            toHex(this.registers.F),
            toHex(this.registers.B),
            toHex(this.registers.C),
            toHex(this.registers.D),
            toHex(this.registers.E),
            toHex(this.registers.H),
            toHex(this.registers.L),
            toHex(this.registers.SP, 4),
            toHex(this.registers.PC, 4),
            toHex(this.bus.read8(this.registers.PC)),
            toHex(this.bus.read8(this.registers.PC + 1)),
            toHex(this.bus.read8(this.registers.PC + 2)),
            toHex(this.bus.read8(this.registers.PC + 3))
        );
    }

    private exefirstStartup() {
        this.registers.AF = 0x01b0;
        this.registers.BC = 0x0013;
        this.registers.DE = 0x00d8;
        this.registers.HL = 0x014d;
        this.registers.SP = 0xfffe;
        this.bus.write8(0xff05, 0x00);
        this.bus.write8(0xff06, 0x00);
        this.bus.write8(0xff07, 0x00);
        this.bus.write8(0xff10, 0x80);
        this.bus.write8(0xff11, 0xbf);
        this.bus.write8(0xff12, 0xf3);
        this.bus.write8(0xff14, 0xbf);
        this.bus.write8(0xff16, 0x3f);
        this.bus.write8(0xff17, 0x00);
        this.bus.write8(0xff19, 0xbf);
        this.bus.write8(0xff1a, 0x7f);
        this.bus.write8(0xff1b, 0xff);
        this.bus.write8(0xff1c, 0x9f);
        this.bus.write8(0xff1e, 0xbf);
        this.bus.write8(0xff20, 0xff);
        this.bus.write8(0xff21, 0x00);
        this.bus.write8(0xff22, 0x00);
        this.bus.write8(0xff23, 0xbf);
        this.bus.write8(0xff24, 0x77);
        this.bus.write8(0xff25, 0xf3);
        this.bus.write8(0xff26, 0xf1);
        this.bus.write8(0xff40, 0x91);
        this.bus.write8(0xff42, 0x00);
        this.bus.write8(0xff43, 0x00);
        this.bus.write8(0xff45, 0x00);
        this.bus.write8(0xff47, 0xfc);
        this.bus.write8(0xff48, 0xff);
        this.bus.write8(0xff49, 0xff);
        this.bus.write8(0xff4a, 0x00);
        this.bus.write8(0xff4b, 0x00);
        this.bus.write8(0xffff, 0x00);
    }
}

function toHex(value: number, pad: number = 2) {
    return value.toString(16).padStart(pad, '0').toUpperCase();
}
