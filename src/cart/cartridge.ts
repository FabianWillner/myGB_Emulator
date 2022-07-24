import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {
    CARTRIDGE_TYPE,
    LICENSEE_CODE,
    ROM_SIZE,
    RAM_SIZE,
    DESTINATION_CODE,
} from './cart_lookup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class Cartridge {
    public entryPoint: number[] = new Array<number>(4); // 4 bytes
    public logo: number[] = new Array<number>(48); // 48 bytes
    public title: number[] = new Array<number>(16); // Upper case ASCII 16 bytes
    public newLicenseeCode: number[] = new Array<number>(2); // 2 byte

    public SGB_FLAG: number; // 1 byte
    public cartridgeType: number; // 1 byte
    public ROM_Size: number; // 1 byte
    public RAM_Size: number; // 1 byte
    public destinationCode: number; // 1 byte
    public oldLicenseeCode: number; // 1 byte
    public versionNumber: number; // 1 byte
    public headerChecksum: number; // 1 byte
    public ROM_Checksum: number; // 2 byte
    public data: Buffer;

    constructor(path: string) {
        const data = this.loadCart(path);
        this.data = data;
        let i = 0x0100;
        for (let j = 0; j < 4; j++) {
            this.entryPoint[j] = data[i];
            i++;
        }

        for (let j = 0; j < 48; j++) {
            this.logo[j] = data[i];
            i++;
        }

        for (let j = 0; j < 16; j++) {
            this.title[j] = data[i];
            i++;
        }

        for (let j = 0; j < 2; j++) {
            this.newLicenseeCode[j] = data[i];
            i++;
        }

        this.SGB_FLAG = data[i];
        i++;
        this.cartridgeType = data[i];
        i++;
        this.ROM_Size = data[i];
        i++;
        this.RAM_Size = data[i];
        i++;
        this.destinationCode = data[i];
        i++;
        this.oldLicenseeCode = data[i];
        i++;
        this.versionNumber = data[i];
        i++;
        this.headerChecksum = data[i];
        i++;
        this.ROM_Checksum = data[i];
        i++;

        this.printInformation();
        this.checkChecksum(data);
    }

    private checkChecksum(data: Buffer) {
        let sum = 0;
        for (let i = 0x0134; i <= 0x014c; i++) {
            sum = sum - data[i] - 1;
        }

        sum = sum & 0xff;

        console.log(
            'Checksum should be: %d\t Checksum is: %d',
            this.headerChecksum,
            sum
        );
        if (this.headerChecksum !== sum) {
            throw new Error('Checksum doesnt match. Exiting');
        }
    }

    private printInformation() {
        const title = this.title.map(x => String.fromCharCode(x)).join('');
        console.log('Title: %s', title);

        const newLicenseCode = String.fromCharCode(
            this.newLicenseeCode[0],
            this.newLicenseeCode[1]
        );
        console.log(
            'License Code: %s\tPublisher %s',
            newLicenseCode,
            LICENSEE_CODE[newLicenseCode]
        );

        const cartridgeType = this.cartridgeType.toString(16);
        console.log(
            'Cartridge Code: %s\tCartridge Type: %s',
            cartridgeType,
            CARTRIDGE_TYPE[cartridgeType]
        );

        const ROMsizeCode = this.ROM_Size.toString(16);
        console.log(
            'ROM Size Code: %s\tROM Size: %s\tNumber of ROM Banks: %s',
            ROMsizeCode,
            ROM_SIZE[ROMsizeCode].ROM_SIZE,
            ROM_SIZE[ROMsizeCode].NUM_BANKS
        );

        const ram_size = this.RAM_Size.toString(16);
        console.log(
            'RAM_SIZE Code: %s\tSRAM_SIZE : %s',
            ram_size,
            RAM_SIZE[ram_size]
        );
        const destination = this.destinationCode.toString(16);
        console.log(
            'Destination Code: %s\tDestination : %s',
            destination,
            DESTINATION_CODE[destination]
        );
    }

    private loadCart(stringPath: string) {
        const fspath = path.join(__dirname, stringPath);
        return fs.readFileSync(fspath);
    }
}
