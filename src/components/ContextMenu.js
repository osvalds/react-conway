import React, {useCallback, useEffect, useRef, useState} from "react";

export function useBrushContextMenu(wrapperRef, contextMenuRef) {
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

    const handleClickOutside = e => {
        if (contextMenuRef.current.contains(e.target)) {
            // inside click
            return;
        }
        e.stopPropagation();

        // outside click
        setIsOpen(false);

    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return [clickPosition, isOpen, setIsOpen]
}


export function ContextMenu({contextMenuRef, children, isOpen, clickPosition}) {
    return (
        <div ref={contextMenuRef}
             style={{left: clickPosition.x, top: clickPosition.y}}
             className={`context-menu ${isOpen}`}>
            {children}
        </div>
    )
}
