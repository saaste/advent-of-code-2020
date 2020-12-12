import { readInput } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;
const map = readInput(inputFile);

const countTrees = (right: number, down: number): number => {
    let trees = 0;
    let positionX = 0;

    for (let i = 0; i < map.length; i+=down) {

        while (map[i].length < positionX + right) {
            map[i] = map[i] + map[i];
        }

        if (map[i][positionX] === '#') {
            trees++;
        }
        
        positionX += right;
    }

    return trees;
}

export const day3_step_1 = (right: number = 3, down: number = 1, log: boolean = true) => {
    const trees = countTrees(3, 1);

    console.log('Step 1');
    console.log('------');
    console.log(`Trees: ${trees}`);
}

export const day3_step_2 = () => {
    const trees = [[1,1], [3,1], [5,1], [7,1], [1,2]].map((values) => {
        return countTrees(values[0], values[1]);
    })

    const result = trees.reduce((a, b) => a * b);

    console.log('Step 2');
    console.log('------');
    console.log(`Trees: ${trees}. Multiplied: ${result}`)
}