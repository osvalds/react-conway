import React, {useCallback, useEffect} from "react";
import {BrushSelector, getBrush, rotateBrush90deg} from "./Brushes";

export default function Controls({advanceBoard, toggleIsRunning, isRunning, setIsRunning, setBoard, board, setSelectedBrushWrapper, selectedBrush}) {

    const memoBoardReset = useCallback((event) => {
        if (event.code === "KeyE") {
            setIsRunning(false);
            setBoard([...board].fill(0))
        }
    }, [setIsRunning, setBoard, board]);

    useEffect(() => {
        document.addEventListener("keydown", memoBoardReset, false);
        return () => {
            document.removeEventListener("keydown", memoBoardReset, false)
        };
    }, [memoBoardReset]);


    const memoNext = useCallback((event) => {
        if (event.code === "KeyW") {
            setIsRunning(false);
            advanceBoard();
        }
    }, [setIsRunning, advanceBoard]);

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
                onClick={() => {
                    setIsRunning(false);
                    advanceBoard()
                }}>
                Next [<span>⇧</span>+w]
            </button>
            <button
                className="button"
                onClick={toggleIsRunning}>
                {isRunning ? "Stop [space]" : "Start [space]"}
            </button>
            <button
                className="button"
                onClick={memoBoardReset}>
                Reset [<span>⇧</span>+e]
            </button>
            <BrushSelector onChange={e => {
                setSelectedBrushWrapper(getBrush((e.target.value)))
                e.target.blur()
            }}
                           selectedBrush={selectedBrush}/>
            <button
                className="button"
                onClick={() => {
                    setSelectedBrushWrapper(rotateBrush90deg(selectedBrush))
                }}>
                Rotate 90deg [<span>⇧</span>+r]
            </button>
        </div>
    );
}
