import React from "react";
import {ContextMenu} from "./ContextMenu";


export function BrushHud({wrapperRef}) {
    return (
        <ContextMenu wrapperRef={wrapperRef}>
            <div>
                Brush options
            </div>
        </ContextMenu>
    )
}
