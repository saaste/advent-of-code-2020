import { readInput } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

interface Bag {
    color: string;
    children: Bag[];
}

const findPossibleParents = (input: string[], color: string, checkedColors: string[] = [], parentCount: number = 0): number => {
    const regExp = new RegExp(`^(.*) bags contain (.*${color}.*)\.$`, "i")
    const parents: string[] = []

    for (let i = 0; i < input.length; i++) {
        const match = input[i].match(regExp);
        if (match && !checkedColors.includes(match[1])) {
            parentCount++;
            checkedColors.push(match[1])
            parents.push(match[1])
        }
    }

    if (parents.length === 0) {
        return parentCount;
    }

    for (let i = 0; i < parents.length; i++) {
        parentCount = findPossibleParents(input, parents[i], checkedColors, parentCount);
    }

    return parentCount;
}

export const day7_step_1 = () => {
    const rules = readInput(inputFile);
    let parentCount = findPossibleParents(rules, "shiny gold");

    console.log('Step 1');
    console.log('------');
    console.log(`Bag count: ${parentCount}`); // 177 is correct
}

const findNestedBags = (input: string[], color: string = "shiny gold", amount = 1): number => {
    const regExp = new RegExp(`^(${color}) bags contain (.*)\.$`, "i")
    const childRegExp = new RegExp("^([0-9]) (.*)", "i");

    let bagChildren: string[] = [];
    for (let i = 0; i < input.length; i++) {
        let match = input[i].match(regExp);
        if (match) {
            if (input[i].includes("no other")) {
                return amount;
            }
            bagChildren = match[2].replace(new RegExp("bag[s]?", "g"), "").split(",").map((c) => c.trim())
            break;
        }
    }

    const childWithCounts: any[][] = [];
    for (let i = 0; i < bagChildren.length; i++) {
        const match = bagChildren[i].match(childRegExp);
        if (match) {
            childWithCounts.push([ match[2], parseInt(match[1], 10) ]);
        }
    }

    const sum = childWithCounts.map(([color, count]) => {
        return findNestedBags(input, color, count)
    }).reduce((a, b) => a + b)

    return amount + amount * sum
}


export const day7_step_2 = () => {
    const rules = readInput(inputFile);
    let nestedCount = findNestedBags(rules);

    console.log('Step 2');
    console.log('------');
    console.log(`Bag count: ${nestedCount - 1}`); // 34988 is correct
}