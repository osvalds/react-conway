import React, {useCallback, useEffect, useState} from "react";

export function useBrushContextMenu(wrapperRef) {
    const [isOpen, setIsOpen] = useState(false);
    const [clickPosition, setClickPosition] = useState({x: 0, y: 0});

    const contextHandler = useCallback((event) => {
        event.preventDefault();
        let x = event.clientX;
        let y = event.clientY;
        setClickPosition({x, y});
        setIsOpen(true)
    }, [setIsOpen, setClickPosition]);

    useEffect(() => {
        const ref = wrapperRef.current;

        ref.addEventListener("contextmenu", contextHandler, false);
        return () => {
            ref.removeEventListener("contextmenu", contextHandler, false);
        };
    }, [wrapperRef, contextHandler]);

    return [clickPosition, isOpen]
}


export function ContextMenu({wrapperRef, children}) {
    const [clickPosition, isOpen] = useBrushContextMenu(wrapperRef);

    return (
        <div style={{left: clickPosition.x, top: clickPosition.y}}
             className="context-menu">
            {children}
        </div>
    )
}
