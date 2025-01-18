import React, {useEffect, useState} from 'react'
import Board from './Board'
import MoveList from './MoveList'
import Controls from './Controls';

const Game = () => {
    const [board, setBoard] = useState([]);
    const [moveList, setMoveList] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
      const fectBoard = async () =>{
        try{
          const response = await fetch('http://localhost:5000/api/new');
          const data = await response.json();
          setBoard(data.board);
          setLoading(false);
        }catch(error){
          console.log("Error fetching board", error);
          setLoading(false);
        }
      }
      fectBoard();
    }, []);

    const handleTileClick = async (index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      try{
        const response = await fetch('http://localhost:5000/api/move', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ row, col }),
        });
        const data = await response.json();
        if(data.valid){
          setBoard(data.board);
          const movedTile = board[row][col];
          setMoveList((prevList) => [...prevList, `Moved tile ${movedTile}`]);
        }else{
          alert(data.message || "Invalid move");
        }
      }catch(error){  
        console.log("Error moving tile", error);
      }
    };

    if (loading) {
      return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;
    }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: 'lightgray' }}
    >
      <div className="d-flex flex-column align-items-center" style={{ marginRight: '20px' }}>
        <Board board={board} onTileClick={handleTileClick} />
        <Controls
            onNewGame={async () => {
              const response = await fetch('http://localhost:5000/api/new');
              const data = await response.json();
              setBoard(data.board);
              setMoveList([]);
            }}
            onUndoMove={(previousBoard) => {
              setBoard(previousBoard);
              setMoveList((prevList) => prevList.slice(0, prevList.length - 1));
            }}
          onHint={() => console.log('Hint clicked')}
        />
      </div>
      <MoveList moves={moveList} />
    </div>
  );
}

export default Game;