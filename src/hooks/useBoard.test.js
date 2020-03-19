import {addCols, removeCols, addRows, removeRows} from "./useBoard";

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

it("Removes 1 row fromthe board", () => {
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

it("Removes 3 row fromthe board", () => {
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
