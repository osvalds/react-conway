import React, {useState} from 'react';
import './App.scss';

const [ROWS, COLS] = [20, 20];

function Cell({cell, coord, toggleCell}) {

    return (
        <div
            onClick={e => toggleCell(coord)}
            className="cell">
            {cell}
        </div>
    )
}

function Row({row, y, toggleCell}) {
    return (
        <div className="row">
            {row.map((cell, index) => <Cell key={index} cell={cell} coord={{x: index, y: y}} toggleCell={toggleCell}/>)}
        </div>
    )
}

const neighborVec = (c, cMax) => {
    if (c === 0) {
        return [0, 1];
    } else if (c === cMax - 1) {
        return [-1, 0];
    } else {
        return [-1, 0, 1];
    }
};

const countNeighbors = ({x, y}, board) => {
    const xDiff = neighborVec(x, COLS);
    const yDiff = neighborVec(y, COLS);
    // create cartesian product of neighbor x and y potential coordinates
    const fullCartesianProduct = [].concat(...xDiff.map(x => yDiff.map(y => [x, y])));
    // filter out [0, 0] as it's the cells position
    const cartesianProduct = fullCartesianProduct.filter(([x, y]) => !(x === 0 && y === 0))

    let neighborCount = 0;

    for (let [xd, yd] of cartesianProduct) {
        if (board[y + yd][x + xd] === 1) {
            neighborCount += 1;
        }
    }

    return neighborCount;
};

function App() {
    let startBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));

    const [board, setBoard] = useState(startBoard);

    let toggleCell = (coord) => {
        const {x, y} = coord;

        let newBoard = [...board].map(arr => arr.slice(0));
        newBoard[y][x] = board[y][x] === 0 ? 1 : 0;
        setBoard(newBoard);
    };

    let advanceBoard = () => {
        const currentBoard = [...board].map(arr => arr.slice(0));
        let newBoard = [...board].map(arr => arr.slice(0));

        for (let y = 0; y < currentBoard.length; y++) {
            for (let x = 0; x < currentBoard[y].length; x++) {
                const neighborCount = countNeighbors({x, y}, currentBoard)

                if (currentBoard[y][x] === 1) {
                    if (neighborCount < 2 || neighborCount > 3) {
                        newBoard[y][x] = 0;
                    }
                } else {
                    if (neighborCount === 3) {
                        newBoard[y][x] = 1;
                    }
                }
            }
        }

        setBoard(newBoard);
    };

    return (
        <div className="board">
            {board.map((row, index) => <Row key={index} row={row} y={index} toggleCell={toggleCell}/>)}
            <button onClick={advanceBoard}>
                Neeeext!
            </button>
        </div>
    );
}

export default App;
