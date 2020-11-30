import fs from 'fs';

export const readInput = (inputFile: string): string[] => {
    return fs.readFileSync(inputFile, 'utf8').split('\n');
};

export const readInputAsNumbers = (inputFile: string): number[] => {
    return readInput(inputFile).map(v => parseInt(v, 10))
}