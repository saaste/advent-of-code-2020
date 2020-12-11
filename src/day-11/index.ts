import { readInput } from '../helpers';

const inputFile = `${__dirname}/input.txt`;

const countOccupiedAdjacent = (seats: string[], row: number, col: number): number => {
    const maxCol = seats[0].length -1
    const maxRow = seats.length - 1
    let occupiedCount = 0;

    try {
        // Seats above
        if (row > 0) {
            if (seats[row-1][col] === "#") occupiedCount++;
            if (col > 0 && seats[row-1][col-1] === "#") occupiedCount++;
            if (col < maxCol && seats[row-1][col+1] === "#") occupiedCount++;
        }
        

        // Seats left and right
        if (col > 0 && seats[row][col-1] === "#") occupiedCount++
        if (col < maxCol && seats[row][col+1] === "#") occupiedCount++

        // Seats below
        if (row < maxRow) {
            if (seats[row+1][col] === "#") occupiedCount++;
            if (col > 0 && seats[row+1][col-1] === "#") occupiedCount++;
            if (col < maxCol && seats[row+1][col+1] === "#") occupiedCount++;
        }
    } catch (e) {
        console.log(row, col)
        throw e;
    }
    
    return occupiedCount;
}

const updateSeats = (seats: string[]): string[] => {
    const newSeats: string[] = Array(seats.length).fill("");

    for (let row = 0; row < seats.length; row++) {
        for (let col = 0; col < seats[row].length; col++) {
            let occupiedCount = 0;
            switch(seats[row][col]) {
                case ".":
                    newSeats[row] += "."
                    break;
                case "L":
                    occupiedCount = countOccupiedAdjacent(seats, row, col)
                    newSeats[row] += occupiedCount ? "L" : "#";
                    break;
                case "#":
                    occupiedCount = countOccupiedAdjacent(seats, row, col)
                    newSeats[row] += occupiedCount >= 4 ? "L" : "#";
                    break;
                default:
                    throw Error("Unknown character")
            }
        }
    }

    return newSeats
}

const equals = (a: string[], b: string[]): boolean => {
    let stringA: string = ""
    let stringB: string = ""

    a.forEach((row) => stringA += row)
    b.forEach((row) => stringB += row)

    return stringA === stringB
}

type AdjSeat = {
    row: number;
    col: number;
}

type AdjSeats = {
    top: AdjSeat | undefined;
    bottom: AdjSeat | undefined;
    left: AdjSeat | undefined;
    right: AdjSeat | undefined;
    topLeft: AdjSeat | undefined;
    topRight: AdjSeat | undefined;
    bottomLeft: AdjSeat | undefined;
    bottomRight: AdjSeat | undefined;
}

