import {Bus} from '../memory/bus';

export class DBG {
    private msg = '';
    private bus: Bus;
    constructor(bus: Bus) {
        this.bus = bus;
    }

    update() {
        if (this.bus.read8(0xff02) !== 0) {
            console.log(this.bus.read8(0xff02));
        }

        if (this.bus.read8(0xff02) === 0x81) {
            console.log('Is able to read');
            const data = this.bus.read8(0xff01);

            this.msg += String.fromCharCode(data);
            this.bus.write8(0xff02, 0x0);
        }
    }

    print() {
        console.log('DBG: %s', this.msg);
    }
}
