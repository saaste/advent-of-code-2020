import { readInput } from '../helpers/input';
import { CongruentModulo, crtBigInt } from '../helpers/math';

const inputFile = `${__dirname}/input.txt`;

export const day13_step_1 = () => {
    const busData = readInput(inputFile);
    const leaveTime = parseInt(busData[0], 10);
    const busses = busData[1].split(",").filter((bus) => bus !== "x").map((bus) => parseInt(bus, 10))

    let bestBus = 0;
    let waitTime = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < busses.length; i++) {
        const bus = busses[i]
        const time = Math.floor(leaveTime / bus);
        
        if (time === leaveTime) {
            bestBus = bus
            waitTime = 0
            break;
        }

        const newWaitTime = (time+1) * bus  - leaveTime;
        if (newWaitTime < waitTime) {
            bestBus = bus;
            waitTime = newWaitTime
        }
    }

    console.log('Step 1')
    console.log('------')
    console.log(`Result: ${bestBus * waitTime}`) // 3269 is correct
}

export const day13_step_2 = () => {
    const busData = readInput(inputFile);

    // Courtesy of AlexAegis: https://github.com/AlexAegis/advent-of-code/blob/master/src/2020/day13/typescript/part_two.ts
    // I had no idea how to figure this out. In a way, I still don't :--D
    const divisorsAndRemainders: CongruentModulo<bigint>[] = []
    busData[1].split(",").forEach((bus, index) => {
        if (bus !== 'x') {
            const busId = parseInt(bus, 10)
            divisorsAndRemainders.push({ remainder: BigInt(busId - index), modulo: BigInt(busId)})
        }
    })
    
    const startTime = Number(crtBigInt(divisorsAndRemainders))
    console.log('Step 2')
    console.log('------')
    console.log(`Start time: ${startTime}`) // 672754131923874 is correct
        
}