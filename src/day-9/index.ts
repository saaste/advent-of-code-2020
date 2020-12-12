import { readInputAsNumbers } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;
const numbers = readInputAsNumbers(inputFile)

const sumExists = (slice: number[], usedNumbers: number[], target: number): [number, number] => {
    for (let i = 0; i < slice.length; i++) {
        const a = slice[i]
        for (let j = i + 1; j < slice.length; j++) {
            const b = slice[j];
            if (a + b === target) {
                return [a, b]
            }
        }
    }
    return [-1, -1]
}

export const day9_step_1 = () => {
    const usedNumbers: number[] = [];
    const preamble = 25;

    for (let i = preamble; i < numbers.length; i++) {
        const target = numbers[i];
        const checkSlice = numbers.slice(i - preamble, i)
        const [a, b] = sumExists(checkSlice, usedNumbers, target)
        
        if (a > -1 && b > -1) {
            usedNumbers.push(a);
            usedNumbers.push(b);
        } else {
            console.log('Step 1');
            console.log('------');
            console.log(`${target} is invalid`); // 1492208709 is correct
            return
        }
    }

}

export const day9_step_2 = () => {
    const invalidNumber = 1492208709;
    for (let i = 0; i < numbers.length; i++) {
        const range: number[] = [numbers[i]];
        for (let j = i + 1; j < numbers.length; j++) {
            range.push(numbers[j]);
            const sum = range.reduce((a, b) => a + b);
            if (sum > invalidNumber) {
                break;
            } else if (sum === invalidNumber) {
                const min = Math.min(...range);
                const max = Math.max(...range);
                console.log('Step 2');
                console.log('------');
                console.log(`Result is ${min} + ${max} = ${min + max}`) // 238243506 is correct
                return;
            }
        }
    }
}