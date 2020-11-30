import { readInputAsNumbers } from '../helpers';

const inputFile = `${__dirname}/input.txt`;

const calculateModuleFuel = (mass: number): number => {
    return Math.floor(mass/3)-2
}

const run = () => {
    const input = readInputAsNumbers(inputFile);
    const fuel = input.reduce((acc, value) => acc + calculateModuleFuel(value), 0)
    console.log(fuel)
}

export default run;