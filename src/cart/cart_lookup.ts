interface LicenseCodes {
    [key: string]: string;
}

export const LICENSEE_CODE: LicenseCodes = {
    '00': 'None',
    '01': 'Nintendo R&D1',
    '08': 'Capcom',
    '13': 'Electronic Arts',
    '18': 'Hudson Soft',
    '19': 'b-ai',
    '20': 'kss',
    '22': 'pow',
    '24': 'PCM Complete',
    '25': 'san-x',
    '28': 'Kemco Japan',
    '29': 'seta',
    '30': 'Viacom',
    '31': 'Nintendo',
    '32': 'Bandai',
    '33': 'Ocean/Acclaim',
    '34': 'Konami',
    '35': 'Hector',
    '37': 'Taito',
    '38': 'Hudson',
    '39': 'Banpresto',
    '41': 'Ubi Soft',
    '42': 'Atlus',
    '44': 'Malibu',
    '46': 'angel',
    '47': 'Bullet-Proof',
    '49': 'irem',
    '50': 'Absolute',
    '51': 'Acclaim',
    '52': 'Activision',
    '53': 'American sammy',
    '54': 'Konami',
    '55': 'Hi tech entertainment',
    '56': 'LJN',
    '57': 'Matchbox',
    '58': 'Mattel',
    '59': 'Milton Bradley',
    '60': 'Titus',
    '61': 'Virgin',
    '64': 'LucasArts',
    '67': 'Ocean',
    '69': 'Electronic Arts',
    '70': 'Infogrames',
    '71': 'Interplay',
    '72': 'Broderbund',
    '73': 'sculptured',
    '75': 'sci',
    '78': 'THQ',
    '79': 'Accolade',
    '80': 'misawa',
    '83': 'lozc',
    '86': 'Tokuma Shoten Intermedia',
    '87': 'Tsukuda Original',
    '91': 'Chunsoft',
    '92': 'Video system',
    '93': 'Ocean/Acclaim',
    '95': 'Varie',
    '96': 'Yonezawa/s’pal',
    '97': 'Kaneko',
    '99': 'Pack in soft',
    A4: 'Konami (Yu-Gi-Oh!)',
};

interface CartridgeType {
    [key: string]: string;
}

export const CARTRIDGE_TYPE: CartridgeType = {
    '0': 'ROM ONLY',
    '1': 'MBC1',
    '2': 'MBC1+RAM',
    '3': 'MBC1+RAM+BATTERY',
    '5': 'MBC2',
    '6': 'MBC2+BATTERY',
    '8': 'ROM+RAM 1',
    '9': 'ROM+RAM+BATTERY 1',
    b: 'MMM01',
    c: 'MMM01+RAM',
    d: 'MMM01+RAM+BATTERY',
    f: 'MBC3+TIMER+BATTERY',
    '10': 'MBC3+TIMER+RAM+BATTERY 2',
    '11': 'MBC3',
    '12': 'MBC3+RAM 2',
    '13': 'MBC3+RAM+BATTERY 2',
    '19': 'MBC5',
    '1a': 'MBC5+RAM',
    '1b': 'MBC5+RAM+BATTERY',
    '1c': 'MBC5+RUMBLE',
    '1d': 'MBC5+RUMBLE+RAM',
    '1e': 'MBC5+RUMBLE+RAM+BATTERY',
    '20': 'MBC6',
    '22': 'MBC7+SENSOR+RUMBLE+RAM+BATTERY',
    fc: 'POCKET CAMERA',
    fd: 'BANDAI TAMA5',
    fe: 'HuC3',
    ff: 'HuC1+RAM+BATTERY',
};

type ROM_SIZE_numBanks = {
    ROM_SIZE: string;
    NUM_BANKS: string;
};

interface ROM_SIZE {
    [key: string]: ROM_SIZE_numBanks;
}

export const ROM_SIZE: ROM_SIZE = {
    '0': {ROM_SIZE: '32 KiB', NUM_BANKS: '2 (no banking)'},
    '1': {ROM_SIZE: '64 KiB', NUM_BANKS: '4'},
    '2': {ROM_SIZE: '128 KiB', NUM_BANKS: '8'},
    '3': {ROM_SIZE: '256 KiB', NUM_BANKS: '16'},
    '4': {ROM_SIZE: '512 KiB', NUM_BANKS: '32'},
    '5': {ROM_SIZE: '1 MiB', NUM_BANKS: '64'},
    '6': {ROM_SIZE: '2 MiB', NUM_BANKS: '128'},
    '7': {ROM_SIZE: '4 MiB', NUM_BANKS: '256'},
    '8': {ROM_SIZE: '8 MiB', NUM_BANKS: '512'},
};

interface RAM_SIZE {
    [key: string]: string;
}

export const RAM_SIZE: RAM_SIZE = {
    '0': '0 KiB',
    '1': '-',
    '2': '8 KiB',
    '3': '32 KiB',
    '4': '128 KiB',
    '5': '64 KiB',
};

interface DESTINATION_CODE {
    [key: string]: string;
}

export const DESTINATION_CODE: DESTINATION_CODE = {
    '0': 'Japan (and possibly overseas)',
    '1': 'Overseas only',
};
