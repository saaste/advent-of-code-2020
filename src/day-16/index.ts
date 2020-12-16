import { performance } from 'perf_hooks';
import { readInput, readInputAsString } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

type Range = {
    min: number;
    max: number;
}

class TicketInfo {
    rules: { [field: string]: Range[] };
    myTicket: number[];
    nearbyTickets: number[][];

    constructor(rules: { [field: string]: Range[] }, myTicket: number[], nearbyTickets: number[][]) {
        this.rules = rules;
        this.myTicket = myTicket;
        this.nearbyTickets = nearbyTickets;
    }

    isValidValue = (n: number): boolean => {
        const keys = Object.keys(this.rules)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            for (let j = 0; j < this.rules[key].length; j++) {
                const range = this.rules[key][j];
                if (n >= range.min && n <= range.max) {
                    return true;
                }
            }
        }
        return false;
    }

    isValidTicket = (ticket: number[]): boolean => {
        return ticket.every((n) => this.isValidValue(n))
    }

    validForFields = (sourceFields: string[], value: number): string[] => {
        const validFields = [];
        for (let i = 0; i < sourceFields.length; i++) {
            const key = sourceFields[i];
            for (let j = 0; j < this.rules[key].length; j++) {
                const range = this.rules[key][j];
                if (value >= range.min && value <= range.max) {
                    validFields.push(sourceFields[i]);
                }
            }
        }
        return validFields
    }
}

const parseTicketInfo = (inputFile: string[]): TicketInfo => {
    const rules: { [field: string]: Range[] } = {}
    let myTicket: number[] = [];
    const nearbyTickets: number[][] = [];

    let step = 0;

    const rulesRegEx = /^([a-z ]+): (.*)$/i

    for (let i = 0; i < inputFile.length; i++) {

        if (!inputFile[i]) {
            continue;
        }

        if (inputFile[i] === "your ticket:" || inputFile[i] === "nearby tickets:") {
            step++;
            continue
        }

        switch(step) {
            case 0:
                const matches = inputFile[i].match(rulesRegEx);
                if (!matches) {
                    throw new Error(`Unable to parse ticket rules: ${inputFile[i]}`)
                }
                const field = matches[1];
                const ranges = matches[2].split(" or ").map((ranges) => ranges.split("-")).map((ranges) => ({ min: parseInt(ranges[0], 10), max: parseInt(ranges[1], 10) }))
                rules[field] = ranges
                break;
            case 1:
                const myValues = inputFile[i].split(",").map((n) => parseInt(n, 10));
                myTicket = myValues;
                break;
            case 2:
                const nearbyValues = inputFile[i].split(",").map((n) => parseInt(n, 10));
                nearbyTickets.push(nearbyValues)
        }
    }

    return new TicketInfo(rules, myTicket, nearbyTickets)

}

export const day16_step_1 = () => {
    const input = readInput(inputFile);
    const ticketInfo = parseTicketInfo(input)

    let invalidValues: number = 0;
    for (let i = 0; i < ticketInfo.nearbyTickets.length; i++) {
        const nearbyTicket = ticketInfo.nearbyTickets[i];
        for (let j = 0; j < nearbyTicket.length; j++) {
            if (!ticketInfo.isValidValue(nearbyTicket[j])) {
                invalidValues += nearbyTicket[j]
            }
        }
    }

    console.log('Step 1');
    console.log('------');
    console.log(`Scanning error rate: ${invalidValues}`) // 19070 is correct
}

export const day16_step_2 = () => {
    const input = readInput(inputFile);
    const ticketInfo = parseTicketInfo(input)

    const indexToField: { [index: number]: string } = {}

    const validNearbyTickets = ticketInfo.nearbyTickets.filter((ticket) => ticketInfo.isValidTicket(ticket));
    const allTickets = [...validNearbyTickets, ticketInfo.myTicket]
    const columns = ticketInfo.myTicket.length;
    const allFields = Object.keys(ticketInfo.rules);
    const usedFields: string[] = [];
    const colsWithMultipleOptions: string[][] = [];
    let unknownFields: string[] = [];

    for (let i = 0; i < columns; i++) {
        let validFields = allFields.filter((field) => !usedFields.includes(field))
        
        for (let j = 0; j < allTickets.length; j++) {
            validFields = ticketInfo.validForFields(validFields, allTickets[j][i])
            if (validFields.length === 1) {
                usedFields.push(validFields[0])
                break; 
            }
        }
        
        if (validFields.length === 1) {
            indexToField[i] = validFields[0]
            for (let j = 0; j < colsWithMultipleOptions.length; j++) {
                colsWithMultipleOptions[j] = colsWithMultipleOptions[j].filter((f) => !usedFields.includes(f))
            }
            unknownFields = unknownFields.filter((f) => !usedFields.includes(f));
        } else {
            colsWithMultipleOptions[i] = validFields;
            for (let k = 0; k < validFields.length; k++) {
                if (!usedFields.includes(validFields[k]) && !unknownFields.includes(validFields[k])) {
                    unknownFields.push(validFields[k])
                }
            }
        }
    }

    while(unknownFields.length > 0) {
        for (let i = 0; i < unknownFields.length; i++) {
            const field = unknownFields[i]
            const possibleOptions: number[] = [];

            for (let j = 0; j < colsWithMultipleOptions.length; j++) {
                const options = colsWithMultipleOptions[j] || []
                if (options.includes(field)) {
                    possibleOptions.push(j)
                }
                if (possibleOptions.length > 1) break;

            }
            
            if (possibleOptions.length === 1) {
                indexToField[possibleOptions[0]] = field;
                unknownFields = unknownFields.filter((f) => f !== field)
                colsWithMultipleOptions[possibleOptions[0]] = []
                for (let j = 0; j < colsWithMultipleOptions.length; j++) {
                    const options = colsWithMultipleOptions[j] || []
                    colsWithMultipleOptions[j] = options.filter((f) => f !== field)
                }
            } else if (possibleOptions.length === 0) {
                throw new Error(`Field ${field} don't have options. Something went wrong.`)
            }
        }
    }
    
    let result = 1;
    for (let i = 0; i < ticketInfo.myTicket.length; i++) {
        if (indexToField[i].startsWith('departure')) {
            result *= ticketInfo.myTicket[i]
        }
    }

    console.log('Step 2');
    console.log('------');
    console.log(`Result is ${result}`) // 161926544831 is correct

}

