import {indexToCoord, coordToIndex, isDesolate, mod, calcNeighborCoordinate} from "./util"

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

it("does modulo operation, to wrap the numbers", () => {
    expect(mod(0, 19)).toBe(0);
    expect(mod(-1, 19)).toBe(18);
    expect(mod(5, 19)).toBe(5);
});

it("calculates neighbor's one coordinate given current, diff and total size of dimension", () => {
    expect(calcNeighborCoordinate(0, 1, 20)).toBe(1);
    expect(calcNeighborCoordinate(0, -1, 20)).toBe(19);
    expect(calcNeighborCoordinate(0, 0, 20)).toBe(0);

    expect(calcNeighborCoordinate(2, 1, 20)).toBe(3);
    expect(calcNeighborCoordinate(2, -1, 20)).toBe(1);
    expect(calcNeighborCoordinate(2, 0, 20)).toBe(2);
});

