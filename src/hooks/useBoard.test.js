import {addCols, removeCols} from "./useBoard";

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
