import React, {useCallback, useEffect} from "react";
import {BrushSelector, getBrush, rotateBrush90deg} from "./Brushes";
import {ReactComponent as Logo} from "./gh.svg"

export default function Controls({advanceBoard, toggleIsRunning, isRunning, setIsRunning, setBoard, board, setSelectedBrushWrapper, selectedBrush, touchHoverClear, setLastPaintedIndices, brushes, brushesLoaded}) {

    const memoBoardReset = useCallback((event) => {
        if (event.code === "KeyE" || event.type === "click") {
            setIsRunning(false);
            setBoard([...board].fill(0))
            setLastPaintedIndices(new Set())
        }
    }, [setIsRunning, setBoard, board, setLastPaintedIndices]);

    useEffect(() => {
        document.addEventListener("keydown", memoBoardReset, false);
        return () => {
            document.removeEventListener("keydown", memoBoardReset, false)
        };
    }, [memoBoardReset]);

    const memoNext = useCallback((event) => {
        if (event.code === "KeyW" || event.type === "click") {
            setLastPaintedIndices(new Set());
            setIsRunning(false);
            advanceBoard();
        }
    }, [setIsRunning, advanceBoard, setLastPaintedIndices]);

    useEffect(() => {
        document.addEventListener("keydown", memoNext, false);
        return () => {
            document.removeEventListener("keydown", memoNext, false)
        };
    }, [memoNext]);

    return (
        <div className="controls">
            <button
                className="button"
                onTouchStart={touchHoverClear}
                onClick={() => {
                    setIsRunning(false);
                    advanceBoard()
                }}>
                Next <span className="button__shortcut">[w]</span>
            </button>
            <button
                className="button"
                onTouchStart={touchHoverClear}
                onClick={toggleIsRunning}>
                {isRunning ? "Stop " : "Start "}
                <span className="button__shortcut">[space]</span>
            </button>
            <button
                className="button"
                onTouchStart={touchHoverClear}
                onClick={memoBoardReset}>
                Empty
                <span className="button__shortcut"> [e]</span>
            </button>
            <button
                className="button button--mobile"
                onClick={() => {
                    setSelectedBrushWrapper(rotateBrush90deg(selectedBrush))
                }}>
                Rotate
            </button>
            <BrushSelector
                onChange={e => {
                    setSelectedBrushWrapper(getBrush(e.target.value, brushes))
                    e.target.blur()
                }}
                selectedBrush={selectedBrush}
                brushesLoaded={brushesLoaded}
                brushes={brushes}
            />
            <span className="controls__hint">
                [right-click]
            </span>
            <button
                className="button button--desktop"
                onClick={() => {
                    setSelectedBrushWrapper(rotateBrush90deg(selectedBrush))
                }}>
                Rotate 90deg
                <span className="button__shortcut"> [r]</span>
            </button>
            <a className="controls__repo"
               target="_blank"
               rel="noopener noreferrer"
               href="https://github.com/osvalds/react-conway">
                <Logo/>
            </a>

        </div>
    );
}
