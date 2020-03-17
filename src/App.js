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

function App() {
    let startBoard = Array(ROWS).fill().map(() => Array(COLS).fill(0));

    const [board, setBoard] = useState(startBoard);

    let toggleCell = ({x, y}) => {
        let newBoard = [...board].map(arr => arr.slice(0));
        newBoard[y][x] = board[y][x] === 0 ? 1 : 0;
        setBoard(newBoard);
    };

    return (
        <div className="board">
            {board.map((row, index) => <Row key={index} row={row} y={index} toggleCell={toggleCell}/>)}
        </div>
    );
}

export default App;
