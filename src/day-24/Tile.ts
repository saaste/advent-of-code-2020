export interface HexVector {
    x: number;
    z: number;
}

export class Tile {
    x: number;
    z: number;
    isBlack: boolean;
    movements: HexVector[];
    id: string
    preparedForChange: boolean;

    constructor(id: string) {
        this.x = 0;
        this.z = 0;
        this.isBlack = false;
        this.id = id;
        this.movements = this.parseMoves();
        this.preparedForChange = false;
    }

    public switchColor = () => {
        this.isBlack = !this.isBlack
    }

    public runMoves() {
        for (let i = 0; i < this.movements.length; i++) {
            const move = this.movements[i];
            this.x += move.x;
            this.z += move.z
        }
    }

    public prepareForChange = () => {
        this.preparedForChange = true;
    }

    public changeIfPrepared = () => {
        if (this.preparedForChange) {
            this.isBlack = !this.isBlack;
        }
        this.preparedForChange = false;
    }

    private parseMoves = (): HexVector[] => {
        const moves: HexVector[] = [];
        let move = "";
        for (let i = 0; i < this.id.length; i++) {
            move += this.id[i];
            switch(move) {
                case 'e':
                    moves.push({ x: 0, z: 1})
                    move = "";
                    break;
                case 'se':
                    moves.push({ x: -1, z: 1})
                    move = "";
                    break;
                case 'sw':
                    moves.push({ x: -1, z: 0})
                    move = "";
                    break;
                case 'w':
                    moves.push({ x: 0, z: -1})
                    move = "";
                    break;
                case 'nw':
                    moves.push({ x: 1, z: -1})
                    move = "";
                    break;
                case 'ne':
                    moves.push({ x: 1, z: 0})
                    move = "";
                    break;
            }
        }
        return moves;
    }
}