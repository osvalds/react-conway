import React from 'react';
import useInterval from "./useInterval";
import './App.scss';
import useWindowSize from "./useWindowSize";
import useBoard from "./useBoard";

const INTERVAL = 100;

function Cell({index, cell, toggleCell}) {
    return (
        <div
            onClick={() => toggleCell(index)}
            onMouseEnter={(e) => {
                if (e.buttons === 1 || e.buttons === 3) {
                    toggleCell(index)
                }
            }}
            className={`cell cell--${cell}`}>
        </div>
    )
}

function Board({board, toggleCell}) {
    return (
        <div className="board">
            {board.map((cell, index) => {
                return (
                    <Cell key={index} index={index} cell={cell} toggleCell={toggleCell}/>
                )
            })}
        </div>
    )
}

function BoardWrapper({COLS, ROWS, seed}) {

    const [board, setBoard, isRunning, setIsRunning, toggleCell, advanceBoard] = useBoard(ROWS, COLS, seed);

    useInterval(advanceBoard, isRunning ? INTERVAL : null);

    return (
        <div>
            <Board board={board} COLS={COLS} toggleCell={toggleCell}/>

            <div className="board__controls">
                <button onClick={advanceBoard}>
                    Neeeext!
                </button>
                <button onClick={e => setIsRunning(!isRunning)}>
                    {isRunning ? "Stop" : "Start"}
                </button>
            </div>
        </div>
    )
}

function App() {
    const windowSize = useWindowSize();
    const gridGap = 1;
    let ROWS = Math.floor((windowSize.height + gridGap) / (20 + gridGap));
    let COLS = Math.floor((windowSize.width + gridGap) / (20 + gridGap));

    const seed = Array(ROWS * COLS).fill(0);

    return (
        <BoardWrapper ROWS={ROWS} COLS={COLS} seed={seed}/>
    );
}

export default App;
