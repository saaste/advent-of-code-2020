import { readInput } from '../helpers/input';
import { Tile } from './Tile';

const inputFile = `${__dirname}/input.txt`;

const createGrid = (): Tile[] => {
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
    return grid;
}

export const day24_step_1 = () => {
    const grid = createGrid();
    const blackTiles = grid.filter((tile) => tile.isBlack);
    console.log('Step 1');
    console.log('------');
    console.log(`Black tiles: ${blackTiles.length}`) // 322 is correct
    return grid;
}

export const day24_step_2 = () => {
    let grid: Tile[] = createGrid();
    const grid2D: Tile[][] = [];
    const maxGridSize = 70; // This seems to be enough extra tiles
    const days = 100

    // Fill grid with whites
    for (let x = -maxGridSize; x <= maxGridSize; x++) {
        grid2D[x] = [];
        for (let z = -maxGridSize; z <= maxGridSize; z++) {
            const tile = new Tile("");
            tile.x = x;
            tile.z = z;
            grid2D[x][z] = tile;
        }
    }

    // Create 2D grid
    for (let i = 0; i < grid.length; i++) {
        const tile = grid[i];
        // if (!grid2D[tile.x]) {
        //     grid2D[tile.x] = [];
        // }
        grid2D[tile.x][tile.z] = tile;
    }

    // Replace grid list
    grid = [];
    for (let x = -maxGridSize; x <= maxGridSize; x++) {
        for (let z = -maxGridSize; z <= maxGridSize; z++) {
            grid.push(grid2D[x][z])
        }
    }

    // Check neighbors and prepare for change
    for (let day = 0; day < days; day++) {
        for (let i = 0; i < grid.length; i++) {
            const tile: Tile = grid[i];
            const e: boolean = grid2D[tile.x]?.[tile.z+1]?.isBlack || false
            const se: boolean = grid2D[tile.x-1]?.[tile.z+1]?.isBlack || false
            const sw: boolean = grid2D[tile.x-1]?.[tile.z]?.isBlack || false
            const w: boolean = grid2D[tile.x]?.[tile.z-1]?.isBlack || false
            const nw: boolean = grid2D[tile.x+1]?.[tile.z-1]?.isBlack || false
            const ne: boolean = grid2D[tile.x+1]?.[tile.z]?.isBlack || false
            const neighbors = [e, se, sw, w, nw, ne];
            const blackNeighbors = neighbors.filter(n => n).length
            if (tile.isBlack && (blackNeighbors === 0 || blackNeighbors > 2)) {
                tile.prepareForChange()
            } else if (!tile.isBlack && blackNeighbors === 2) {
                tile.prepareForChange()
            }
        }

        // Flip prepared
        for (let i = 0; i < grid.length; i++) {
            const tile: Tile = grid[i];
            tile.changeIfPrepared();
        }
    }

    const blackTiles = grid.filter((tile) => tile.isBlack);


    console.log('Step 2');
    console.log('------');
    console.log(`Black tiles: ${blackTiles.length}`) // 3831 is correct
}