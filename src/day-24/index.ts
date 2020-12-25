import { readInput } from '../helpers/input';
import { Tile } from './Tile';

const inputFile = `${__dirname}/input.txt`;

export const day24_step_1 = () => {
    const input = readInput(inputFile)
    const tiles: Tile[] = [];
    const grid: Tile[] = [new Tile("")];

    for (let i = 0; i < input.length; i++) {
        tiles.push(new Tile(input[i]));
    }

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].runMoves();
        const matchingTile = grid.find((tile) => tile.x === tiles[i].x && tile.z === tiles[i].z)
        if (matchingTile) {
            matchingTile.switchColor();
        } else {
            grid.push(tiles[i]);
            tiles[i].switchColor();
        }
    }

    const blackTiles = grid.filter((tile) => tile.isBlack);
    console.log('Step 1');
    console.log('------');
    console.log(`Black tiles: ${blackTiles.length}`) // 322 is correct
    return grid;
}

export const day24_step_2 = () => {
    console.log('Step 2');
    console.log('------');
}