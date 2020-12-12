export default class Graph {
    graph: number[][];
    paths: number;
    iterations: number;
    singleLineCounts: number[]

    constructor(adapters: number[]) {
        this.graph = [];
        this.paths = 0;
        this.iterations = 0;
        this.singleLineCounts = [];


        for (let i = 0; i < adapters.length; i++) {
            const from = adapters[i];
            this.graph[from] = [];
            
            for (let j = 1; j <= 3; j++) {
                let to = from + j
                if (adapters.includes(to)) {
                    this.addEdge(from, to)
                }
            }
        }
    }

    private addEdge = (from: number, to: number) => {
        this.graph[from].push(to);
    }

    private count = (from: number, to: number) => {
        this.iterations++;
        
        if (from === to) {
            this.paths++;
            return;
        }

        if (this.singleLineCounts[from]) {
            this.paths += this.singleLineCounts[from]
            return;
        }

        for (let i = 0; i < this.graph[from].length; i++) {
            let adjacent = this.graph[from][i];
            this.count(adjacent, to);
        }

        if (this.graph[from].length === 1) {
            this.singleLineCounts[from] = this.paths;
        }
    }

    countPaths = (from: number, to: number): [number, number] => {
        this.count(from, to);
        return [this.paths, this.iterations];
    }
}