# 8-Tile Game

This project is a fully functional **8-tile puzzle game**, developed using **React** for the frontend and **Node.js** with **Express** for the backend. The game includes key features such as a solvable randomized board, move tracking, undo functionality, and a hint system powered by the A* algorithm with a Manhattan distance heuristic.

## Features

1. **Randomized Solvable Board**:
   - At the start of the game, the board is scrambled using a randomization function that ensures the board is solvable.

2. **Tile Movement**:
   - Click on a tile adjacent to the empty space to move it. Movement is animated for a smooth user experience.

3. **Move Tracking**:
   - A list of moves is displayed on the right, showing each tile moved.

4. **Undo Move**:
   - The user can undo their last move, reverting the board to the previous state.

5. **Hint System**:
   - Uses the A* algorithm with a Manhattan distance heuristic to calculate the shortest path to the solution. The first move in this path is suggested as the hint.

6. **Responsive Design**:
   - The interface adapts to different screen sizes, ensuring a consistent experience on desktop and mobile.

## Technologies Used

### Frontend
- **React**
- **Bootstrap** (for styling)

### Backend
- **Node.js**
- **Express.js**

### Algorithm
- **A\*** (with Manhattan distance heuristic)

