import { performance } from 'perf_hooks';
import { readInput, readInputAsString } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

export const day15_step_1 = () => {
    const numberPositions: { [number: number]: number[] } = {}
    const numbers = readInputAsString(inputFile).split(',').map((n) => parseInt(n, 10))

    let lastSpokenNumber: number = -1;
    for (let i = 0; i < 2020; i++) {
        if (i < numbers.length) {
            let number = numbers[i]
            numberPositions[number] = [i]
            lastSpokenNumber = number
        } else if (numberPositions[lastSpokenNumber].length === 1) {
            let number = 0;
            if (!numberPositions[number]) {
                numberPositions[number] = [i]
            } else {
                numberPositions[number].push(i);
            }
            lastSpokenNumber = number;
        } else {
            let number = numberPositions[lastSpokenNumber][1] - numberPositions[lastSpokenNumber][0]
            if (!numberPositions[number]) {
                numberPositions[number] = [i]
            } else {
                numberPositions[number].push(i)
            }
            lastSpokenNumber = number;
        }

        if (numberPositions[lastSpokenNumber].length > 2) {
            numberPositions[lastSpokenNumber].shift();
        }
    }

    console.log('Step 1')
    console.log('------')
    console.log(`Last spoken number: ${lastSpokenNumber}`) // 1325 is correct
}

export const day15_step_2 = () => {
    const numberPositions: number[][]= []
    const numbers = readInputAsString(inputFile).split(',').map((n) => parseInt(n, 10))

    let lastSpokenNumber: number = -1;

    // This gets the job done my it is slow as hell. Takes over 8 minutes to get the answer. Improve!
    for (let i = 0; i < 30000000; i++) {
        if (i < numbers.length) {
            let number = numbers[i]
            numberPositions[number] = [i]
            lastSpokenNumber = number
        } else if (numberPositions[lastSpokenNumber].length === 1) {
            let number = 0;
            if (!numberPositions[number]) {
                numberPositions[number] = [i]
            } else {
                numberPositions[number].push(i);
            }
            lastSpokenNumber = number;
        } else {
            let number = numberPositions[lastSpokenNumber][1] - numberPositions[lastSpokenNumber][0]
            if (!numberPositions[number]) {
                numberPositions[number] = [i]
            } else {
                numberPositions[number].push(i)
            }
            lastSpokenNumber = number;
        }

        if (numberPositions[lastSpokenNumber].length > 2) {
            numberPositions[lastSpokenNumber] = numberPositions[lastSpokenNumber].slice(1, numberPositions[lastSpokenNumber].length)
        }
    }

    console.log('Step 1')
    console.log('------')
    console.log(`Last spoken number: ${lastSpokenNumber}`) // 59006 is correct
}