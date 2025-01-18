import React from 'react';
import Button from './Button';

const Controls = ({ onNewGame, onUndoMove, onHint }) => {
  return (
    <div className="mt-4">
      {/* Undo Move Button */}
      <Button
        label="Undo Move"
        onClick={async () => {
          try {
            const response = await fetch('http://localhost:5000/api/undo', {
              method: 'POST',
            });
            const data = await response.json();
            if (data.error) {
              alert(data.error);
            } else {
              onUndoMove(data.board);
            }
          } catch (error) {
            console.error('Error undoing move:', error);
          }
        }}
      />

      {/* New Game Button */}
      <Button
        label="New Game"
        onClick={async () => {
          try {
            const response = await fetch('http://localhost:5000/api/new'); 
            const data = await response.json();
            onNewGame(data.board);
          } catch (error) {
            console.error('Error starting a new game:', error);
          }
        }}
      />

      {/* Hint Button */}
      <Button
        label="Hint"
        onClick={async () => {
          try {
            const response = await fetch('http://localhost:5000/api/hint');
            const data = await response.json();
            if (data.error) {
              alert(data.error);
            } else {
              alert(`Move tile ${data.hint}`); // Display the hint to the user
            }
          } catch (error) {
            console.error('Error fetching hint:', error);
          }
        }}
      />
    </div>
  );
};

export default Controls;
