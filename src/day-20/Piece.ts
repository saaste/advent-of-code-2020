import { hflip, vflip, rotate90, rotate180, rotate270 } from '2d-array-rotation'

enum PieceState {
    ORIGINAL,
    CW90,
    CW180,
    CW270,
    HFLIP,
    VFLIP,
    CW90HFLIP,
    CW90VFLIP
}

export class Piece {
    id: number;
    originalShape: string[][];
    shape: string[][];
    currentState: PieceState;

    constructor(id: number, shape: string[][]) {
        this.id = id;
        this.shape = shape;
        this.originalShape = [...shape];
        this.currentState = PieceState.ORIGINAL
    }

    public static parse = (str: string): Piece => {
        const lines = str.split('\n');
        const id = parseInt(lines[0].replace('Tile ', '').replace(':', ''), 10);
        const shape: string[][] = [];
        for (let y = 1; y < lines.length; y++) {
            if (lines[y].length > 0) {
                const row = lines[y].split('');
                shape[y - 1] = row;
            }
        }
        return new Piece(id, shape);
    }

    public draw = (): string => {
        let drawing = "";
        for (let y = 0; y < this.shape.length; y++) {
            drawing += this.shape[y].join('') + '\n';
        }
        return drawing;
    }

    public getLeft = (): string => {
        return this.shape.map((row) => row[0]).join('');
    }

    public getRight = (): string => {
        return this.shape.map((row) => row[row.length - 1]).join('');
    }

    public getTop = (): string => {
        return this.shape[0].join('');
    }

    public getBottom = (): string => {
        return this.shape[this.shape.length - 1].join('');
    }

    public goToNextState = () => {
        switch (this.currentState) {
            case PieceState.ORIGINAL:
                this.shape = rotate90(this.originalShape);
                this.currentState = PieceState.CW90;
                break;
            case PieceState.CW90:
                this.shape = rotate180(this.originalShape);
                this.currentState = PieceState.CW180;
                break;
            case PieceState.CW180:
                this.shape = rotate270(this.originalShape);
                this.currentState = PieceState.CW270;
                break;
            case PieceState.CW270:
                this.shape = hflip(this.originalShape);
                this.currentState = PieceState.HFLIP;
                break;
            case PieceState.HFLIP:
                this.shape = vflip(this.originalShape);
                this.currentState = PieceState.VFLIP;
                break;
            case PieceState.VFLIP:
                this.shape = hflip(rotate90(this.originalShape));
                this.currentState = PieceState.CW90HFLIP;
                break;
            case PieceState.CW90HFLIP:
                this.shape = vflip(rotate90(this.originalShape));
                this.currentState = PieceState.CW90VFLIP;
                break;
            case PieceState.CW90VFLIP:
                this.shape = [...this.originalShape];
                this.currentState = PieceState.ORIGINAL;
                break;
        }
    }

    public getState = (): PieceState => {
        return this.currentState;
    }
}
