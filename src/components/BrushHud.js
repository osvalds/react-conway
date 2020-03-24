import React, {useRef} from "react";
import {ContextMenu} from "./ContextMenu";


const BrushOption = React.memo(({brush}) => {
    const canvasRef = useRef(null)

    return (
        <div className="brush-option">
            <canvas
            className="brush-option__canvas"

                ref={canvasRef}/>
            <div>
                {brush.displayName} : {brush.cols} x {brush.rows}
            </div>
        </div>
    )
});

export const BrushHud = React.memo(({wrapperRef, brushes, brushesLoaded}) => {

    const brushesLoading = <div className="brush-hud__loading">Loading</div>
    const brushlist = brushes.map(brush => <BrushOption key={brush.name} brush={brush}/>)

    return (
        <ContextMenu wrapperRef={wrapperRef}>
            {brushesLoaded ? brushlist : brushesLoading}
        </ContextMenu>
    )
});

