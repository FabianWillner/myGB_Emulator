enum RegisterType {
    NO_REG,
    A,
    AF,
    B,
    C,
    BC,
    D,
    E,
    DE,
    H,
    L,
    HL,
    SP,
    PC,
    d8,
}

enum AddressMode {
    Implied,
    Register_D16,
    AddressRegister_Register,
    Register,
    Register_D8,
    Register_Register,
    D8_Register,
}

export class Instruction {
    public opcode: number;
    public bytes: number;
    public cycles: number;
    public register1: RegisterType;
    public register2: RegisterType;
    public addressMode: AddressMode;

    constructor(
        opcode: number,
        bytes: number,
        cycles: number,
        register1: RegisterType = RegisterType.NO_REG,
        register2: RegisterType = RegisterType.NO_REG,
        addressMode: AddressMode = AddressMode.Implied
    ) {
        this.opcode = opcode;
        this.bytes = bytes;
        this.cycles = cycles;
        this.register1 = register1;
        this.register2 = register2;
        this.addressMode = addressMode;
    }
}
