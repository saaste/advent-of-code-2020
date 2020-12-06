import { readInput } from '../helpers';

const inputFile = `${__dirname}/input.txt`;

const countYesFromAll = (groupSize: number, groupAnswers: string): number => {
    let yesAnswers = 0;
    while (groupAnswers.length > 0) {
        let letter = groupAnswers[0];
        let regExp = new RegExp(`[^${letter}]`, "g")
        let letterCount = groupAnswers.replace(regExp, "").length
        if (letterCount === groupSize) {
            yesAnswers++;
        }
        groupAnswers = groupAnswers.replace(letter, "");
    }
    return yesAnswers
}

export const day6_step_1 = () => {
    const answers = readInput(inputFile)
    const yesCounts: number[] = []
    let currentGroupAnswers: string[] = []

    for (let i = 0; i < answers.length; i++) {
        let currentPerson = answers[i];
        if (currentPerson.length === 0) {
            yesCounts.push(currentGroupAnswers.length);
            currentGroupAnswers = [];
            continue
        }

        for (let j = 0; j < currentPerson.length; j++) {
            const yesAnswer = currentPerson[j];
            if (!currentGroupAnswers.includes(yesAnswer)) {
                currentGroupAnswers.push(yesAnswer)
            }
        }
    }
    yesCounts.push(currentGroupAnswers.length);

    const totalSum = yesCounts.reduce((a, b) => a + b);
    
    console.log('Step 1');
    console.log('------');
    console.log(`Sum: ${totalSum}`); // 6885 is correct
}

export const day6_step_2 = () => {
    const answers = readInput(inputFile)
    const yesCounts: number[] = []
    
    let currentGroupAnswers: string = ""
    let currentGroupSize: number = 0;

    for (let i = 0; i < answers.length; i++) {
        let currentPerson = answers[i];
        
        if (currentPerson.length === 0) {
            let yesAnswers = countYesFromAll(currentGroupSize, currentGroupAnswers)
            yesCounts.push(yesAnswers)
            currentGroupAnswers = "";
            currentGroupSize = 0;
            continue
        }

        currentGroupSize++;
        currentGroupAnswers += currentPerson;
    }
    let yesAnswers = countYesFromAll(currentGroupSize, currentGroupAnswers)
    yesCounts.push(yesAnswers)

    const totalSum = yesCounts.reduce((a, b) => a + b);
    
    console.log('Step 2');
    console.log('------');
    console.log(`Sum: ${totalSum}`); // 3550 is correct
}