import { readInput } from '../helpers';

const inputFile = `${__dirname}/input.txt`;

const findNewPoint = (x: number, y: number, angleDeg: number, dist: number): [number, number] => {
    const newX = Math.round(Math.cos(angleDeg * Math.PI / 180) * dist + x);
    const newY = Math.round(Math.sin(angleDeg * Math.PI / 180) * dist + y);
    return [newX, newY]
}

const rotate = (angleRad: number, centerX: number, centerY: number, x: number, y: number): [number, number] => {
    const newX = Math.round(Math.cos(angleRad) * (x - centerX) - Math.sin(angleRad) * (y - centerY) + centerX)
    const newY = Math.round(Math.sin(angleRad) * (x - centerX) - Math.cos(angleRad) * (y - centerY) + centerX)
    return [newX, newY]
}

export const day12_step_1 = () => {
    let x: number = 0;
    let y: number = 0;
    let angle: number = 0;
    
    const instructions = readInput(inputFile);
    
    for (let i = 0; i < instructions.length; i++) {
        const value = parseInt(instructions[i].substr(1, instructions.length), 10);
        switch(instructions[i][0]) {
            case "N":
                y += value;
                break;
            case "S":
                y -= value;
                break;
            case "E":
                x += value;
                break;
            case "W":
                x -= value;
                break;
            case "L":
                angle += value;
                break;
            case "R":
                angle -= value;
                break;
            case "F":
                const [newX, newY] = findNewPoint(x, y, angle, value)
                x = newX
                y = newY
                break;
        }
    }

    const distanceFromOrigin = Math.abs(x) + Math.abs(y)
    
    console.log("Step 1")
    console.log("------")
    console.log(distanceFromOrigin) // 364 is correct
}

export const day12_step_2 = () => {
    let shipX: number = 0;
    let shipY: number = 0;
    let waypointX: number = 10;
    let waypointY: number = 1;

    const instructions = readInput(inputFile);
    
    for (let i = 0; i < instructions.length; i++) {
        let value = parseInt(instructions[i].substr(1, instructions.length), 10);
        let newX: number = 0;
        let newY: number = 0;
        let xDist:number = 0;
        let yDist: number = 0;
        switch(instructions[i][0]) {
            case "N":
                waypointY += value;
                break;
            case "S":
                waypointY -= value;
                break;
            case "E":
                waypointX += value;
                break;
            case "W":
                waypointX -= value;
                break;
            case "L":
                xDist = waypointX - shipX;
                yDist = waypointY - shipY;
                switch(value) {
                    case 90:
                        newX = yDist * -1;
                        newY = xDist
                        break;
                    case 180:
                        newX = xDist * -1;
                        newY = yDist * -1;
                        break;
                    case 270:
                        newX = yDist;
                        newY = xDist * -1;
                        break;
                    default:
                        throw new Error("Invalid angle")
                }

                waypointX = shipX + newX
                waypointY = shipY + newY
                break;
            case "R":
                xDist = waypointX - shipX;
                yDist = waypointY - shipY;
                switch(value) {
                    case 90:
                        newX = yDist;
                        newY = xDist * -1
                        break;
                    case 180:
                        newX = xDist * -1;
                        newY = yDist * -1;
                        break;
                    case 270:
                        newX = yDist * -1;
                        newY = xDist;
                        break;
                    default:
                        throw new Error("Invalid angle")
                }
                waypointX = shipX + newX
                waypointY = shipY + newY
                break;
            case "F":
                const xDiff = waypointX - shipX;
                const yDiff = waypointY - shipY
                while (value > 0) {
                    shipX += xDiff;
                    shipY += yDiff;
                    waypointX += xDiff
                    waypointY += yDiff
                    value--;
                }
                break;
        }
    }

    const distanceFromOrigin = Math.abs(shipX) + Math.abs(shipY)
    
    console.log()

    console.log("Step 2")
    console.log("------")
    console.log(distanceFromOrigin) // 39518 is correct
}