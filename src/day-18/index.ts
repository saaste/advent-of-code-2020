import { match } from 'assert';
import { count } from 'console';
import { getConstantValue } from 'typescript';
import { readInput } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

const calculateFormulaLeftToRight = (formula: string): number => {
    let formulaParts: (string | number)[]= formula.split(' ').map((p) => p.match(/\d+/i) ? parseInt(p, 10) : p);
    while (formulaParts.includes("+") ||formulaParts.includes("*")) {
        const a = formulaParts[0] as number;
        const b = formulaParts[2] as number;
        const rest = formulaParts.slice(3, formulaParts.length)
        if (formulaParts[1] === "+") {
            const sum = (a + b) as (string | number)
            rest.unshift(sum);
        } else {
            const prod = (a * b) as (string | number)
            rest.unshift(prod);
        }
        formulaParts = rest;
    }
    return formulaParts[0] as number;
}

const calculateFormulaAdditionFirst = (formula: string): number => {
    while (formula.includes("+")) {
        const regex = /(\d+ \+ \d+)/i
        const matches = formula.match(regex)
        if (matches) {
            const parts = matches[0].split(" ");
            const a = parseInt(parts[0], 10)
            const b = parseInt(parts[2], 10)
            const sum = a + b;
            formula = formula.replace(matches[0], "")
            formula = formula.substr(0, matches.index || 0) + sum.toString() + formula.substr(matches.index || 0, formula.length)
        }
    }

    let formulaParts: (string | number)[]= formula.split(' ').map((p) => p.match(/\d+/i) ? parseInt(p, 10) : p);
    while (formulaParts.includes("*")) {
        const a = formulaParts[0] as number;
        const b = formulaParts[2] as number;
        const rest = formulaParts.slice(3, formulaParts.length)
        const prod = (a * b) as (string | number)
        rest.unshift(prod);
        formulaParts = rest;
    }
    return formulaParts[0] as number;
}

const calculateParenthesis = (formula: string, additionFirst = false): string => {
    while (formula.includes("(") || formula.includes(")")) {
        const firstClosingIndex = formula.indexOf(")") + 1;
        const before = formula.slice(0, firstClosingIndex);
        const lastOpeningIndex = before.lastIndexOf("(")
        const values = before.slice(lastOpeningIndex, before.length).replace("(", "").replace(")", "");
        
        let result: number;
        if (additionFirst) {
            result = calculateFormulaAdditionFirst(values);
        } else {
            result = calculateFormulaLeftToRight(values);
        }
        
        const start = formula.slice(0, lastOpeningIndex);
        const end = formula.slice(firstClosingIndex, formula.length)
        formula = [start, result.toString(), end].join("")
    }
    return formula;
}

export const day18_step_1 = () => {
    const input = readInput(inputFile)
    let result = 0;
    for (let i = 0; i < input.length; i++) {
        const formula = calculateParenthesis(input[i])
        result += calculateFormulaLeftToRight(formula)
    }
    console.log('Step 1')
    console.log('------')
    console.log(`Sum: ${result}`); // 53660285675207 is correct
}

export const day18_step_2 = () => {
    const input = readInput(inputFile)
    let result = 0;
    for (let i = 0; i < input.length; i++) {
        const formula = calculateParenthesis(input[i], true)
        result += calculateFormulaAdditionFirst(formula)
    }
    console.log('Step 2')
    console.log('------')
    console.log(`Sum: ${result}`); // 141993988282687 is correct

}