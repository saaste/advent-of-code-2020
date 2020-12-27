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

}
