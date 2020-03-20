import React, {useRef, Fragment, useEffect, useState, useCallback} from 'react';
import useInterval from "./hooks/useInterval";
import './App.scss';
import useWindowSize from "./hooks/useWindowSize";
import useBoard, {applyBrush, handleBoardDimensionChange} from "./hooks/useBoard";
import {indexToCoord, coordToIndex} from "./util"
import {brushDistanceVecFromCenter, BrushSelector, getBrush, rotateBrush90deg} from "./components/Brushes";
import Controls from "./components/Controls";

const INTERVAL = 50;
const CELLSIZE = 15;
const gridGap = 1;
let lastHoverCoord;

const clickCoord = (eX, eY) => {
    const x = Math.floor(eX / (CELLSIZE + gridGap));
    const y = Math.floor(eY / (CELLSIZE + gridGap));
    return {x, y};
};

function CanvasBoard({board, windowSize, cols, rows, setBoard, setCols, setRows, brush, setHoverBoard, hoverBoard, seed}) {
    const canvasRef = useRef(null);
    const [lastMouseDownIndex, setLastMouseDownIndex] = useState(null);

    const clearCanvas = (ctx) => {
        ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    };

    const drawCell = (ctx, cell, index, cols) => {
        const {x, y} = indexToCoord(index, cols);
        ctx.fillStyle = cell === 1 ? "#00adb5" : "#393e46";
        ctx.fillRect(x * CELLSIZE + x, y * CELLSIZE + y, CELLSIZE, CELLSIZE)
    };

    const drawHoverCell = (ctx, cell, index, cols) => {
        // draws only the alive cell in the template
        if (cell === 1) {
            const {x, y} = indexToCoord(index, cols);
            ctx.fillStyle = "rgba(238, 238, 238, 0.3)";
            ctx.fillRect(x * CELLSIZE + x, y * CELLSIZE + y, CELLSIZE, CELLSIZE)
        }
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
        const ctx = canvasRef.current.getContext("2d");
        clearCanvas(ctx);
        for (let i = 0, boardLength = board.length; i < boardLength; i++) {
            drawCell(ctx, board[i], i, cols)
            drawHoverCell(ctx, hoverBoard[i], i, cols)
        }
    });

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
            onMouseLeave={() => setHoverBoard(seed)}
            onTouchMove={(e) => {
                lastHoverCoord = clickCoord(e.touches[0].pageX, e.touches[0].pageY);
                setHoverBoard(applyBrush(lastHoverCoord, seed, cols, rows, brush));
                let currentIndex = clickCoordToIndex(e.touches[0].pageX, e.touches[0].pageY, cols);
                if (currentIndex !== lastMouseDownIndex) {
                    setLastMouseDownIndex(currentIndex);
                    setBoard(applyBrush(lastHoverCoord, board, cols, rows, brush));
                }
            }}
            onMouseMove={(e) => {
                lastHoverCoord = clickCoord(e.pageX, e.pageY);
                setHoverBoard(applyBrush(lastHoverCoord, seed, cols, rows, brush));

                if (e.buttons === 1 || e.buttons === 3) {
                    let currentIndex = clickCoordToIndex(e.pageX, e.pageY, cols);
                    if (currentIndex !== lastMouseDownIndex) {
                        setLastMouseDownIndex(currentIndex);
                        setBoard(applyBrush(lastHoverCoord, board, cols, rows, brush));
                    }
                }
            }}
            onMouseUp={e => {
                setLastMouseDownIndex(null)
            }}
        />
    );
}

function BoardWrapper({cols, rows, seed, windowSize, setRows, setCols, defaultBrush}) {
    const [hoverBoard, setHoverBoard] = useBoard(rows, cols, seed);
    const [board, setBoard, isRunning, setIsRunning, advanceBoard] = useBoard(rows, cols, seed);
    const [selectedBrush, setSelectedBrush] = useState(defaultBrush);

    useInterval(advanceBoard, isRunning ? INTERVAL : null);

    const setSelectedBrushWrapper = useCallback((newBrush) => {
        //Caches the distance vector, otherwise it is calculated on every render
        newBrush.distanceVec = brushDistanceVecFromCenter(newBrush);
        setSelectedBrush(newBrush);
    }, [setSelectedBrush]);

    const toggleIsRunning = useCallback((event) => {
        if (event.keyCode === 32 || event.type === "click") {
            setIsRunning(!isRunning);
        }
    }, [isRunning, setIsRunning]);

    const touchHoverClear = useCallback(() => {
        setHoverBoard(seed);
    }, [setHoverBoard, seed]);

    useEffect(() => {
        document.addEventListener("keydown", toggleIsRunning, false);
        return () => {
            document.removeEventListener("keydown", toggleIsRunning, false)
        };
    }, [toggleIsRunning]);

    const memoRotateBrush = useCallback((event) => {
        if (event.code === "KeyR") {
            setSelectedBrushWrapper(rotateBrush90deg(selectedBrush))
            setHoverBoard(applyBrush(lastHoverCoord, seed, cols, rows, rotateBrush90deg(selectedBrush)));
        }
    }, [setSelectedBrushWrapper, selectedBrush, seed, cols, rows, setHoverBoard]);

    useEffect(() => {
        document.addEventListener("keydown", memoRotateBrush, false);
        return () => {
            document.removeEventListener("keydown", memoRotateBrush, false)
        };
    }, [memoRotateBrush]);

    return (
        <Fragment>
            <CanvasBoard board={board}
                         brush={selectedBrush}
                         setBoard={setBoard}
                         windowSize={windowSize}
                         cols={cols}
                         setCols={setCols}
                         setRows={setRows}
                         rows={rows}
                         seed={seed}
                         setHoverBoard={setHoverBoard}
                         hoverBoard={hoverBoard}
            />
            <Controls advanceBoard={advanceBoard}
                      toggleIsRunning={toggleIsRunning}
                      isRunning={isRunning}
                      setIsRunning={setIsRunning}
                      setBoard={setBoard}
                      board={board}
                      touchHoverClear={touchHoverClear}
                      setSelectedBrushWrapper={setSelectedBrushWrapper}
                      selectedBrush={selectedBrush}/>
        </Fragment>
    )
}

function App() {
    const windowSize = useWindowSize();
    const defaultBrush = getBrush("glider");
    // defaultBrush.distanceVec = brushDistanceVecFromCenter(defaultBrush);
    const [rows, setRows] = useState(Math.floor((windowSize.height + gridGap) / (CELLSIZE + gridGap)));
    const [cols, setCols] = useState(Math.floor((windowSize.width + gridGap) / (CELLSIZE + gridGap)));
    const seed = Array(rows * cols).fill(0);

    return (
        <BoardWrapper rows={rows} cols={cols} seed={seed} windowSize={windowSize} setRows={setRows} setCols={setCols}
                      defaultBrush={defaultBrush}/>
    );
}

export default App;
