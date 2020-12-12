import { readInput } from '../helpers/input';
import { Point } from '../helpers/point'

const inputFile = `${__dirname}/input.txt`;

export const day12_step_1 = () => {
    const ship = new Point();    
    const instructions = readInput(inputFile);

    let angle: number = 0;
    for (let i = 0; i < instructions.length; i++) {
        const action = instructions[i][0];
        const value = parseInt(instructions[i].substr(1, instructions.length), 10);
        
        if (action === "N") ship.moveUp(value);
        else if (action === "S") ship.moveDown(value);
        else if (action === "E") ship.moveRight(value);
        else if (action === "W") ship.moveLeft(value);
        else if (action === "L") angle += value;
        else if (action === "R") angle -= value;
        else if (action === "F") ship.move(angle, value);
        else throw new Error(`Unknown action ${action}`)
    }

    
    console.log("Step 1")
    console.log("------")
    console.log(`Distance: ${ship.distanceXY(new Point(0, 0))}`) // 364 is correct
}

export const day12_step_2 = () => {
    const instructions = readInput(inputFile);

    const ship = new Point();
    const waypoint = new Point(10, 1);

    for (let i = 0; i < instructions.length; i++) {
        const action = instructions[i][0];
        const value = parseInt(instructions[i].substr(1, instructions.length), 10);
        
        if (action === "N") waypoint.moveUp(value);
        else if (action === "S") waypoint.moveDown(value);
        else if (action === "E") waypoint.moveRight(value);
        else if (action === "W") waypoint.moveLeft(value);
        else if (action === "L") waypoint.rotate(ship, value);
        else if (action === "R") waypoint.rotate(ship, 360 - value);
        else if (action === "F") {
            const angle = ship.angle(waypoint)
            const distance = ship.distance(waypoint)
            for (let j = 0; j < value; j++) {
                ship.move(angle, distance);
                waypoint.move(angle, distance);
            }
        }
        else throw new Error(`Unknown action ${action}`)
    }
    
    console.log("Step 2")
    console.log("------")
    console.log(`Distance: ${ship.distanceXY(new Point())}`) // 39518 is correct
}