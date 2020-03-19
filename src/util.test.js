import {indexToCoord, coordToIndex, isDesolate} from "./util"


it("converts index->coord", () => {
    expect(indexToCoord(0, 10)).toEqual({x: 0, y: 0});
    expect(indexToCoord(24, 10)).toEqual({x: 4, y: 2});
});

it("converts coord->index", () => {
    expect(coordToIndex({x: 0, y: 0}, 10)).toEqual(0);
    expect(coordToIndex({x: 4, y: 2}, 10)).toEqual(24);
});

it("checks if the board is empty", () => {
    expect(isDesolate([0, 0, 0, 0, 0])).toBe(true);
    expect(isDesolate([0, 0, 0, 0, 1])).toBe(false);
});


