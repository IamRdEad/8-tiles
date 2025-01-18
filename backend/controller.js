import { randomizeBoard, aStar } from './utils.js';

let boardHistory = [];
let boardState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null],
];

export const undoMove = async (req, res) => {
    if(boardHistory.length <= 1){
        return res.status(400).json({ error: "No moves to undo" });
    }
    boardHistory.pop();

    const previousBoard = boardHistory[boardHistory.length - 1];
    boardState = previousBoard;
    res.json({ board: previousBoard });
};

export const makeMove = async (req, res) => {
    const { row, col } = req.body;
  
    const emptyRow = boardState.findIndex((row) => row.includes(null));
    const emptyCol = boardState[emptyRow].indexOf(null);
  
    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
  
    if (!isAdjacent) {
      return res.json({ valid: false, message: 'Invalid move' });
    }
  
    const newBoard = boardState.map((row) => [...row]);
    newBoard[emptyRow][emptyCol] = boardState[row][col];
    newBoard[row][col] = null;
  
    boardHistory.push(newBoard);
    boardState = newBoard;
  
    res.json({ board: newBoard, valid: true });
};

export const newGame = (req, res) => {
  const scrambledBoard = randomizeBoard(); 
  boardState = scrambledBoard;
  boardHistory = [scrambledBoard];
  res.json({ board: scrambledBoard });
};

export const getHint = (req, res) => {
    const path = aStar(boardState);
  
    if (!path || path.length === 0) {
      return res.status(400).json({ error: 'No hint available' });
    }
  
    const firstMove = path[0];
    const tileNumber = boardState[firstMove.row][firstMove.col];
    res.json({ hint: tileNumber, position: firstMove });
};