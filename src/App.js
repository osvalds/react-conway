import React, {useEffect, useState} from 'react';
import useInterval from "./useInterval";
import './App.scss';

const [ROWS, COLS] = [20, 20];
const INTERVAL = 100;

function Cell({cell, coord, toggleCell}) {
    return (
        <div
            onClick={e => toggleCell(coord)}
            className="cell">
            {cell}
        </div>
    )
}

function Row({row, y, toggleCell}) {
    return (
        <div className="row">
            {row.map((cell, index) => <Cell key={index} cell={cell} coord={{x: index, y: y}} toggleCell={toggleCell}/>)}
        </div>
    )
}
function mod(x, m) {
    return (x % m + m) % m;
}

// this will let wrap the neighbor detection to wrap around
const calcCoord = (y, yd, MAX) => {
    return mod(y + yd, MAX);
};

const countNeighbors = ({x, y}, board) => {
    const xDiff = [-1, 0, 1];
    const yDiff = [-1, 0, 1];
    // create cartesian product of neighbor x and y potential coordinates
    const fullCartesianProduct = [].concat(...xDiff.map(x => yDiff.map(y => [x, y])));
    // filter out [0, 0] as it's the cells position
    const cartesianProduct = fullCartesianProduct.filter(([x, y]) => !(x === 0 && y === 0))

    let neighborCount = 0;

    for (let [xd, yd] of cartesianProduct) {
        if (board[calcCoord(y, yd, ROWS)][calcCoord(x, xd, COLS)] === 1) {
            neighborCount += 1;
        }
    }
    return neighborCount;
};

function App() {
    let startBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));

    const [board, setBoard] = useState(startBoard);
    const [isRunning, setIsRunning] = useState(false);

    let toggleCell = (coord) => {
        const {x, y} = coord;
        let newBoard = [...board].map(arr => arr.slice(0));
        newBoard[y][x] = board[y][x] === 0 ? 1 : 0;
        countNeighbors(coord, board);
        setBoard(newBoard);
    };

    let advanceBoard = () => {
        const currentBoard = [...board].map(arr => arr.slice(0));
        let newBoard = [...board].map(arr => arr.slice(0));

        for (let y = 0; y < currentBoard.length; y++) {
            for (let x = 0; x < currentBoard[y].length; x++) {
                const neighborCount = countNeighbors({x, y}, currentBoard)

                if (currentBoard[y][x] === 1) {
                    if (neighborCount < 2 || neighborCount > 3) {
                        newBoard[y][x] = 0;
                    }
                } else {
                    if (neighborCount === 3) {
                        newBoard[y][x] = 1;
                    }
                }
            }
        }
        setBoard(newBoard);
    };

    useInterval(advanceBoard, isRunning ? INTERVAL : null);

    return (
        <div className="board">
            {board.map((row, index) => <Row key={index} row={row} y={index} toggleCell={toggleCell}/>)}
            <button onClick={advanceBoard}>
                Neeeext!
            </button>
            <button onClick={e => setIsRunning(!isRunning)}>
                {isRunning ? "Stop" : "Start"}
            </button>
        </div>
    );
}

export default App;
