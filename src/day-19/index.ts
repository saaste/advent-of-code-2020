import { MessageChannel } from 'worker_threads';
import { readInput } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;

type Rule = string | number[] | [number[], number[]];

class Rules {
    rules: Rule[];

    constructor() {
        this.rules = [];
    }

    addRule = (index: number, node: Rule): void => {
        this.rules[index] = node;
    }

    isValid = (message: string): boolean => {
        const [isValid, target] = this.testRule(message, 0, "");
        return isValid && target === message;
    }

    private testRule = (message: string, ruleIndex: number, target: string): [boolean, string] => {
        if (target.length > message.length) {
            return [false, target]
        }

        const rule = this.rules[ruleIndex];    
        switch (typeof rule[0]) {
            case "string":
                target += rule as string
                return [message.startsWith(target), target];
            
            case "number":
                for (let i = 0; i < rule.length; i++) {
                    const newRuleIndex = rule[i] as number;
                    const [isValid, newTarget] = this.testRule(message, newRuleIndex, target)
                    if (!isValid) {
                        return [false, newTarget]
                    }
                    target = newTarget
                }
                return [true, target]
            
            case "object":
                const ruleA = rule[0] as number[];
                const ruleB = rule[1] as number[];
                
                let isAllValid = true;
                let origTarget = target;
                for (let i = 0; i < ruleA.length; i++) {
                    const newRuleIndex = ruleA[i] as number;
                    const [isValid, newTarget] = this.testRule(message, newRuleIndex, target)
                    if (!isValid) {
                        isAllValid = false;
                        break;
                    }
                    target = newTarget
                }

                if (isAllValid) {
                    return [true, target]
                }

                target = origTarget;
                for (let i = 0; i < ruleB.length; i++) {
                    const newRuleIndex = ruleB[i] as number;
                    const [isValid, newTarget] = this.testRule(message, newRuleIndex, target)
                    if (!isValid) {
                        return [false, newTarget]
                    }
                    target = newTarget
                }
                return [true, target]
        }
    }

    generateRegExp = (index: number, maxDepth = 40): string => {
        if (maxDepth < 0) return "";
        const rule = this.rules[index];
        
        if (typeof rule[0] === "string") {
            return rule as string;
        } else if (typeof rule[0] === "number") {
            const numberArray = rule as number[];
            return "(" + numberArray.map(x => this.generateRegExp(x, maxDepth - 1)).join("") + ")";
        } else {
            const orArray = rule as number[][];
            return "(" + orArray.map(x => x.map(x => this.generateRegExp(x, maxDepth - 1)).join("")).join('|') + ")";
        }
    }

}

const parseGraph = (input: string[]): [Rules, string[]] => {
    const graph = new Rules();
    const messages: string[] = [];

    const ruleRegExp = /^(\d+): (.*)$/i
    for (let i = 0; i < input.length; i++) {
        const matchesRule = input[i].match(ruleRegExp);
        if (matchesRule) {
            const index = parseInt(matchesRule[1], 10);
            const targets = matchesRule[2];
            let value: Rule;
            
            if (targets.includes("|")) {
                const options = targets.split(" | ");
                const optionA = options[0].split(" ").map((t) => parseInt(t, 10))
                const optionB = options[1].split(" ").map((t) => parseInt(t, 10))
                value = [optionA, optionB]
            } else if (targets.includes('"')) {
                value = targets.replace(/\"/gi, "");
            } else {
                value = targets.split(" ").map((t) => parseInt(t, 10))
                
            }
            graph.addRule(index, value)
        } else if (input[i].length) {
            messages.push(input[i])
        }
    }

    return [graph, messages]
}

export const day19_step_1 = () => {
    const input = readInput(inputFile);
    const [graph, messages] = parseGraph(input)
    const validMessages = messages.filter((message) => graph.isValid(message));

    console.log('Step 1')
    console.log('------')
    console.log(`Valid messages: ${validMessages.length}`); // 132 is correct
}

export const day19_step_2 = () => {
    // I banged my head into wall with this without getting the right answer.
    // I didn't want to waste my Saturday on this so I ended up using the
    // solution by TheUnlocked and modified it for myself. Very clever!
    const input = readInput(inputFile);
    const [graph, messages] = parseGraph(input)
    
    graph.addRule(8, [[42], [42, 8]])
    graph.addRule(11, [[42, 31], [42, 11, 31]])

    const regExp = new RegExp("^" + graph.generateRegExp(0) + "$");
    const validMessages = messages.filter((message) => regExp.test(message));

    console.log('Step 2')
    console.log('------')
    console.log(`Valid messages: ${validMessages.length}`); // 306 is correct
}