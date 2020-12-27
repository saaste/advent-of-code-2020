import { log } from "../helpers/logging";
import { Piece } from "./Piece";

export class Jigsaw {
    pieces: Piece[];
    solution: Piece[][];
    sideLength: number;
    logging: boolean;

    constructor(pieces: Piece[], logging: boolean) {
        this.pieces = pieces;
        this.solution = [];
        this.sideLength = Math.sqrt(this.pieces.length);
        this.logging = logging;

        for (let y = 0; y < this.sideLength; y++) {
            this.solution[y] = [];
        }

    }

    public isValid = (): boolean => {
        for (let y = 0; y < this.solution.length; y++) {
            for (let x = 0; x < this.solution[y].length; x++) {
                const piece = this.solution[y][x] || null;
                if (!piece) {
                    return true;
                }
                const right = this.solution[y][x + 1] || null;
                const bottom = this.solution[y + 1]?.[x] || null;
                const left = this.solution[y][x - 1] || null;
                const top = this.solution[y - 1]?.[x] || null;
                if (right) {
                    if (piece.getRight() !== right.getLeft()) {
                        return false;
                    }
                }

                if (bottom) {
                    if (piece.getBottom() !== bottom.getTop()) {
                        return false;
                    }
                }

                if (left) {
                    if (piece.getLeft() !== left.getRight()) {
                        return false;
                    }
                }

                if (top) {
                    if (piece.getTop() !== top.getBottom()) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public solve = (y: number, x: number, level: number = 1, step: number = 1): boolean => {
        if (this.pieces.length === 0) {
            return true;
        }

        for (let i = 0; i < this.pieces.length; i++) {
            const currentPiece = this.pieces.splice(i, 1)[0];
            this.solution[y][x] = currentPiece;

            for (let rot = 0; rot < 8; rot++) {
                log(this.logging, `Level ${level}: Trying piece ${currentPiece.id} to X=${x}, Y=${y} on state ${currentPiece.getState()}. Available pieces: ${this.pieces.length}`)
                const isValid = this.isValid()
                if (isValid) {
                    const [newX, newY] = this.getNextPosition(x, y);
                    if (this.solve(newY, newX, level + 1)) {
                        return true;
                    }
                } else {
                    log(this.logging, `Level ${level}: Piece ${currentPiece.id} does NOT fit to X=${x}, Y=${y} on state ${currentPiece.getState()}`);
                }
                log(this.logging, `Level ${level}: Rotating ${currentPiece.id} to X=${x}, Y=${y}`);
                currentPiece.goToNextState();
                step++;
            }

            log(this.logging, `Level ${level}: Piece ${currentPiece.id} does NOT fit to X=${x}, Y=${y}`);
            delete this.solution[y][x]
            this.pieces.splice(i, 0, currentPiece);

        }
        return false;
    }

    private getNextPosition = (x: number, y: number): [number, number] => {
        let newX: number = x + 1;
        let newY: number = y;
        if (newX > this.sideLength - 1) {
            newX = 0;
            newY++;
        }

        return [newX, newY]
    }

    private printSolution = (): void => {
        console.log()
        for (let y = 0; y < this.sideLength; y++) {
            for (let x = 0; x < this.sideLength; x++) {
                console.log(this.solution[y][x].draw())
            }
        }
        console.log('-----------------------------------')
    }

    public getSolution = (): Piece[][] => {
        return this.solution;
    }
}
