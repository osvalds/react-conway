export const brushes = [
    {
        name: "pixel",
        rows: 1,
        cols: 1,
        template: [1],
    },
    {
        name: "glider",
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
        rows: 3,
        cols: 8,
        template: [
            0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 0, 0, 1, 1, 1,
        ]
    }
];

export const centerCoord = ({rows, cols}) => {
    return {
        x: Math.floor((cols - 1) / 2),
        y: Math.floor((rows - 1) / 2)
    }
};
