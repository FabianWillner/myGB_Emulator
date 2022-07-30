import {Bus} from '../memory/bus';
import {CPU} from './cpu';

export enum InterruptType {
    None,
    VerticalBlank,
    LCD_STAT,
    Timer,
    Serial,
    Joypad,
}

export class InterruptHandler {
    private cpu: CPU;
    private bus: Bus;

    constructor(cpu: CPU) {
        this.bus = cpu.bus;
        this.cpu = cpu;
    }

    public getCurrentInterrupt(): InterruptType {
        //todo
        const interruptFlags = this.bus.read8(0xff0f);
        const interruptEnable = this.bus.read8(0xffff);
        if ((interruptFlags >> 0) & 1 && (interruptEnable >> 0) & 1) {
            // Vertical Blank
            return InterruptType.VerticalBlank;
        } else if ((interruptFlags >> 0) & 1 && (interruptEnable >> 0) & 1) {
            return InterruptType.LCD_STAT;
        } else if ((interruptFlags >> 1) & 1 && (interruptEnable >> 1) & 1) {
            return InterruptType.Timer;
        } else if ((interruptFlags >> 2) & 1 && (interruptEnable >> 2) & 1) {
            return InterruptType.Serial;
        } else if ((interruptFlags >> 3) & 1 && (interruptEnable >> 3) & 1) {
            return InterruptType.Joypad;
        }

        return InterruptType.None;
    }

    public exeInterrupt(interrupt: InterruptType) {
        //TODO
        if (this.cpu.masterInterrupt && interrupt !== InterruptType.None) {
            this.cpu.masterInterrupt = false;
            this.cpu.emuCycle(2);
            this.cpu.stack.push16(this.cpu.registers.PC);
            this.cpu.emuCycle(2);
            switch (interrupt) {
                case InterruptType.VerticalBlank:
                    this.cpu.registers.PC = 0x0040;
                    this.setInterruptFlags(interrupt, false);
                    this.cpu.emuCycle(1);
                    return;
                case InterruptType.LCD_STAT:
                    this.cpu.registers.PC = 0x0048;
                    this.setInterruptFlags(interrupt, false);
                    this.cpu.emuCycle(1);
                    return;
                case InterruptType.Timer:
                    this.cpu.registers.PC = 0x0050;
                    this.setInterruptFlags(interrupt, false);
                    this.cpu.emuCycle(1);
                    return;
                case InterruptType.Serial:
                    this.cpu.registers.PC = 0x0058;
                    this.setInterruptFlags(interrupt, false);
                    this.cpu.emuCycle(1);
                    return;
                case InterruptType.Joypad:
                    this.cpu.registers.PC = 0x0060;
                    this.setInterruptFlags(interrupt, false);
                    this.cpu.emuCycle(1);
                    return;
            }
        }
        return;
    }

    public setInterruptFlags(interrupt: InterruptType, value: boolean = true) {
        if (interrupt === InterruptType.None) {
            return;
        }
        const interruptFlags = this.bus.read8(0xff0f);
        switch (interrupt) {
            case InterruptType.VerticalBlank:
                if (value) {
                    this.bus.write8(0xffff, interruptFlags | 0x01);
                } else {
                    this.bus.write8(0xffff, interruptFlags & 0xfe);
                }
                return;
            case InterruptType.LCD_STAT:
                if (value) {
                    this.bus.write8(0xffff, interruptFlags | 0x02);
                } else {
                    this.bus.write8(0xffff, interruptFlags & 0xfd);
                }
                return;
            case InterruptType.Timer:
                if (value) {
                    this.bus.write8(0xffff, interruptFlags | 0x04);
                } else {
                    this.bus.write8(0xffff, interruptFlags & 0xfb);
                }
                return;
            case InterruptType.Serial:
                if (value) {
                    this.bus.write8(0xffff, interruptFlags | 0x08);
                } else {
                    this.bus.write8(0xffff, interruptFlags & 0xf7);
                }
                return;
            case InterruptType.Joypad:
                if (value) {
                    this.bus.write8(0xffff, interruptFlags | 0x10);
                } else {
                    this.bus.write8(0xffff, interruptFlags & 0xef);
                }
                return;
        }
    }

    public setInterruptEnable(interrupt: InterruptType, value: boolean) {
        if (interrupt === InterruptType.None) {
            return;
        }
        const interruptEnable = this.bus.read8(0xffff);
        switch (interrupt) {
            case InterruptType.VerticalBlank:
                if (value) {
                    this.bus.write8(0xffff, interruptEnable | 0x01);
                } else {
                    this.bus.write8(0xffff, interruptEnable & 0xfe);
                }
                return;
            case InterruptType.LCD_STAT:
                if (value) {
                    this.bus.write8(0xffff, interruptEnable | 0x02);
                } else {
                    this.bus.write8(0xffff, interruptEnable & 0xfd);
                }
                return;
            case InterruptType.Timer:
                if (value) {
                    this.bus.write8(0xffff, interruptEnable | 0x04);
                } else {
                    this.bus.write8(0xffff, interruptEnable & 0xfb);
                }
                return;
            case InterruptType.Serial:
                if (value) {
                    this.bus.write8(0xffff, interruptEnable | 0x08);
                } else {
                    this.bus.write8(0xffff, interruptEnable & 0xf7);
                }
                return;
            case InterruptType.Joypad:
                if (value) {
                    this.bus.write8(0xffff, interruptEnable | 0x10);
                } else {
                    this.bus.write8(0xffff, interruptEnable & 0xef);
                }
                return;
        }
    }
}
