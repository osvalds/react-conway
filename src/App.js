import React, {useRef, Fragment, useEffect, useState} from 'react';
import useInterval from "./hooks/useInterval";
import './App.scss';
import useWindowSize from "./hooks/useWindowSize";
import useBoard from "./hooks/useBoard";
import {indexToCoord, coordToIndex} from "./util"

const INTERVAL = 50;
const CELLSIZE = 20;
const gridGap = 1;

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

function CanvasBoard({board, toggleCell, windowSize, cols, rows}) {
    const canvasRef = useRef(null);
    const [lastMouseDownIndex, setLastMouseDownIndex] = useState(null);

    const clearCanvas = (canvas) => {
        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    };

    const drawCell = (canvas, cell, index, cols) => {
        const ctx = canvas.current.getContext("2d");
        const {x, y} = indexToCoord(index, cols);
        ctx.fillStyle = cell === 1 ? "#00adb5" : "#393e46";
        ctx.fillRect(x * CELLSIZE + x, y * CELLSIZE + y, CELLSIZE, CELLSIZE)
    };

    useEffect(() => {
        const newRows = Math.floor((windowSize.height + gridGap) / (CELLSIZE + gridGap));
        const newCols = Math.floor((windowSize.width + gridGap) / (CELLSIZE + gridGap));

        console.log(rows, cols)
        if (cols !== newCols || rows !== newRows) {

            console.log("boardneeds change")
        }
    }, [windowSize, cols, rows]);

    useEffect(() => {
        clearCanvas(canvasRef);
        for (let i = 0, boardLength = board.length; i < boardLength; i++) {
            drawCell(canvasRef, board[i], i, cols)
        }
    });

    const clickCoordToIndex = (eX, eY, cols) => {
        const cX = Math.floor(eX / (CELLSIZE + gridGap));
        const cY = Math.floor(eY / (CELLSIZE + gridGap));
        return coordToIndex({x: cX, y: cY}, cols)
    };

    return (
        <canvas
            ref={canvasRef}
            width={windowSize.width}
            height={windowSize.height}
            onMouseDown={e => {
                const index = clickCoordToIndex(e.pageX, e.pageY, cols)
                setLastMouseDownIndex(index);
                toggleCell(index);
            }}
            onMouseMove={(e) => {
                if (e.buttons === 1 || e.buttons === 3) {
                    let currentIndex = clickCoordToIndex(e.pageX, e.pageY, cols);
                    if (currentIndex !== lastMouseDownIndex) {
                        setLastMouseDownIndex(currentIndex);
                        toggleCell(currentIndex)
                    }
                }
            }}
            onMouseUp={e => {
                setLastMouseDownIndex(null)
            }}
        />
    );
}

function BoardWrapper({COLS, ROWS, seed, windowSize}) {

    const [board, setBoard, isRunning, setIsRunning, toggleCell, advanceBoard] = useBoard(ROWS, COLS, seed);

    useInterval(advanceBoard, isRunning ? INTERVAL : null);

    return (
        <Fragment>
            {/*<Board board={board} COLS={COLS} toggleCell={toggleCell}/>*/}
            <CanvasBoard board={board} toggleCell={toggleCell} windowSize={windowSize} cols={COLS} rows={ROWS}/>
            <div className="board__controls">
                <button onClick={advanceBoard}>
                    Neeeext!
                </button>
                <button onClick={e => setIsRunning(!isRunning)}>
                    {isRunning ? "Stop" : "Start"}
                </button>
            </div>
        </Fragment>
    )
}

function App() {
    const windowSize = useWindowSize();
    const [rows, setRows] = useState(Math.floor((windowSize.height + gridGap) / (CELLSIZE + gridGap)));
    const [cols, setCols] = useState(Math.floor((windowSize.width + gridGap) / (CELLSIZE + gridGap)));
    const seed = Array(rows * cols).fill(0);

    return (
        <BoardWrapper ROWS={rows} COLS={cols} seed={seed} windowSize={windowSize}/>
    );
}

export default App;
