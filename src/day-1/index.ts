import { readInputAsNumbers } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

export const day1_step_1 = () => {
    const inputAsc = readInputAsNumbers(inputFile);
    inputAsc.sort((n1, n2) => n1 - n2);

    let entryA: number = -1
    let entryB: number = -1
    let tests: number = 0;

    for (let a = 0; a < inputAsc.length; a++) {
        for (let b = a+1; b < inputAsc.length; b++) {
            let sum = inputAsc[a] + inputAsc[b];
            tests++;
            if (sum === 2020) {
                entryA = inputAsc[a];
                entryB = inputAsc[b];
            } else if (sum > 2020) {
                break;
            }
        }

        if (entryA > -1 && entryB > -1) {
            break;
        }
    }

    console.log('Step 1')
    console.log('------')
    console.log(`Tests: ${tests}`)

    if (entryA === -1 || entryB === -1) {
        console.log('Unable to find matching entries');
        return;
    }

    console.log(`${entryA} * ${entryB} = ${entryA * entryB}`)
}

export const day1_step_2 = () => {
    const inputAsc = readInputAsNumbers(inputFile);
    inputAsc.sort((n1, n2) => n1 - n2);

    let entryA: number = -1
    let entryB: number = -1
    let entryC: number = -1
    let tests: number = 0;

    for (let a = 0; a < inputAsc.length; a++) {
        for (let b = a+1; b < inputAsc.length; b++) {
            for (let c = b+1; c < inputAsc.length; c++) {
                let sum = inputAsc[a] + inputAsc[b] + inputAsc[c];
                tests++;
                if (sum === 2020) {
                    entryA = inputAsc[a];
                    entryB = inputAsc[b];
                    entryC = inputAsc[c];
                } else if (sum > 2020) {
                    break;
                }
            }
        }

        if (entryA > -1 && entryB > -1) {
            break;
        }
    }

    console.log('Step 2')
    console.log('------')
    console.log(`Tests: ${tests}`)

    if (entryA === -1 || entryB === -1 || entryC === -1) {
        console.log('Unable to find matching entries');
        return;
    }

    console.log(`${entryA} * ${entryB} * ${entryC} = ${entryA * entryB * entryC}`)
}