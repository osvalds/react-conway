import {addCols} from "./useBoard";

it("adds 1 empty col to existing board", () => {
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

    expect(addCols(board, cCols, cRows, nCols, nRows)).toEqual(result)
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
    const nRows = 3;

    const result = [
        0, 1, 0, 0,
        0, 0, 0, 0,
        1, 0, 0, 0,
    ];

    expect(addCols(board, cCols, cRows, nCols, nRows)).toEqual(result)
})
