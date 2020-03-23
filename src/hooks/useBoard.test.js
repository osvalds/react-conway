import {addCols, removeCols, addRows, removeRows, handleBoardDimensionChange, applyBrush} from "./useBoard";
import {brushDistanceVecFromCenter, getBrush} from "../components/Brushes"

export const brushes = [
    {
        name: "pixel",
        displayName: "Pixel",
        rows: 1,
        cols: 1,
        template: [1]
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
    }, {
        name: "glider",
        displayName: "Glider",
        rows: 3,
        cols: 3,
        template: [
            0, 1, 0,
            0, 0, 1,
            1, 1, 1
        ],
        distanceVec: brushDistanceVecFromCenter({cols: 3, rows: 3})
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
    },
    {
        name: "greatonoff",
        displayName: "Great on-off",
        rows: 8,
        cols: 8,
        template: [
            0, 0, 1, 1, 0, 0, 0, 0,
            0, 1, 0, 0, 1, 0, 0, 0,
            0, 1, 0, 1, 0, 0, 0, 0,
            1, 1, 0, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 1, 1, 1, 0,
            0, 0, 0, 0, 1, 0, 0, 0,
        ]
    },
    {
        name: "pufferfish",
        displayName: "Puffer fish",
        rows: 12,
        cols: 15,
        template: [
            0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
            0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0,
            0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
            1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        ]
    },
    {
        name: "puffsuppressor",
        displayName: "Puff suppressor",
        rows: 25,
        cols: 33,
        template: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1,
            1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0,
            0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0,
            0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1,
            1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0,
            0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1,
            0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
    },
    {
        name: "nms",
        displayName: "Non monotonic spaceship",
        rows: 11,
        cols: 21,
        template: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
            1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1,
            0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0,
            1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1,
            0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        ]
    },
];

it("adds 1 empty col to existing board", () => {
    const board = [
        0, 1,
        0, 0,
        1, 0
    ];

    const cCols = 2;
    const cRows = 3;

    const nCols = 3;

    const result = [
        0, 1, 0,
        0, 0, 0,
        1, 0, 0
    ];

    expect(addCols(board, cCols, cRows, nCols)).toEqual(result)
});

it("adds 2 empty cols to existing board", () => {
    const board = [
        0, 1,
        0, 0,
        1, 0
    ];

    const cCols = 2;
    const cRows = 3;

    const nCols = 4;

    const result = [
        0, 1, 0, 0,
        0, 0, 0, 0,
        1, 0, 0, 0,
    ];

    expect(addCols(board, cCols, cRows, nCols)).toEqual(result)
});


it("removes 1 col from array", () => {
    const board = [
        0, 1, 0,
        0, 0, 0,
        1, 0, 0
    ];

    const cCols = 3;
    const cRows = 3;

    const nCols = 2;

    const result = [
        0, 1,
        0, 0,
        1, 0
    ];

    expect(removeCols(board, cCols, cRows, nCols)).toEqual(result)
});

it("removes 2 cols from array", () => {
    const board = [
        0, 1, 0,
        0, 0, 0,
        1, 0, 0
    ];

    const cCols = 3;
    const cRows = 3;

    const nCols = 1;

    const result = [
        0,
        0,
        1,
    ];

    expect(removeCols(board, cCols, cRows, nCols)).toEqual(result)
});

it("Adds 1 empty row to the board", () => {
    const board = [
        0, 1,
        0, 0,
        1, 0,
    ];

    const cCols = 2;
    const cRows = 3;

    const nRows = 4;

    const result = [
        0, 1,
        0, 0,
        1, 0,
        0, 0
    ];

    expect(addRows(board, cCols, cRows, nRows)).toEqual(result)
});

it("Adds 2 empty rows to the board", () => {
    const board = [
        0, 1,
        0, 0,
        1, 0,
    ];

    const cCols = 2;
    const cRows = 3;

    const nRows = 5;

    const result = [
        0, 1,
        0, 0,
        1, 0,
        0, 0,
        0, 0
    ];

    expect(addRows(board, cCols, cRows, nRows)).toEqual(result)
});

it("Removes 1 row from the board", () => {
    const board = [
        0, 1,
        0, 0,
        1, 0,
    ];

    const cCols = 2;
    const cRows = 3;

    const nRows = 2;

    const result = [
        0, 1,
        0, 0
    ];

    expect(removeRows(board, cCols, cRows, nRows)).toEqual(result)
});

