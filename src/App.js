import React, {useRef, Fragment, useEffect, useState, useCallback} from 'react';
import useInterval from "./hooks/useInterval";
import './App.scss';
import useWindowSize from "./hooks/useWindowSize";
import useBoard, {
    applyBrush,
    getBoardWithAppliedBrushAndPaintedIndices,
    handleBoardDimensionChange
} from "./hooks/useBoard";
import {indexToCoord, coordToIndex} from "./util"
import {brushDistanceVecFromCenter, getBrush, rotateBrush90deg} from "./components/Brushes";
import Controls from "./components/Controls";

const INTERVAL = 50;
const CELLSIZE = 15;
const gridGap = 1;
let lastHoverCoord;

const mousePosToCoord = (eX, eY) => {
    const x = Math.floor(eX / (CELLSIZE + gridGap));
    const y = Math.floor(eY / (CELLSIZE + gridGap));
    return {x, y};
};

const intersection = (setA, setB) => {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
};

function CanvasBoard({board, windowSize, cols, rows, setBoard, setCols, setRows, brush, setHoverBoard, hoverBoard, seed, lastPaintedHoverIndices, lastPaintedIndices, setLastPaintedHoverIndices, setLastPaintedIndices}) {
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
        // paints the cell only if it has beeb set to be hovered
        if (cell === 1 && lastPaintedHoverIndices.has(index)) {
            const {x, y} = indexToCoord(index, cols);
            ctx.fillStyle = lastPaintedIndices.has(index) ? "rgb(200,87,125)" : "rgba(238, 238, 238, 0.3)";
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
            drawCell(ctx, board[i], i, cols);
            drawHoverCell(ctx, hoverBoard[i], i, cols)
        }
    });

    const mouseToIndex = (eX, eY, cols) => {
        return coordToIndex(mousePosToCoord(eX, eY, cols), cols)
    };

    return (
        <canvas
            ref={canvasRef}
            width={windowSize.width}
            height={windowSize.height}
            onClick={e => {
                if (intersection(lastPaintedHoverIndices, lastPaintedIndices).size === 0) {
                    const cCoord = mousePosToCoord(e.pageX, e.pageY);
                    const {nBoard, paintedIndices} = getBoardWithAppliedBrushAndPaintedIndices(cCoord, board, cols, rows, brush)

                    setLastPaintedIndices(paintedIndices);
                    setBoard(nBoard)
                }
            }}
            onMouseLeave={() => setHoverBoard(seed)}
            onTouchMove={(e) => {
                // lastHoverCoord = mousePosToCoord(e.touches[0].pageX, e.touches[0].pageY);
                // setHoverBoard(applyBrush(lastHoverCoord, seed, cols, rows, brush));
                // let currentIndex = mouseToIndex(e.touches[0].pageX, e.touches[0].pageY, cols);
                // if (currentIndex !== lastMouseDownIndex) {
                //     setLastMouseDownIndex(currentIndex);
                //     setBoard(applyBrush(lastHoverCoord, board, cols, rows, brush));
                // }
            }}
            onMouseMove={(e) => {
                console.log("mosuemove", e.detail)
                lastHoverCoord = mousePosToCoord(e.pageX, e.pageY);

                const {nBoard, paintedIndices} = getBoardWithAppliedBrushAndPaintedIndices(lastHoverCoord, board, cols, rows, brush);
                setLastPaintedHoverIndices(paintedIndices);
                setHoverBoard(nBoard);

                if (e.buttons === 1 || e.buttons === 3) {
                    if (intersection(lastPaintedHoverIndices, lastPaintedIndices).size === 0) {
                        const {nBoard, paintedIndices} = getBoardWithAppliedBrushAndPaintedIndices(lastHoverCoord, board, cols, rows, brush)
                        setLastPaintedIndices(paintedIndices);
                        setBoard(nBoard)
                    }
                }
            }}
        />
    );
}

function BoardWrapper({cols, rows, seed, windowSize, setRows, setCols, defaultBrush}) {
    const [hoverBoard, setHoverBoard] = useBoard(rows, cols, seed);
    const [board, setBoard, isRunning, setIsRunning, advanceBoard] = useBoard(rows, cols, seed);
    const [selectedBrush, setSelectedBrush] = useState(defaultBrush);
    const [lastPaintedIndices, setLastPaintedIndices] = useState(new Set());
    const [lastPaintedHoverIndices, setLastPaintedHoverIndices] = useState(new Set());

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
            setSelectedBrushWrapper(rotateBrush90deg(selectedBrush));
            const {nBoard, paintedIndices} = getBoardWithAppliedBrushAndPaintedIndices(lastHoverCoord, seed, cols, rows, rotateBrush90deg(selectedBrush));
            setLastPaintedHoverIndices(paintedIndices);
            setHoverBoard(nBoard);
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
                         lastPaintedIndices={lastPaintedIndices}
                         setLastPaintedIndices={setLastPaintedIndices}
                         lastPaintedHoverIndices={lastPaintedHoverIndices}
                         setLastPaintedHoverIndices={setLastPaintedHoverIndices}
            />
            <Controls advanceBoard={advanceBoard}
                      toggleIsRunning={toggleIsRunning}
                      isRunning={isRunning}
                      setIsRunning={setIsRunning}
                      setBoard={setBoard}
                      board={board}
                      touchHoverClear={touchHoverClear}
                      setSelectedBrushWrapper={setSelectedBrushWrapper}
                      selectedBrush={selectedBrush}
                      setLastPaintedIndices={setLastPaintedIndices}/>
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
