import React, {useState} from "react";
import {indexToCoord} from "../util";


export const centerCoord = ({rows, cols}) => {
    return {
        x: Math.floor((cols - 1) / 2),
        y: Math.floor((rows - 1) / 2)
    }
};

export const brushDistanceVecFromCenter = ({rows, cols, template}) => {
    const {x: bcx, y: bcy} = centerCoord({rows, cols});
    let distanceVecsFromCenter = Array(rows * cols);

    for (let i = 0, brushSize = template.length; i < brushSize; i++) {
        let {x: cbpx, y: cbpy} = indexToCoord(i, cols);

        distanceVecsFromCenter[i] = [cbpx - bcx, cbpy - bcy]
    }

    return distanceVecsFromCenter;
};

export const brushes = [
    {
        name: "pixel",
        displayName: "Pixel",
        rows: 1,
        cols: 1,
        template: [1],
        get distanceVec() {
            return brushDistanceVecFromCenter(this)
        }
    },
    {
        name: "glider",
        displayName: "Glider",
        rows: 3,
        cols: 3,
        template: [
            0, 1, 0,
            0, 0, 1,
            1, 1, 1
        ],
        get distanceVec() {
            return brushDistanceVecFromCenter(this)
        }
    },
    {
        name: "diehard",
        displayName: "Die Hard",
        rows: 3,
        cols: 8,
        template: [
            0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 0, 0, 1, 1, 1,
        ],
        get distanceVec() {
            return brushDistanceVecFromCenter(this)
        }
    }
];

export const getBrush = (name) => {
    return brushes.filter(brush => brush.name === name)[0];
};

export function BrushSelector({onChange, selectedBrush}) {


    return (
        <select value={selectedBrush.name} onChange={onChange}>
            {brushes.map(brush => {
                return (
                    <option key={brush.name} value={brush.name}>
                        {brush.displayName}
                    </option>
                )
            })}
        </select>
    )
}
