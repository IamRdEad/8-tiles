export const randomizeBoard = () => {
    let scrambledBoard;
    let tiles;
  
    do {
      tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
  
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
    } while (!isSolvable(tiles)); 

    scrambledBoard = [
      tiles.slice(0, 3),
      tiles.slice(3, 6),
      tiles.slice(6, 9),
    ];
  
    return scrambledBoard;
};
  

const isSolvable = (tiles) => {
    const flatTiles = tiles.filter((tile) => tile !== null);
  
    let inversions = 0;

    for (let i = 0; i < flatTiles.length; i++) {
      for (let j = i + 1; j < flatTiles.length; j++) {
        if (flatTiles[i] > flatTiles[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
};


const targetBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null],
  ];
  
  export const serializeBoard = (board) => board.flat().join(',');
  
  export const isSolved = (board) => serializeBoard(board) === serializeBoard(targetBoard);

  export const manhattanDistance = (board) => {
    const targetPositions = {
      1: [0, 0],
      2: [0, 1],
      3: [0, 2],
      4: [1, 0],
      5: [1, 1],
      6: [1, 2],
      7: [2, 0],
      8: [2, 1],
    };
  
    let distance = 0;
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const tile = board[row][col];
        if (tile && targetPositions[tile]) {
          const [targetRow, targetCol] = targetPositions[tile];
          distance += Math.abs(row - targetRow) + Math.abs(col - targetCol);
        }
      }
    }
  
    return distance;
};
  
  
  export const getNeighbors = (board) => {
    const emptyRow = board.findIndex((row) => row.includes(null));
    const emptyCol = board[emptyRow].indexOf(null);
  
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];
  
    const neighbors = [];
  
    for (const { row: dr, col: dc } of directions) {
      const newRow = emptyRow + dr;
      const newCol = emptyCol + dc;
  
      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
        const newBoard = board.map((r) => [...r]); // Deep copy the board
        [newBoard[emptyRow][emptyCol], newBoard[newRow][newCol]] = [newBoard[newRow][newCol], newBoard[emptyRow][emptyCol]];
        neighbors.push({ board: newBoard, move: { row: newRow, col: newCol } });
      }
    }
  
    return neighbors;
  };
  export const aStar = (initialBoard) => {
    const priorityQueue = [];
    const visited = new Set();
  
    priorityQueue.push({
      board: initialBoard,
      path: [],
      cost: 0,
      heuristic: manhattanDistance(initialBoard),
    });
  
    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => (a.cost + a.heuristic) - (b.cost + b.heuristic));
  
      const { board, path, cost } = priorityQueue.shift(); 
      const serialized = serializeBoard(board);
  
      if (visited.has(serialized)) continue; 
      visited.add(serialized);
  
      if (isSolved(board)) return path; 
  
     
      for (const neighbor of getNeighbors(board)) {
        const newPath = [...path, neighbor.move];
        priorityQueue.push({
          board: neighbor.board,
          path: newPath,
          cost: cost + 1,
          heuristic: manhattanDistance(neighbor.board),
        });
      }
    }
  
    return null; 
};