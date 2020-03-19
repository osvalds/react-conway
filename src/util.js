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
