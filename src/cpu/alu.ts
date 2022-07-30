export const ALU = {
    swap(a: number) {
        const res = ((a & 0xf) << 4) | (a >> 4);
        return {value: res, Z: res === 0 ? 1 : 0, N: 0, H: 0, C: 0};
    },

    xor(a: number, n: number) {
        const res = a ^ n;
        return {value: res, Z: res === 0 ? 1 : 0, N: 0, H: 0, C: 0};
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
};