const findClosestAdjacents = (seats: string[]): AdjSeats[][] => {
    const maxRow = seats.length - 1
    const maxCol = seats[0].length - 1
    const adjacents: AdjSeats[][] = []

    // This such a horrible mess but I'm too lazy :---D

    for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
            let top: AdjSeat | undefined;
            let bottom: AdjSeat | undefined;
            let left: AdjSeat | undefined;
            let right: AdjSeat | undefined;
            let topLeft: AdjSeat | undefined;
            let topRight: AdjSeat | undefined;
            let bottomLeft: AdjSeat | undefined;
            let bottomRight: AdjSeat | undefined;

            // find top
            if (row > 0) {
                for(let adjRow = row-1; adjRow >= 0; adjRow--) {
                    const seat = seats[adjRow][col]
                    if (seat === "#" || seat === "L") {
                        top = {
                            row: adjRow,
                            col: col
                        }
                        break;
                    }
                }
            }

            // find bottom
            if (row < maxRow) {
                for(let adjRow = row+1; adjRow <= maxRow; adjRow++) {
                    const seat = seats[adjRow][col]
                    if (seat === "#" || seat === "L") {
                        bottom = {
                            row: adjRow,
                            col: col
                        }
                        break;
                    }
                }
            }

            // find left
            if (col > 0) {
                for(let adjCol = col-1; adjCol >= 0; adjCol--) {
                    const seat = seats[row][adjCol]
                    if (seat === "#" || seat === "L") {
                        left = {
                            row: row,
                            col: adjCol
                        }
                        break;
                    }
                }
            }

             // find right
            if (col < maxRow) {
                for(let adjCol = col+1; adjCol <= maxCol; adjCol++) {
                    const seat = seats[row][adjCol]
                    if (seat === "#" || seat === "L") {
                        right = {
                            row: row,
                            col: adjCol
                        };
                        break;
                    }
                }
            }

            // find top left
            if (col > 0 && row > 0) {
                let adjRow = row - 1
                let adjCol = col - 1

                while (adjRow >= 0 && adjCol >= 0) {
                    const seat = seats[adjRow][adjCol]
                    if (seat === "#" || seat === "L") {
                        topLeft = {
                            row: adjRow,
                            col: adjCol
                        };
                        break;
                    }
                    adjRow--;
                    adjCol--;
                }
            }

            // find top right
            if (col < maxCol && row > 0) {
                let adjRow = row - 1
                let adjCol = col + 1

                while (adjRow >= 0 && adjCol <= maxCol) {
                    const seat = seats[adjRow][adjCol]
                    if (seat === "#" || seat === "L") {
                        topRight = {
                            row: adjRow,
                            col: adjCol
                        };
                        break;
                    }
                    adjRow--;
                    adjCol++;
                }
            }

            // find bottom left
            if (col > 0 && row < maxRow) {
                let adjRow = row + 1
                let adjCol = col - 1

                while (adjRow <= maxRow && adjCol >= 0) {
                    const seat = seats[adjRow][adjCol]
                    if (seat === "#" || seat === "L") {
                        bottomLeft = {
                            row: adjRow,
                            col: adjCol
                        };
                        break;
                    }
                    adjRow++;
                    adjCol--;
                }
            }

            // find bottom right
            if (col < maxCol && row < maxRow) {
                let adjRow = row + 1
                let adjCol = col + 1

                while (adjRow <= maxRow && adjCol <= maxCol) {
                    const seat = seats[adjRow][adjCol]
                    if (seat === "#" || seat === "L") {
                        bottomRight = {
                            row: adjRow,
                            col: adjCol
                        };
                        break;
                    }
                    adjRow++;
                    adjCol++;
                }
            }

            if (!adjacents[row]) {
                adjacents[row] = [];
            }

            adjacents[row][col] = {
                top: top,
                bottom: bottom,
                left: left,
                right: right,
                topLeft: topLeft,
                topRight: topRight,
                bottomLeft: bottomLeft,
                bottomRight: bottomRight
            } as AdjSeats
        }
    }

    return adjacents
}

const countNextVisibleAdjacent = (seats: string[], adjacents: AdjSeats[][], row: number, col: number): number => {
    let occupiedCount = 0;

    const adjacent = adjacents[row][col]
    Object.entries(adjacent).forEach(([key, value]) => {
        if (value && seats[value.row][value.col] === "#") occupiedCount++;
    })

    return occupiedCount;
}

const updateSeats2 = (seats: string[], adjacents: AdjSeats[][]): string[] => {
    const newSeats: string[] = Array(seats.length).fill("");

    for (let row = 0; row < seats.length; row++) {
        for (let col = 0; col < seats[row].length; col++) {
            let occupiedCount = 0;
            switch(seats[row][col]) {
                case ".":
                    newSeats[row] += "."
                    break;
                case "L":
                    occupiedCount = countNextVisibleAdjacent(seats, adjacents, row, col)
                    newSeats[row] += occupiedCount ? "L" : "#";
                    break;
                case "#":
                    occupiedCount = countNextVisibleAdjacent(seats, adjacents, row, col)
                    newSeats[row] += occupiedCount >= 5 ? "L" : "#";
                    break;
                default:
                    throw Error("Unknown character")
            }
        }
    }

    return newSeats
}

export const day11_step_1 = () => {
    let seats = readInput(inputFile)
    let newSeats = updateSeats(seats);

    while (!equals(seats, newSeats)) {
        seats = newSeats
        newSeats = updateSeats(seats)
    }
    
    const occupiedSeats = newSeats.map((row) => (row.match(/#/g) || []).length).reduce((a, b) => a + b);
    console.log('Step 1');
    console.log('------');
    console.log(`Occupied seats: ${occupiedSeats}`) // 2346 is correct
}

export const day11_step_2 = () => {
    let seats = readInput(inputFile);
    let adjacents = findClosestAdjacents(seats)
    let newSeats = updateSeats2(seats, adjacents)

    while (!equals(seats, newSeats)) {
        seats = newSeats
        newSeats = updateSeats2(seats, adjacents)
    }
    
    const occupiedSeats = newSeats.map((row) => (row.match(/#/g) || []).length).reduce((a, b) => a + b);
    console.log('Step 2');
    console.log('------');
    console.log(`Occupied seats: ${occupiedSeats}`) // 2111 is correct
}