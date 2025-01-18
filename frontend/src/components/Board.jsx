import React from 'react';

const Board = ({ board, onTileClick }) => {
  if (!board) {
    return (
      <div>
        <h1>Unknown Error <br /> Come back later</h1>
      </div>
    );
  }

  return (
    <div
      className="position-relative"
      style={{
        width: '300px',
        height: '300px',
      }}
    >
      {board.flat().map((tile, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        return (
          <div
            key={index}
            className={`position-absolute d-flex justify-content-center align-items-center ${
              tile ? 'bg-primary text-white' : 'bg-light'
            }`}
            style={{
              width: '100px',
              height: '100px',
              border: '2px solid black',
              cursor: tile ? 'pointer' : 'default',
              top: `${row * 100}px`,
              left: `${col * 100}px`,
              transition: 'top 1s ease, left 1s ease',
            }}
            onClick={() => tile && onTileClick(index)}
          >
            {tile}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