it("Removes 3 row from the board", () => {
    const board = [
        0, 1,
        0, 0,
        1, 0,
        0, 0,
        0, 0
    ];

    const cCols = 2;
    const cRows = 5;

    const nRows = 2;

    const result = [
        0, 1,
        0, 0
    ];

    expect(removeRows(board, cCols, cRows, nRows)).toEqual(result)
});

it("handles board resizing, from 2x3 -> 3x3", () => {
    const board = [
        0, 1,
        0, 0,
        1, 0
    ];

    const cCols = 2;
    const cRows = 3;

    const nCols = 3;
    const nRows = 3;

    const result = [
        0, 1, 0,
        0, 0, 0,
        1, 0, 0
    ];

    expect(handleBoardDimensionChange(board, cCols, cRows, nCols, nRows)).toEqual(result)
});

it("handles board resizing, from 3x3 -> 2x3", () => {
    const board = [
        0, 1, 0,
        0, 0, 0,
        1, 0, 0
    ];

    const cCols = 3;
    const cRows = 3;

    const nCols = 2;
    const nRows = 3;

    const result = [
        0, 1,
        0, 0,
        1, 0
    ];

    expect(handleBoardDimensionChange(board, cCols, cRows, nCols, nRows)).toEqual(result)
});

it("handles board resizing, from 3x2 -> 3x3", () => {
    const board = [
        0, 1, 0,
        0, 1, 0
    ];

    const cCols = 3;
    const cRows = 2;

    const nCols = 3;
    const nRows = 3;

    const result = [
        0, 1, 0,
        0, 1, 0,
        0, 0, 0
    ];

    expect(handleBoardDimensionChange(board, cCols, cRows, nCols, nRows)).toEqual(result)
});

it("handles board resizing, from 3x3 -> 3x2", () => {
    const board = [
        0, 1, 0,
        0, 1, 0,
        1, 1, 1
    ];

    const cCols = 3;
    const cRows = 3;

    const nCols = 3;
    const nRows = 2;

    const result = [
        0, 1, 0,
        0, 1, 0,
    ];

    expect(handleBoardDimensionChange(board, cCols, cRows, nCols, nRows)).toEqual(result)
});


it("handles board resizing, from 2x2 -> 3x3", () => {
    const board = [
        0, 1,
        0, 1
    ];

    const cCols = 2;
    const cRows = 2;

    const nCols = 3;
    const nRows = 3;

    const result = [
        0, 1, 0,
        0, 1, 0,
        0, 0, 0
    ];

    expect(handleBoardDimensionChange(board, cCols, cRows, nCols, nRows)).toEqual(result)
});

it("handles board resizing, from 3x3 -> 2x2", () => {
    const board = [
        0, 1, 0,
        0, 1, 0,
        1, 0, 0
    ];

    const cCols = 3;
    const cRows = 3;

    const nCols = 2;
    const nRows = 2;

    const result = [
        0, 1,
        0, 1,
    ];

    expect(handleBoardDimensionChange(board, cCols, cRows, nCols, nRows)).toEqual(result)
});

it("applies pixel brush on 3x3 at 1,1", () => {
    const clickCoords = {x: 1, y: 1};
    const cols = 3;
    const rows = 3;
    const board = Array(rows * cols).fill(0);
    const brush = getBrush("pixel", brushes);

    const resultBoard = [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ];

    expect(applyBrush(clickCoords, board, cols, rows, brush)).toEqual(resultBoard);
});

it("applies glider brush on 4x4 at 1,1", () => {
    const clickCoords = {x: 1, y: 1};
    const cols = 4;
    const rows = 4;
    const board = Array(rows * cols).fill(0);
    const brush = getBrush("glider", brushes)

    const resultBoard = [
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 1, 1, 0,
        0, 0, 0, 0
    ];

    expect(applyBrush(clickCoords, board, cols, rows, brush)).toEqual(resultBoard);
});

it("applies glider brush on 4x4 at 3,0", () => {
    const clickCoords = {x: 3, y: 0};
    const cols = 4;
    const rows = 4;
    const board = Array(rows * cols).fill(0);
    const brush = getBrush("glider", brushes);

    const resultBoard = [
        1, 0, 0, 0,
        1, 0, 1, 1,
        0, 0, 0, 0,
        0, 0, 0, 1
    ];

    expect(applyBrush(clickCoords, board, cols, rows, brush)).toEqual(resultBoard);
});
