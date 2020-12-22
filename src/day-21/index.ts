import { readInput } from '../helpers/input';
import { AllergenicMap, findPossibleIncredients, findSingleIncredient, Food, removeUsedIncredient } from './helpers';

const inputFile = `${__dirname}/input.txt`;

const input = readInput(inputFile);
const inputRegExp = new RegExp('(.*) \\(contains (.*)\\)', 'i');

const foods: Food[] = [];
const allIncredients: Set<string> = new Set();
const allAllergenics: Set<string> = new Set();

// Collect food, all incredients and all allergenics
for (let i = 0; i < input.length; i++) {
    const matches = input[i].match(inputRegExp);
    if (matches) {
        const incredients = matches[1].split(' ');
        const allergenics = matches[2].split(', ');

        foods.push({
            incredients: incredients,
            allergenics: allergenics
        })
        allergenics.forEach((allergenic) => {
            allAllergenics.add(allergenic);
        })
        incredients.forEach((incredient) => {
            allIncredients.add(incredient);
        })
    }
}

// Find all possible incredient for each allergenic
const possibleIncredients = findPossibleIncredients(allAllergenics, foods);

// Collect known incredient one by one
const knownIncredients: [string, string][] = [];
let singleIncredient = findSingleIncredient(possibleIncredients);
while (singleIncredient !== null) {
    knownIncredients.push(singleIncredient)
    removeUsedIncredient(singleIncredient[1], possibleIncredients);
    singleIncredient = findSingleIncredient(possibleIncredients)
}

// Count unknown incredient usage
const unknownIncredients: string[] = Array.from(allIncredients).filter(incredient => !knownIncredients.map(i => i[1]).includes(incredient));
let unknownCount = 0;
for (let i = 0; i < unknownIncredients.length; i++) {
    for (let j = 0; j < foods.length; j++) {
        if (foods[j].incredients.includes(unknownIncredients[i])) {
            unknownCount++;
        }
    }
}

// Get sorted list of dangerous incredients
const sortedKnown = knownIncredients.sort((a, b) => {
    if (a[0] > b[0]) return 1
    if (a[0] < b[0]) return -1
    return 0
}).map((item) => item[1]).join(",")

export const day21_step_1 = () => {
    console.log('Step 1');
    console.log('------');
    console.log(`Usage count: ${unknownCount}`) // 2627 is correct
}

export const day21_step_2 = () => {
    console.log('Step 2');
    console.log('------');
    console.log(`Dangerous incredients: ${sortedKnown}`) // hn,dgsdtj,kpksf,sjcvsr,bstzgn,kmmqmv,vkdxfj,bsfqgb is correct
}
