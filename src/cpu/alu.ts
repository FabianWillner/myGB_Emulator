export const ALU = {
    swap(a: number) {
        const res = ((a & 0xf) << 4) | (a >> 4);
        return {value: res, Z: res === 0 ? 1 : 0, N: 0, H: 0, C: 0};
    },

    xor(a: number, n: number) {
        const res = a ^ n;
        return {value: res, Z: res === 0 ? 1 : 0, N: 0, H: 0, C: 0};
    },

    rl(a: number, c: number) {
        const res = ((a << 1) | (c & 1)) & 0xff;
        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: a >> 7,
        };
    },

    rr(a: number, c: number) {
        const res = ((a >> 1) | ((c & 1) << 7)) & 0xff;
        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: a & 1,
        };
    },

    sla(a: number) {
        const res = (a << 1) & 0xff;
        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: a >> 7,
        };
    },

    rrc(a: number) {
        const carry = a & 1;
        const res = (a >> 1) | (carry << 7);
        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: carry,
        };
    },

    inc(a: number) {
        const res = (a + 1) & 0xff;
        const halfCarry = ((a & 0xf) + 1) >> 4;
        return {value: res, Z: res === 0 ? 1 : 0, N: 0, H: halfCarry};
    },

    inc16(a: number) {
        return {value: (a + 1) & 0xffff};
    },

    dec(a: number) {
        const res = (a - 1) & 0xff;
        const halfCarry = (((a & 0xf) - 1) >> 4) & 1;
        return {value: res, Z: res === 0 ? 1 : 0, N: 1, H: halfCarry};
    },

    dec16(value: number) {
        return {
            value: (value - 1) & 0xffff,
        };
    },

    or(a: number, n: number) {
        const res = a | n;

        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: 0,
        };
    },

    srl(a: number) {
        const res = (a >> 1) & 0xff;
        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: a & 1,
        };
    },

    bit(bit: number, a: number) {
        return {
            Z: (~a >> bit) & 1,
            N: 0,
            H: 1,
        };
    },

    sra(a: number) {
        const res = ((a >> 1) | (a & 0x80)) & 0xff;
        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: a & 1,
        };
    },

    rlc(a: number) {
        const carry = a >> 7;
        const res = ((a << 1) | carry) & 0xff;
        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 0,
            C: carry,
        };
    },

    sub(a: number, n: number) {
        const sub = a - n;
        const halfCarry = (((a & 0xf) - (n & 0xf)) >> 4) & 1;

        return {
            value: sub & 0xff,
            Z: sub === 0 ? 1 : 0,
            N: 1,
            H: halfCarry,
            C: (sub >> 8) & 1,
        };
    },
    add(a: number, b: number) {
        const newValue = a + b;
        const maskedValue = newValue & 0xff;
        const halfCarry = ((a & 0xf) + (b & 0xf)) >> 4;

        return {
            value: maskedValue,
            Z: maskedValue === 0 ? 1 : 0,
            N: 0,
            H: halfCarry,
            C: newValue !== maskedValue ? 1 : 0,
        };
    },

    add16(a: number, b: number) {
        const sum = a + b;
        const halfCarry = ((a & 0xfff) + (b & 0xfff)) >> 12;

        return {
            value: sum & 0xffff,
            N: 0,
            H: halfCarry,
            C: (sum >> 16) & 1,
        };
    },

    sbc(a: number, b: number, carry: number) {
        const sub = a - b - carry;
        const maskedSub = sub & 0xff;
        const halfCarry = (((a & 0xf) - (b & 0xf) - carry) >> 4) & 1;

        return {
            value: maskedSub,
            Z: maskedSub === 0 ? 1 : 0,
            N: 1,
            H: halfCarry,
            C: (sub >> 8) & 1,
        };
    },

    adc(a: number, b: number, carry: number) {
        const sum = a + b + carry;
        const maskedValue = sum & 0xff;
        const halfCarry = ((a & 0xf) + (b & 0xf) + carry) >> 4;

        return {
            value: maskedValue,
            Z: maskedValue === 0 ? 1 : 0,
            N: 0,
            H: halfCarry,
            C: sum !== maskedValue ? 1 : 0,
        };
    },

    and(a: number, n: number) {
        const res = a & n;

        return {
            value: res,
            Z: res === 0 ? 1 : 0,
            N: 0,
            H: 1,
            C: 0,
        };
    },

    daa(a: number, n: number, h: number, c: number) {
        let res = a;
        let correction = 0;

        if (h === 1) {
            correction |= 0x06;
        }

        if (c === 1) {
            correction |= 0x60;
        }

        if (n === 0) {
            if ((res & 0x0f) > 0x09) {
                correction |= 0x06;
            }

            if (res > 0x99) {
                correction |= 0x60;
            }

            res = res + correction;
        } else {
            res = res - correction;
        }

        return {
            value: res & 0xff,
            Z: (res & 0xff) === 0 ? 1 : 0,
            H: 0,
            C: (correction & 0x60) !== 0 ? 1 : 0,
        };
    },

    res(bit: number, a: number) {
        return {
            value: a & ~(1 << bit),
        };
    },

    set(bit: number, a: number) {
        return {
            value: a | (1 << bit),
        };
    },
};
