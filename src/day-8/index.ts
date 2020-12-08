import { readInput } from '../helpers';

const inputFile = `${__dirname}/input.txt`;

const parseInstructions = (input: string[]): [string, number][] => {
    const regExp = /(\w{3}) ([\+\-\d]*)/i
    return input.map((line) => {
        const match = line.match(regExp) || [];
        const op = match[1]
        const value = parseInt(match[2] , 10)
        return [op, value]
    })
    
}

const calculateOutput = (instructions: [string, number][]): [number, boolean] => {
    let acc = 0;
    let index = 0;
    const usedInstructions: number[] = [];

    while(!usedInstructions.includes(index) && index < instructions.length) {
        const operator = instructions[index][0]
        const value = instructions[index][1]

        usedInstructions.push(index);

        switch (operator) {
            case 'nop':
                index++;
                break;
            case 'acc':
                acc += value;
                index++;
                break;
            case 'jmp':
                index += value;
                break;
            default:
                console.error(`Invalid operator ${operator}`)
        }
    }

    return [acc, index < instructions.length]
}

const switchOperator = (instructions: [string, number][], index: number): [string, number][] => {
    if (index >= instructions.length) {
        throw Error(`Index ${index} is bigger than instruction length ${instructions.length}`)
    }

    const newInstructions: [string, number][] = []
    let operatorSwitched = false;

    for (let i = 0; i < instructions.length; i++) {
        if (operatorSwitched || i < index) {
            newInstructions.push(instructions[i])
            continue;
        }

        switch(instructions[i][0]) {
            case 'nop':
                newInstructions.push(['jmp', instructions[i][1]])
                operatorSwitched = true;
                break;
            case 'jmp':
                newInstructions.push(['nop', instructions[i][1]])
                operatorSwitched = true;
                break;
            default:
                newInstructions.push(instructions[i])
                break;
        }
    }
    return newInstructions
}

export const day8_step_1 = () => {
    const input = readInput(inputFile)
    const instructions = parseInstructions(input)
    const [acc, _] = calculateOutput(instructions)

    console.log('Step 1');
    console.log('------');
    console.log(`Accumulator is: ${acc}`); // 1814 is correct
}

export const day8_step_2 = () => {
    const input = readInput(inputFile)
    const instructions = parseInstructions(input)
    
    let index = 0;
    let fixedInstructions = switchOperator(instructions, index)
    let [acc, isInfinite] = calculateOutput(fixedInstructions)

    while (isInfinite) {
        index++;
        
        fixedInstructions = switchOperator(instructions, index)
        const [newAcc, newOutput] = calculateOutput(fixedInstructions)
        
        acc = newAcc;
        isInfinite = newOutput
    }

    console.log('Step 2');
    console.log('------');
    console.log(`Accumulator is: ${acc}`); // 1056 is correct
}