import { readInput } from '../helpers/input';

const inputFile = `${__dirname}/input.txt`;
const totalRows = 128;
const totalColumns = 8;

const findRow = (boardingPass: string): number => {
    let rows: number[] = [];
    for (let i = 0; i < totalRows; i++) {
        rows.push(i);
    }


    const rowId = boardingPass.substr(0, 7);
    for (let i = 0; i < rowId.length; i++) {
        const half = Math.ceil(rows.length / 2);
        switch (rowId[i]) {
            case 'F':
                rows = rows.splice(0, half);
                break;
            case 'B':
                rows = rows.splice(-half);
                break;
        }
    }
    return rows[0];
}

const findColumn = (boardingPass: string): number => {
    let columns: number[] = [];
    for (let i = 0; i < totalColumns; i++) {
        columns.push(i);
    }

    const rowId = boardingPass.substr(7, 3);
    for (let i = 0; i < rowId.length; i++) {
        const half = Math.ceil(columns.length / 2);
        switch (rowId[i]) {
            case 'L':
                columns = columns.splice(0, half);
                break;
            case 'R':
                columns = columns.splice(-half);
                break;
        }
    }
    return columns[0];
}

const getSeatId = (row: number, col: number): number => {
    return row * 8 + col;
}

export const day5_step_1 = () => {
    const boardingPasses = readInput(inputFile)
    let maxSeatId = 0;
    for (let i = 0; i < boardingPasses.length; i++) {
        const row = findRow(boardingPasses[i])
        const column = findColumn(boardingPasses[i])
        const seatId = getSeatId(row, column);
        if (seatId > maxSeatId) {
            maxSeatId = seatId
        }
    }
    console.log('Step 1');
    console.log('------');
    console.log(`Max seat ID: ${maxSeatId}`); // 980
}

export const day5_step_2 = () => {
    const boardingPasses = readInput(inputFile)
    
    
    
    let allColumns: number[] = [];
    for (let i = 0; i < totalColumns; i++) {
        allColumns.push(i);
    }

    let filledSeats: number[][] = []
    for (let i = 0; i < boardingPasses.length; i++) {
        const row = findRow(boardingPasses[i])
        const column = findColumn(boardingPasses[i])

        if (filledSeats[row] === undefined) {
            filledSeats[row] = [];
        }

        filledSeats[row].push(column)
        filledSeats[row].sort();
    }

    let allSeatIds: number[] = []
    let missingSeats: number[] = []

    filledSeats.forEach((cols, myRow) => {
        cols.forEach((col) => {
            allSeatIds.push(getSeatId(myRow, col));
        });

        if (cols.length < 8) {
            const myCol = allColumns.filter(col => cols.indexOf(col) === -1)[0]
            missingSeats.push(getSeatId(myRow, myCol));
        }
    })

    const [ mySeatId ] = missingSeats.filter((seatId) => {
        return allSeatIds.includes(seatId - 1) && allSeatIds.includes(seatId + 1);
    })

    console.log('Step 2');
    console.log('------');
    console.log(`My seat ID: ${mySeatId}`); // 607
}