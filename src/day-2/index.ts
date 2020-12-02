import { readInput } from '../helpers';

const inputFile = `${__dirname}/input.txt`;
const regexp = /([0-9]*)-([0-9]*) ([a-z]*): ([a-z]*)/i
const passwords = readInput(inputFile);

const isValidPasswordStep1 = (match: RegExpMatchArray): boolean => {
    const min = parseInt(match[1]);
    const max = parseInt(match[2]);
    const letter = match[3];
    const password = match[4];
    const letterRegExp = new RegExp(letter, 'g');
    const count = (password.match(letterRegExp) || []).length
    return count >= min && count <= max
}

const isValidPasswordStep2 = (match: RegExpMatchArray): boolean => {
    const index1 = parseInt(match[1]);
    const index2 = parseInt(match[2]);
    const letter = match[3];
    const password = match[4];
    const foundIndex1 = password[index1 - 1] === letter;
    const foundIndex2 = password[index2 - 1] === letter;

    return foundIndex1 !== foundIndex2
}

export const day2_step_1 = () => {
    const validPasswords = passwords.filter((password) => {
        const match = password.match(regexp);
        if (match) {
            return isValidPasswordStep1(match);
        }
        console.log('Unable to parse input');
        return false;
    })
    
    console.log('Step 1');
    console.log('------');
    console.log(`Valid passwords: ${validPasswords.length}`)
}

export const day2_step_2 = () => {
    const validPasswords = passwords.filter((password) => {
        const match = password.match(regexp);
        if (match) {
            return isValidPasswordStep2(match);
        }
        console.log('Unable to parse input');
        return false;
    })
    
    console.log('Step 2');
    console.log('------');
    console.log(`Valid passwords: ${validPasswords.length}`)
}