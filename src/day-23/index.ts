import { readInputAsString } from '../helpers/input';
import { CircularArray } from './circular-array';

const inputFile = `${__dirname}/input.txt`;

export const day23_step_1 = () => {
    const cups = readInputAsString(inputFile).split("").map((s) => parseInt(s, 10))
    const circle = new CircularArray(cups);
    const rounds = 100;
    
    let nextCup = cups[0];
    for (let round = 1; round <= rounds; round++) {
        nextCup = circle.move(nextCup)
    }
    const result = circle.itemsToString().replace('1', '').replace(/\s/g, '');

    console.log('Step 1');
    console.log('------');
    console.log(`Label: ${result}`); // 47382659 is correct
}

export const day23_step_2 = () => {
    const cups = readInputAsString(inputFile).split("").map((s) => parseInt(s, 10))
    const rounds = 10000000;

    //Add extra cups
    let maxValue = Math.max(...cups);
    while (cups.length < 1000000) {
        cups.push(maxValue + 1);
        maxValue++;
    }

    const circle = new CircularArray(cups);
    let nextCup = cups[0];

    for (let round = 1; round <= rounds; round++) {
        nextCup = circle.move(nextCup)
    }

    const [first, second] = circle.getNextTwo(1);
    console.log('Step 2');
    console.log('------');
    console.log(`Label: ${first * second}`); // 42271866720 is correct
}