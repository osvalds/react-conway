import React from 'react';
import './App.scss';

const [ROWS, COLS] = [20, 20];

function Cell({cell}) {
    return (
        <div className="cell">
            {cell}
        </div>
    )
}

function Row({row}) {
    return (
        <div className="row">
            {row.map((cell, index) => <Cell key={index} cell={cell}/>)}
        </div>
    )
}

function App() {
    let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));

    return (
        <div className="board">
            {board.map((row, index) => <Row key={index} row={row}/>)}
        </div>
    );
}

export default App;
