import React, {useState} from 'react';
import useInterval from "./useInterval";
import './App.scss';
import useWindowSize from "./useWindowSize";

const INTERVAL = 100;

function Cell({cell, coord, toggleCell}) {
    return (
        <div
            onClick={e => toggleCell(coord)}
            onMouseOver={e => {
                if (e.buttons === 1 || e.buttons === 3) {
                    toggleCell(coord)
                }
            }}
            className={`cell cell--${cell}`}>
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

const countNeighbors = ({x, y}, board, ROWS, COLS) => {
    // hard coded for perf reasons
    const neighborDiff = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    let neighborCount = 0;

    for (let [xd, yd] of neighborDiff) {
        if (board[calcCoord(y, yd, ROWS)][calcCoord(x, xd, COLS)] === 1) {
            neighborCount += 1;
        }
    }
    return neighborCount;
};

const isDesolate = (board) => {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === 1) {
                return false;
            }
        }
    }
    return true;
};

function App() {

    const windowSize = useWindowSize();
    let ROWS = Math.floor((windowSize.height + 1) / (20 + 1));
    let COLS = Math.floor((windowSize.width + 1) / (20 + 1));
    let startBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));

    const [board, setBoard] = useState(startBoard);
    const [isRunning, setIsRunning] = useState(false);

    let toggleCell = (coord) => {
        const {x, y} = coord;
        let newBoard = [...board].map(arr => arr.slice(0));
        newBoard[y][x] = board[y][x] === 0 ? 1 : 0;
        setBoard(newBoard);
    };

    let advanceBoard = () => {
        // const currentBoard = [...board].map(arr => arr.slice(0));
        let newBoard = [...board].map(arr => arr.slice(0));

        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                const neighborCount = countNeighbors({x, y}, board, ROWS, COLS);

                if (board[y][x] === 1) {
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
        // console.log("is desolate:", isDesolate(newBoard))

        setBoard(newBoard);
        // if (isDesolate(newBoard)) {
        //     setIsRunning(false);
        // }
    };

    useInterval(advanceBoard, isRunning ? INTERVAL : null);

    return (
        <div className="board">
            {board.map((row, index) => <Row key={index} row={row} y={index} toggleCell={toggleCell}/>)}
            <div className="board__controls">
                <button onClick={advanceBoard}>
                    Neeeext!
                </button>
                <button onClick={e => setIsRunning(!isRunning)}>
                    {isRunning ? "Stop" : "Start"}
                </button>
            </div>
        </div>
    );
}

export default App;
