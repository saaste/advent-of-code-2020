import { readInput } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

const decimalToBinary = (decimal: number): string => {
    return decimal.toString(2)
}

export const day14_step_1 = () => {
    const input = readInput(inputFile)
    const memRegEx = /mem\[(\d+)] = (\d+)/i
    const memory: number[] = [];

    let mask = '';
    for (let i = 0; i < input.length; i++) { 
        if (input[i].startsWith("mask")) {
            mask = input[i].split("=")[1].trim()
        } else {
            const matches = input[i].match(memRegEx)
            if (matches) {
                const address = parseInt(matches[1], 10)
                const value = parseInt(matches[2])
                let valueBin = decimalToBinary(value).padStart(36, '0');
                for (let j = 0; j < mask.length; j++) {
                    if (mask[j] !== 'X') {
                        const valueBinArray = valueBin.split('');
                        valueBinArray[j] = mask[j]
                        valueBin = valueBinArray.join('');
                    }
                }
                memory[address] = parseInt(valueBin, 2)
            } else {
                throw new Error("Invalid match")
            }   
        }
    }
    const result = memory.filter((n) => n !== null).reduce((a, b) => a + b)
    console.log('Step 1')
    console.log('------') 
    console.log(`Sum: ${result}`) // 5055782549997 is correct
}

export const day14_step_2 = () => {
    const input = readInput(inputFile)
    const memRegEx = /mem\[(\d+)] = (\d+)/i
    const memory: { [memory: string]: number } = {};

    const buildVariations = (mask: string): string[] => {
        let ends: string[] = []
        for (let i = mask.length - 1; i >= 0; i--) {
            const bit = mask.substr(i, 1);
            if (bit === 'X') {
                if (ends.length === 0) {
                    ends = ['0', '1']
                } else {
                    const newEnds: string[] = []
                    for (let replacement = 0; replacement <= 1; replacement++) {
                        for (let j = 0; j < ends.length; j++) {
                            newEnds.push(replacement + ends[j])
                        } 
                    };
                    ends = newEnds;
                }
                continue;
            }

            if (ends.length === 0) {
                ends.push(bit)
                continue;
            }

            for (let j = 0; j < ends.length; j++) {
                ends[j] = bit + ends[j]
            }
        
        }
        return ends;        
    }

    let mask = '';
    for (let i = 0; i < input.length; i++) { 
        if (input[i].startsWith("mask")) {
            mask = input[i].split("=")[1].trim()
        } else {
            const matches = input[i].match(memRegEx)
            if (matches) {
                const address = parseInt(matches[1], 10)
                const valueDec = parseInt(matches[2])
                let valueBin = decimalToBinary(address).padStart(36, '0');
                let addressMask = mask;
                for (let j = 0; j < mask.length; j++) {
                    if (valueBin[j] === '1' && mask[j] !== 'X') {
                        const addressMaskArray = addressMask.split('');
                        addressMaskArray[j] = '1';
                        addressMask = addressMaskArray.join('');
                    }
                }
                const addressVariations = buildVariations(addressMask)
                for (let j = 0; j < addressVariations.length; j++) {
                    const addressDec = parseInt(addressVariations[j], 2);
                    memory[addressDec] = valueDec
                }
            } else {
                throw new Error("Invalid match")
            }
        }
    }

    const result = Object.keys(memory).map((key) => memory[key]).reduce((a, b) => a + b)
    console.log('Step 2')
    console.log('------') 
    console.log(`Sum: ${result}`) // 4795970362286 is correct
}