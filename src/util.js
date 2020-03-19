export const indexToCoord = (index, cols) => {
    return {
        x: index % cols,
        y: Math.floor(index / cols)
    }
};

export const coordToIndex = ({x, y}, cols) => {
    return y * cols + x;
};

export const isDesolate = (board) => {
    return board.every((cell) => cell === 0)
};

export const mod = (x, m) => {
    return (x % m + m) % m;
};

// calculate x or y coordinate of a neighbor given a diff and that dimension's size
// This will wrap around the axis
export const calcNeighborCoordinate = (y, yd, yTotal) => {
    return mod(y + yd, yTotal);
};
