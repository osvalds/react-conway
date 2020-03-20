import React from "react";
import {coordToIndex, indexToCoord} from "../util";


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

export const rotateTemplate90deg = ({template, rows, cols}) => {
    let rotatedTemplate = Array(rows * cols);
    let i = 0;

    for (let x = cols - 1; x >= 0; x--) {
        for (let y = 0; y < rows; y++) {
            const index = coordToIndex({x, y}, cols);
            rotatedTemplate[i] = template[index];
            i++
        }
    }

    return {
        template: rotatedTemplate,
        rows: cols,
        cols: rows
    }
};

export const rotateBrush90deg = (brush) => {
    const newTemplate = rotateTemplate90deg(brush);
    return {
        ...brush,
        ...newTemplate,
        distanceVec: brushDistanceVecFromCenter(newTemplate)
    }
};

export const brushes = [
    {
        name: "pixel",
        displayName: "Pixel",
        rows: 1,
        cols: 1,
        template: [1]
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
        ]
    },
    {
        name: "diehard",
        displayName: "Die Hard",
        rows: 2,
        cols: 8,
        template: [
            1, 1, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 0, 0, 1, 1, 1,
        ]
    },
    {
        name: "rpentomino",
        displayName: "R-Pentomino",
        rows: 3,
        cols: 3,
        template: [
            0, 1, 1,
            1, 1, 0,
            0, 1, 0
        ]
    },
    {
        name: "mwss",
        displayName: "Middle weight space ship",
        rows: 5,
        cols: 6,
        template: [
            0, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 0,
        ]
    },
    {
        name: "hwss",
        displayName: "Heavy weight space ship",
        rows: 5,
        cols: 7,
        template: [
            0, 0, 0, 1, 1, 0, 0,
            0, 1, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 0,
        ]
    },
    {
        name: "gospergun",
        displayName: "Gosper glider gun",
        rows: 9,
        cols: 36,
        template: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
    }
];

export const getBrush = (name) => {
    let b = brushes.filter(brush => brush.name === name)[0];
    b.distanceVec = brushDistanceVecFromCenter(b);
    return b;
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
