import { readInput } from '../helpers/input';
import { Cube3D } from './cube3D';
import { Cube4D } from './cube4D';
import { Graph3D } from './graph3D';
import { Graph4D } from './graph4D';

const inputFile = `${__dirname}/input.txt`;


// Both solutions are super naive and extremely slow. Yey!

export const day17_step_1 = () => {
    const initialState = readInput(inputFile)
    const max = 12 // Minimum required graph size to get the right answer
    const graph = new Graph3D(max);
    
    // Set initial state
    for (let y = 0; y < initialState.length; y++) {
        const states = initialState[y].split('').map((c) => c === '#');
        //console.log(y, states)
        for (let x = 0; x < states.length; x++) {
            const cube = new Cube3D(x, y, 0, states[x]);
            graph.addCube(cube);
        }
    }

    // Expand the graph
    for (let x = -max; x <= max; x++) {
        for (let y = -max; y <= max; y++) {
            for (let z = -max; z <= max; z++) {
                if (!graph.cubeExists(x, y, z)) {
                    graph.addCube(new Cube3D(x, y, z, false))
                }
            }
        }
    }

    // Cycles
    for (let i = 0; i < 6; i++) {
        graph.cycle();
    }
    
    const activeCubes = graph.getActive();

    console.log('Step 1');
    console.log('------');
    console.log(`Active cubes: ${activeCubes.length}`) // 322 is correct
}

export const day17_step_2 = () => {
    const initialState = readInput(inputFile)
    const max = 12 // Minimum required graph size to get the right answer
    const graph = new Graph4D(max);
    
    // Set initial state
    for (let y = 0; y < initialState.length; y++) {
        const states = initialState[y].split('').map((c) => c === '#');
        //console.log(y, states)
        for (let x = 0; x < states.length; x++) {
            const cube = new Cube4D(x, y, 0, 0, states[x]);
            graph.addCube(cube);
        }
    }

    // Expand the graph
    for (let x = -max; x <= max; x++) {
        for (let y = -max; y <= max; y++) {
            for (let z = -max; z <= max; z++) {
                for (let w = -max; w <= max; w++) {
                    if (!graph.cubeExists(x, y, z, w)) {
                        graph.addCube(new Cube4D(x, y, z, w, false))
                    }
                }
            }
        }
    }

    // Cycles
    for (let i = 0; i < 6; i++) {
        graph.cycle();
    }
    
    const activeCubes = graph.getActive();

    console.log('Step 2');
    console.log('------');
    console.log(`Active cubes: ${activeCubes.length}`) // 2000 is correct
}