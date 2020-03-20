import React from "react";
import {BrushSelector, getBrush, rotateBrush90deg} from "./Brushes";

export default function Controls({advanceBoard, toggleIsRunning, isRunning, setIsRunning, setBoard, board, setSelectedBrushWrapper, selectedBrush}) {
    return (
        <div className="controls">
            <button
                className="button"
                onClick={() => {
                    setIsRunning(false);
                    advanceBoard()
                }}>
                Next
            </button>
            <button
                className="button"
                onClick={toggleIsRunning}>
                {isRunning ? "Stop" : "Start"}
            </button>
            <button
                className="button"
                onClick={() => {
                    setIsRunning(false);
                    setBoard([...board].fill(0))
                }}>
                Reset
            </button>
            <BrushSelector onChange={e => setSelectedBrushWrapper(getBrush((e.target.value)))}
                           selectedBrush={selectedBrush}/>
            <button
                className="button"
                onClick={() => {
                    setSelectedBrushWrapper(rotateBrush90deg(selectedBrush))
                }}>
                Rotate 90deg (shift + r)
            </button>
        </div>
    );
}
