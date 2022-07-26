export const ALU = {
    xor(a: number, n: number) {
        const res = a ^ n;
        return {value: res, Z: res === 0 ? 1 : 0, N: 0, H: 0, C: 0};
    },

    inc(a: number) {
        const res = (a + 1) & 0xff;
        const halfCarry = ((a & 0xf) + 1) >> 4;
        return {value: res, Z: res === 0 ? 1 : 0, N: 0, H: halfCarry};
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
};
