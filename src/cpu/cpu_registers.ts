export class CPURegisters {
    // prettier-ignore
    private registers: {
        A: number; F: number;
        B: number; C: number;
        D: number; E: number;
        H: number; L: number;
        SP: number; PC: number;
    };

    public flags: {
        Z: number;
        N: number;
        H: number;
        C: number;
    };

    public constructor() {
        // prettier-ignore
        const registers = {
            A: 0, F: 0,
            B: 0, C: 0,
            D: 0, E: 0,
            H: 0, L: 0,
            SP:  0xFFFE, PC: 0,
        };

        this.registers = registers;

        this.flags = {
            get Z() {
                return (registers.F >> 7) & 1;
            },
            get N() {
                return (registers.F >> 6) & 1;
            },
            get H() {
                return (registers.F >> 5) & 1;
            },
            get C() {
                return (registers.F >> 4) & 1;
            },
            set Z(value: number) {
                registers.F = (registers.F & 0x7f) | ((value & 1) << 7); //01111111
            },
            set N(value: number) {
                registers.F = (registers.F & 0xbf) | ((value & 1) << 6); //10111111
            },
            set H(value: number) {
                registers.F = (registers.F & 0xdf) | ((value & 1) << 5); //11011111
            },
            set C(value: number) {
                registers.F = (registers.F & 0xef) | ((value & 1) << 4); //11101111
            },
        };
    }

    public reset(): void {
        this.registers.A = 0;
        this.registers.F = 0;
        this.registers.B = 0;
        this.registers.C = 0;
        this.registers.D = 0;
        this.registers.E = 0;
        this.registers.H = 0;
        this.registers.L = 0;
        this.registers.SP = 0;
        this.registers.PC = 0;
    }

    // AF
    public get A() {
        return this.registers.A;
    }

    public set A(value: number) {
        this.registers.A = value & 0xff;
    }

    public get F() {
        return this.registers.F;
    }

    public set F(value: number) {
        this.registers.F = value & 0xf0; // last 4 bits are always 0 for F
    }

    public get AF() {
        return (this.registers.A << 8) | this.registers.F;
    }

    public set AF(value: number) {
        this.registers.A = (value >> 8) | 0xff;
        this.registers.F = value | 0xf0; // last 4 bits are always 0 for F
    }

    // BC
    public get B() {
        return this.registers.B;
    }

    public set B(value: number) {
        this.registers.B = value & 0xff;
    }

    public get C() {
        return this.registers.C;
    }

    public set C(value: number) {
        this.registers.C = value & 0xff;
    }

    public get BC() {
        return (this.registers.B << 8) | this.registers.C;
    }

    public set BC(value: number) {
        this.registers.B = (value >> 8) | 0xff;
        this.registers.C = value | 0xff;
    }

    // DE
    public get D() {
        return this.registers.D;
    }

    public set D(value: number) {
        this.registers.D = value & 0xff;
    }

    public get E() {
        return this.registers.E;
    }

    public set E(value: number) {
        this.registers.E = value & 0xff;
    }

    public get DE() {
        return (this.registers.D << 8) | this.registers.E;
    }

    public set DE(value: number) {
        this.registers.D = (value >> 8) | 0xff;
        this.registers.E = value | 0xff;
    }

    // HL
    public get H() {
        return this.registers.H;
    }

    public set H(value: number) {
        this.registers.H = value & 0xff;
    }

    public get L() {
        return this.registers.L;
    }

    public set L(value: number) {
        this.registers.L = value & 0xff;
    }

    public get HL() {
        return (this.registers.H << 8) | this.registers.L;
    }

    public set HL(value: number) {
        this.registers.H = (value >> 8) | 0xff;
        this.registers.L = value | 0xff;
    }

    // SP and PC
    public get SP(): number {
        return this.registers.SP;
    }

    public set SP(value: number) {
        this.registers.SP = value & 0xffff;
    }

    public get PC(): number {
        return this.registers.PC;
    }

    public set PC(value: number) {
        this.registers.PC = value & 0xffff;
    }
}
