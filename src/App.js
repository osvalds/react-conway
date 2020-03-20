import React, {useRef, Fragment, useEffect, useState} from 'react';
import useInterval from "./hooks/useInterval";
import './App.scss';
import useWindowSize from "./hooks/useWindowSize";
import useBoard, {applyBrush, handleBoardDimensionChange} from "./hooks/useBoard";
import {indexToCoord, coordToIndex} from "./util"
import {BrushSelector, getBrush} from "./components/Brushes";

const INTERVAL = 50;
const CELLSIZE = 15;
const gridGap = 1;

function CanvasBoard({board, windowSize, cols, rows, setBoard, setCols, setRows, brush}) {
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

        if (cols !== newCols || rows !== newRows) {
            setBoard(handleBoardDimensionChange(board, cols, rows, newCols, newRows));
            setRows(newRows);
            setCols(newCols);
        }
    });

    useEffect(() => {
        clearCanvas(canvasRef);
        for (let i = 0, boardLength = board.length; i < boardLength; i++) {
            drawCell(canvasRef, board[i], i, cols)
        }
    });

    const clickCoord = (eX, eY) => {
        const x = Math.floor(eX / (CELLSIZE + gridGap));
        const y = Math.floor(eY / (CELLSIZE + gridGap));
        return {x, y};
    };

    const clickCoordToIndex = (eX, eY, cols) => {
        return coordToIndex(clickCoord(eX, eY, cols), cols)
    };

    return (
        <canvas
            ref={canvasRef}
            width={windowSize.width}
            height={windowSize.height}
            onClick={e => {
                const index = clickCoordToIndex(e.pageX, e.pageY, cols);
                const cCoord = clickCoord(e.pageX, e.pageY);
                setLastMouseDownIndex(index);
                setBoard(applyBrush(cCoord, board, cols, rows, brush))
            }}
            onMouseMove={(e) => {
                if (e.buttons === 1 || e.buttons === 3) {
                    let currentIndex = clickCoordToIndex(e.pageX, e.pageY, cols);
                    if (currentIndex !== lastMouseDownIndex) {
                        const cCoord = clickCoord(e.pageX, e.pageY);
                        setLastMouseDownIndex(currentIndex);
                        setBoard(applyBrush(cCoord, board, cols, rows, brush))
                    }
                }
            }}
            onMouseUp={e => {
                setLastMouseDownIndex(null)
            }}
        />
    );
}

function BoardWrapper({cols, rows, seed, windowSize, setRows, setCols}) {

    const [board, setBoard, isRunning, setIsRunning, advanceBoard] = useBoard(rows, cols, seed);
    const [selectedBrush, setSelectedBrush] = useState(getBrush("glider"));

    useInterval(advanceBoard, isRunning ? INTERVAL : null);

    return (
        <Fragment>
            <CanvasBoard board={board}
                         brush={selectedBrush}
                         setBoard={setBoard}
                         windowSize={windowSize}
                         cols={cols}
                         setCols={setCols}
                         setRows={setRows}
                         rows={rows}/>
            <div className="controls">
                <button onClick={advanceBoard}>
                    Neeeext!
                </button>
                <button onClick={e => setIsRunning(!isRunning)}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button onClick={() => {
                    setIsRunning(false);
                    setBoard([...board].fill(0))
                }}>
                    Reset
                </button>
                <BrushSelector onChange={e => setSelectedBrush(getBrush((e.target.value)))}
                               selectedBrush={selectedBrush}/>
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
        <BoardWrapper rows={rows} cols={cols} seed={seed} windowSize={windowSize} setRows={setRows} setCols={setCols}/>
    );
}

export default App;
