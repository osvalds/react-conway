import {useState} from "react";
import {calcNeighborCoordinate, coordToIndex, indexToCoord, isDesolate} from "../util"

export const addCols = (board, cCols, cRows, nCols) => {
    const colsToAdd = nCols - cCols;

    for (let i = 1; i <= cRows; i++) {
        const newColsAdded = (i - 1) * colsToAdd;
        const currentPosition = i * cCols;

        board.splice(newColsAdded + currentPosition, 0, ...Array(colsToAdd).fill(0))
    }

    return board;
};

export const removeCols = (board, cCols, cRows, nCols) => {
    const colsToRemove = Math.abs(nCols - cCols);

    for (let i = 1; i <= cRows; i++) {
        const currentPosition = i * nCols;

        board.splice(currentPosition, colsToRemove)
    }

    return board;
};

export const addRows = (board, cCols, cRows, nRows) => {
    const rowsToAdd = nRows - cRows;
    return [...board, ...Array(rowsToAdd * cCols).fill(0)]
};

export const removeRows = (board, cCols, cRows, nRows) => {
    return board.slice(0, cCols * nRows)
};

export const handleBoardDimensionChange = (board, cCols, cRows, nCols, nRows) => {
    const colDiff = nCols - cCols;
    const rowDiff = nRows - cRows;

    let nBoard = [...board];

    if (colDiff > 0) {
        nBoard = addCols(board, cCols, cRows, nCols);
    } else if (colDiff < 0) {
        nBoard = removeCols(board, cCols, cRows, nCols);
    }

    if (rowDiff > 0) {
        nBoard = addRows(nBoard, nCols, cRows, nRows);
    } else if (rowDiff < 0) {
        nBoard = removeRows(nBoard, nCols, cRows, nRows);
    }

    return nBoard;
};

export const applyBrush = ({x, y}, board, bCols, bRows, brush) => {
    // cache the distance vector
    const brushDistanceVec = brush.distanceVec;

    let nBoard = [...board];

    for (let i = 0, l = brushDistanceVec.length; i < l; i++) {
        const [xd, yd] = brushDistanceVec[i];

        const boardIndex = coordToIndex({
            x: calcNeighborCoordinate(x, xd, bCols),
            y: calcNeighborCoordinate(y, yd, bRows)
        }, bCols);

        nBoard[boardIndex] = brush.template[i];
    }

    return nBoard;
};

const countNeighbors = ({x, y}, board, COLS, ROWS) => {
    // hard coded for perf reasons
    const neighborDiff = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    let neighborCount = 0;

    for (let [xd, yd] of neighborDiff) {
        const xCoord2D = calcNeighborCoordinate(x, xd, COLS);
        const yCoord2D = calcNeighborCoordinate(y, yd, ROWS);

        if (board[coordToIndex({x: xCoord2D, y: yCoord2D}, COLS)] === 1) {
            neighborCount += 1;
        }
    }
    return neighborCount;
};

export default function useBoard(rows, cols, seed) {
    const [board, setBoard] = useState(seed);
    const [isRunning, setIsRunning] = useState(false);

    const advanceBoard = () => {
        let newBoard = [...board];

        for (let i = 0, boardLength = board.length; i < boardLength; i++) {
            const coord = indexToCoord(i, cols);
            const neighborCount = countNeighbors(coord, board, cols, rows);

            if (board[i] === 1) {
                if (neighborCount < 2 || neighborCount > 3) {
                    newBoard[i] = 0;
                }
            } else {
                if (neighborCount === 3) {
                    newBoard[i] = 1;
                }
            }
        }

        setBoard(newBoard);

        if (isDesolate(newBoard)) {
            setIsRunning(false);
        }
    };

    return [board, setBoard, isRunning, setIsRunning, advanceBoard]
}
