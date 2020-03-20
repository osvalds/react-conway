import {centerCoord, brushDistanceVecFromCenter} from "./brushes";

it("returns center coordinates of a brush", () => {
    const brush1x1 = {
        rows: 1,
        cols: 1
    };

    const brush1x2 = {
        rows: 1,
        cols: 2
    };

    const brush2x1 = {
        rows: 2,
        cols: 1
    };


    const brush3x1 = {
        rows: 1,
        cols: 3
    };

    const brush3x3 = {
        rows: 3,
        cols: 3
    };

    const brush3x4 = {
        rows: 3,
        cols: 4
    };

    const brush3x8 = {
        rows: 3,
        cols: 8
    };


    expect(centerCoord(brush1x1)).toMatchObject({x: 0, y: 0});
    expect(centerCoord(brush1x2)).toMatchObject({x: 0, y: 0});
    expect(centerCoord(brush2x1)).toMatchObject({x: 0, y: 0});
    expect(centerCoord(brush3x1)).toMatchObject({x: 1, y: 0});
    expect(centerCoord(brush3x3)).toMatchObject({x: 1, y: 1});
    expect(centerCoord(brush3x4)).toMatchObject({x: 1, y: 1});
    expect(centerCoord(brush3x8)).toMatchObject({x: 3, y: 1});
});

it("converts array into diff array calculating distance from the center", () => {
    const brush1x1 = {
        rows: 1,
        cols: 1,
        template: [1]
    };

    const brush1x1DistanceVecs = [[0, 0]];

    const brush3x1 = {
        rows: 1,
        cols: 3,
        template: [1, 0, 1]
    };

    const brush3x1DistanceVecs = [
        [-1, 0], [0, 0], [1, 0]
    ];


    const brush3x3 = {
        rows: 3,
        cols: 3,
        template: [
            0, 1, 0,
            0, 0, 1,
            1, 1, 1
        ]
    };

    const brush3x3DistanceVecs = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];

    const brush3x8 = {
        rows: 3,
        cols: 8,
        template: [
            0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 0, 0, 1, 1, 1,
        ]
    };

    const brush3x8DistanceVecs = [
        [-3, -1], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1],
        [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
        [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
    ];


    expect(brushDistanceVecFromCenter(brush1x1)).toStrictEqual(brush1x1DistanceVecs);
    expect(brushDistanceVecFromCenter(brush3x3)).toStrictEqual(brush3x3DistanceVecs);
    expect(brushDistanceVecFromCenter(brush3x1)).toStrictEqual(brush3x1DistanceVecs);
    expect(brushDistanceVecFromCenter(brush3x8)).toStrictEqual(brush3x8DistanceVecs);
});
