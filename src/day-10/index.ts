import { readInputAsNumbers } from '../helpers';
import Graph from './graph'

const inputFile = `${__dirname}/input.txt`;

export const day10_step_1 = (log: boolean = true) => {
    const adapters = readInputAsNumbers(inputFile).sort((a, b) => a  - b);
    const usedAdapters: number[] = [];
    const usedDiffs: number[] = [];
    let currentJoltage = 0;
    
    for (let i = 0; i < adapters.length; i++) {
        const currentRating = adapters[i];
        if (currentRating - currentJoltage <= 3) {
            usedAdapters.push(currentRating)
            usedDiffs.push(currentRating - currentJoltage)
            currentJoltage = currentRating
        }
    }

    usedAdapters.push(currentJoltage + 3)
    usedDiffs.push(3);

    const ones = usedDiffs.filter((diff) => diff === 1);
    const threes = usedDiffs.filter((diff) => diff === 3);
    const maxValue = Math.max(...usedAdapters)
    
    if (log) {
        console.log('Step 1');
        console.log('------');
        console.log(`Ones: ${ones.length}. Threes: ${threes.length}. Multiplied: ${ones.length * threes.length}. Max: ${maxValue}`);
    }

    return maxValue; // 1625 is correct
    
}

export const day10_step_2 = () => {
    const maxVal = day10_step_1(false);
    const adapters = [...readInputAsNumbers(inputFile), 0, maxVal].sort((a, b) => a - b);
    const graph = new Graph(adapters);
    const paths = graph.countPaths(0, maxVal);

    console.log('Step 2');
    console.log('------');
    console.log(`Possible combinations: ${paths[0]}. Iterations: ${paths[1]}`) // 3100448333024 is correct
    
}
