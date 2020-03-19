import {useState} from "react";
import {coordToIndex, indexToCoord, isDesolate} from "./util"

const mod = (x, m) => {
    return (x % m + m) % m;
};

// this will let wrap the neighbor detection to wrap around
const calcCoord = (y, yd, MAX) => {
    return mod(y + yd, MAX);
};

const countNeighbors = ({x, y}, board, COLS, ROWS) => {
    // hard coded for perf reasons
    const neighborDiff = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    let neighborCount = 0;

    for (let [xd, yd] of neighborDiff) {
        const xCoord2D = calcCoord(x, xd, COLS);
        const yCoord2D = calcCoord(y, yd, ROWS);

        if (board[coordToIndex({x: xCoord2D, y: yCoord2D}, COLS)] === 1) {
            neighborCount += 1;
        }
    }
    return neighborCount;
};

export default function useBoard(rows, cols, seed) {
    const [board, setBoard] = useState(seed);
    const [isRunning, setIsRunning] = useState(false);

    let toggleCell = (clickedIndex) => {
        let newBoard = [...board];
        newBoard[clickedIndex] = board[clickedIndex] === 0 ? 1 : 0;
        setBoard(newBoard);
    };

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

    return [board, setBoard, isRunning, setIsRunning, toggleCell, advanceBoard]
}
