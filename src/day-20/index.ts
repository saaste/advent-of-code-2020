import { readInputAsString } from '../helpers/input';
import { Jigsaw } from './Jigsaw';
import { Piece } from './Piece';

const inputFile = `${__dirname}/input.txt`;

export const day20_step_1 = () => {
    const input = readInputAsString(inputFile).replace(/\r\n/g, '\n').split('\n\n')
    const pieces: Piece[] = input.map((s) => Piece.parse(s));
    const piecesCopy = [...pieces];

    const jigsaw = new Jigsaw(pieces, false);
    const result = jigsaw.solve(0, 0);
    const solution = jigsaw.getSolution();

    const maxIndex = Math.sqrt(piecesCopy.length) - 1;

    const topLeft: number = solution[0][0].id;
    const topRight: number = solution[0][maxIndex].id;
    const bottomLeft: number = solution[maxIndex][0].id;
    const bottomRight: number = solution[maxIndex][maxIndex].id;

    console.log('Step 1');
    console.log('------')
    console.log('Result: ' + topLeft * topRight * bottomLeft * bottomRight) // 104831106565027 is correct
}

export const day20_step_2 = () => {
    // This solution does not try different rotations/flips. I already tested it and copy-pasted the correct rotation to
    // puzzle_result.txt file
    const puzzleResultFile = `${__dirname}/puzzle_result.txt`;
    const input = readInputAsString(puzzleResultFile);
    const totalHashCount = (input.match(/\#/g) || []).length;

    let puzzleResult = input.split("\n");

    const puzzleResult2D: string[][] = [];
    for (let row = 0; row < puzzleResult.length; row++) {
        puzzleResult2D[row] = [];
        for (let i = 0; i < puzzleResult[row].length; i++) {
            puzzleResult2D[row][i] = puzzleResult[row][i]
        }
    }

    const seaMonsterMiddleRegEx = /\#.{4}\#\#.{4}\#\#.{4}\#\#\#/
    const seaMonsterBottomRegEx = /.{1}\#.{2}\#.{2}\#.{2}\#.{2}\#.{2}\#.{3}/

    let dragonHashPieces = 0;
    let monsterCounter = 0;

    for (let row = 0; row < puzzleResult.length - 2; row++) {
        for (let idx = 18; idx < puzzleResult[row].length - 1; idx++) {
            if (puzzleResult[row][idx] === "#") { // This is head
                // check body
                const body = puzzleResult[row + 1].substr(idx - 18, 20);
                if (!seaMonsterMiddleRegEx.test(body)) {
                    continue;
                }

                // Check bottom
                const bottom = puzzleResult[row + 2].substr(idx - 18, 20);
                if (!seaMonsterBottomRegEx.test(bottom)) {
                    continue;
                }

                monsterCounter++;
                dragonHashPieces += 15;
            }
        }
    }

    console.log('Step 2');
    console.log('------')
    console.log(`Number of parts: ${totalHashCount - dragonHashPieces}`) // 2093 is correct
}

const replaceAt = (str: string, i: number, replacement: string): string => {
    return str.substr(0, i) + replacement + str.substr(i + replacement.length)
}
