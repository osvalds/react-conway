import {centerCoord} from "./brushes";

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
