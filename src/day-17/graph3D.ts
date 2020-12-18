import { Cube3D } from "./cube3D";

export class Graph3D {
    max: number;
    graph: Cube3D[][][];

    constructor(max: number) {
        this.graph = [];
        this.max = max;
    }

    addCube = (cube: Cube3D): void => {
        if (!this.graph[cube.z]) {
            this.graph[cube.z] = [];
        }

        if (!this.graph[cube.z][cube.y]) {
            this.graph[cube.z][cube.y] = [];
        }

        this.graph[cube.z][cube.y][cube.x] = cube
    }

    cubeExists = (x: number, y: number, z: number): boolean => {
        try {
            return this.graph[z][y][x] !== undefined
        } catch {
            return false;
        }
    }

    getActive = (): Cube3D[] => {
        const active: Cube3D[] = [];
        for (let z = -this.max; z <= this.max; z++) {
            for (let y = -this.max; y <= this.max; y++) {
                for (let x = -this.max; x <= this.max; x++) {
                    if (this.graph[z][y][x].isActive) active.push(this.graph[z][y][x]);
                }
            }
        }
        return active
    }


    private countNeighbors = (x: number, y: number, z: number): number => {
        let activeCount = 0;
        for (let z2 = z-1; z2 <= z+1; z2++) {        
            for (let y2 = y-1; y2 <= y+1; y2++) {
                for (let x2 = x-1; x2 <= x+1; x2++) {
                    if (z2 === z && y2 === y && x2 === x) {
                        continue;
                    }
                    
                    try {
                        if (this.graph[z2][y2][x2].isActive) {
                            activeCount++;
                        }
                    } catch {
                        
                    }
                }    
            }    
        }
        return activeCount
    }

    private prepareCubes = () => {
        for (let z = -this.max; z <= this.max; z++) {
            for (let y = -this.max; y <= this.max; y++) {
                for (let x = -this.max; x <= this.max; x++) {
                    const activeNeighbors = this.countNeighbors(x, y, z);
                    
                    if (this.graph[z][y][x].isActive) {
                        if (activeNeighbors < 2 || activeNeighbors > 3) {
                            this.graph[z][y][x].prepareState(false)
                        }
                    } else {
                        if (activeNeighbors === 3) {
                            this.graph[z][y][x].prepareState(true)
                        }
                    }
                }
            }
        }
    }

    private updateCubes = () => {
        for (let z = -this.max; z <= this.max; z++) {
            for (let y = -this.max; y <= this.max; y++) {
                for (let x = -this.max; x <= this.max; x++) {
                    this.graph[z][y][x].updateState();
                }
            }
        }
    }

    cycle = () => {
        this.prepareCubes();
        this.updateCubes();
    }

    print = (): void => {
        for (let z = -this.max; z <= this.max; z++) {
            console.log(`z=${z}`);
            for (let y = -this.max; y <= this.max; y++) {
                let row = "";
                for (let x = -this.max; x <= this.max; x++) {
                    row += this.graph[z][y][x].toString();
                }
                console.log(row)
            }
            console.log();
        }
    }
}