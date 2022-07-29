import {Tile} from './tile.js';

//TODO Scrolling window of the 256x256 pixel background map
// TODO Window that is ontop of the screen at all times
// Background and Window share same tile data table
export class GPU {
    private screenWidth = 160;
    private screenHeight = 144;
    private scalefactor = 4;
    private tileSize = 8;
    public tiles = Array<Tile>;
    public ctx: CanvasRenderingContext2D;

    constructor() {
        const canvas: any = document.getElementById('screen');
        if (!canvas && !(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Canvas not found');
        }
        canvas.width = this.screenWidth * this.scalefactor;
        canvas.height = this.screenHeight * this.scalefactor;
        this.ctx = canvas.getContext('2d');
    }

    public clear() {
        this.ctx.clearRect(
            0,
            0,
            this.screenWidth * this.scalefactor,
            this.screenHeight * this.scalefactor
        );
    }

    public printallTile(tile: Array<Tile>) {
        for (let i = 0; i < this.screenWidth / this.tileSize; i++) {
            for (let j = 0; j < this.screenHeight / this.tileSize; j++) {
                this.printTile(
                    tile[i * 8 + j],
                    i * this.tileSize,
                    j * this.tileSize
                );
            }
        }
    }

    public printTile(tile: Tile, x: number, y: number) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.drawPixel(x + j, y + i, tile.pixels[i * 8 + j]);
            }
        }
    }

    public drawPixel(x: number, y: number, color: number) {
        this.ctx.fillStyle = this.getColor(color);
        this.ctx.fillRect(
            x * this.scalefactor,
            y * this.scalefactor,
            this.scalefactor,
            this.scalefactor
        );
    }

    public getColor(color: number) {
        switch (color) {
            case 0:
                return 'rgba(0, 0, 0, 0)';
            case 1:
                return 'rgba(0, 0, 0, 0.33)';
            case 2:
                return 'rgba(0, 0, 0, 0.66)';
            case 3:
                return 'rgba(0, 0, 0, 1)';
            default:
                return 'rgba(0, 0, 0, 0)';
        }
    }
}
