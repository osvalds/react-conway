import React, {useEffect, useRef, useState} from "react";
import {ContextMenu, useBrushContextMenu} from "./ContextMenu";
import {indexToCoord} from "../util";
import {applyBrush} from "../hooks/useBoard";
import {brushDistanceVecFromCenter, centerCoord} from "./Brushes";

const bcwidth = 300;
const bcheight = 150;
const gap = 1;

const getBoardDimensions = ({cols, rows}) => {
    if (rows >= cols) {
        return {
            rows: rows,
            cols: rows * 2
        }
    } else {
        if (rows * 2 > cols) {
            return {
                rows: rows,
                cols: rows * 2
            }
        } else {
            if (cols % 2 === 0) {
                return {
                    cols: cols,
                    rows: cols / 2
                }
            } else {
                return {
                    cols: cols + 1,
                    rows: (cols + 1) / 2
                }

            }
        }
    }
};

const BrushOption = React.memo(({brush, onBrushSelect, isSelected}) => {
    const canvasRef = useRef(null);

    const {cols, rows} = getBoardDimensions(brush);

    const cellSize = ((bcwidth + gap) / cols) - gap;
    let aBrush = {
        ...brush,
        distanceVec: brushDistanceVecFromCenter(brush)
    }
    let board = Array(rows * cols).fill(0);

    board = applyBrush(centerCoord({cols, rows}), board, cols, rows, aBrush);

    const drawCell = (ctx, cell, index, cols) => {
        const {x, y} = indexToCoord(index, cols);
        ctx.fillStyle = cell === 1 ? "#00adb5" : "#393e46";
        ctx.fillRect(x * cellSize + x, y * cellSize + y, cellSize, cellSize)
    };

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        for (let i = 0, boardLength = board.length; i < boardLength; i++) {
            drawCell(ctx, board[i], i, cols);
        }
    }, []);

    return (
        <div onClick={e => onBrushSelect(aBrush)}
             className={`brush-option ${isSelected ? "brush-option--selected" : ""}`}>
            <canvas
                className="brush-option__canvas"
                style={{width: bcwidth, height: bcheight}}
                ref={canvasRef}/>
            <div className="brush-option__title">
                {brush.displayName}
            </div>
        </div>
    )
});

export const BrushHud = React.memo(({wrapperRef, brushes, brushesLoaded, onBrushSelect, selectedBrush}) => {

    const contextMenuRef = useRef(null);
    const [clickPosition, isOpen, setIsOpen] = useBrushContextMenu(wrapperRef, contextMenuRef);

    const brushesLoading = <div className="brush-hud__loading">Loading</div>
    const brushlist = brushes.map(brush => <BrushOption key={brush.name}
                                                        brush={brush}
                                                        isSelected={selectedBrush.name === brush.name}
                                                        onBrushSelect={(newBrush) => {
                                                            onBrushSelect(newBrush);
                                                            setIsOpen(false);
                                                        }}/>)
    return (
        <ContextMenu contextMenuRef={contextMenuRef}
                     onBodyClick={() => setIsOpen(false)}
                     isOpen={isOpen}
                     clickPosition={clickPosition}>
            {brushesLoaded ? brushlist : brushesLoading}
        </ContextMenu>
    )
});

