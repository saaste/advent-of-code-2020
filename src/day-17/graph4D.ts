import { Cube4D } from "./cube4D";

export class Graph4D {
    max: number;
    graph: Cube4D[][][][];

    constructor(max: number) {
        this.graph = [];
        this.max = max;
    }

    addCube = (cube: Cube4D): void => {
        if (!this.graph[cube.w]) {
            this.graph[cube.w] = [];
        }

        if (!this.graph[cube.w][cube.z]) {
            this.graph[cube.w][cube.z] = [];
        }

        if (!this.graph[cube.w][cube.z][cube.y]) {
            this.graph[cube.w][cube.z][cube.y] = [];
        }

        this.graph[cube.w][cube.z][cube.y][cube.x] = cube
    }

    cubeExists = (x: number, y: number, z: number, w: number): boolean => {
        try {
            return this.graph[w][z][y][x] !== undefined
        } catch {
            return false;
        }
    }

    getActive = (): Cube4D[] => {
        const active: Cube4D[] = [];
        for (let w = -this.max; w <= this.max; w++) {
            for (let z = -this.max; z <= this.max; z++) {
                for (let y = -this.max; y <= this.max; y++) {
                    for (let x = -this.max; x <= this.max; x++) {
                        if (this.graph[w][z][y][x].isActive) active.push(this.graph[w][z][y][x]);
                    }
                }
            }
        }
        return active
    }


    private countNeighbors = (x: number, y: number, z: number, w: number): number => {
        let activeCount = 0;
        for (let w2 = w-1; w2 <= w+1; w2++) {        
            for (let z2 = z-1; z2 <= z+1; z2++) {        
                for (let y2 = y-1; y2 <= y+1; y2++) {
                    for (let x2 = x-1; x2 <= x+1; x2++) {
                        if (w2 === w && z2 === z && y2 === y && x2 === x) {
                            continue;
                        }
                        
                        try {
                            if (this.graph[w2][z2][y2][x2].isActive) {
                                activeCount++;
                            }
                        } catch {
                            
                        }
                    }    
                }    
            }
        }
        return activeCount
    }

    private prepareCubes = () => {
        for (let w = -this.max; w <= this.max; w++) {
            for (let z = -this.max; z <= this.max; z++) {
                for (let y = -this.max; y <= this.max; y++) {
                    for (let x = -this.max; x <= this.max; x++) {
                        const activeNeighbors = this.countNeighbors(x, y, z, w);
                        
                        if (this.graph[w][z][y][x].isActive) {
                            if (activeNeighbors < 2 || activeNeighbors > 3) {
                                this.graph[w][z][y][x].prepareState(false)
                            }
                        } else {
                            if (activeNeighbors === 3) {
                                this.graph[w][z][y][x].prepareState(true)
                            }
                        }
                    }
                }
            }
        }
    }

    private updateCubes = () => {
        for (let w = -this.max; w <= this.max; w++) {
            for (let z = -this.max; z <= this.max; z++) {
                for (let y = -this.max; y <= this.max; y++) {
                    for (let x = -this.max; x <= this.max; x++) {
                        this.graph[w][z][y][x].updateState();
                    }
                }
            }
        }
    }

    cycle = () => {
        this.prepareCubes();
        this.updateCubes();
    }

    print = (): void => {
        for (let w = -this.max; w <= this.max; w++) {
            for (let z = -this.max; z <= this.max; z++) {
                console.log(`z=${z}, w=${w}`);
                for (let y = -this.max; y <= this.max; y++) {
                    let row = "";
                    for (let x = -this.max; x <= this.max; x++) {
                        row += this.graph[w][z][y][x].toString();
                    }
                    console.log(row)
                }
                console.log();
            }
        }
    }
}