var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

var board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = "";
      }
    }
  }
}

let GetPuzzle = document.getElementById("GetPuzzle");
let SolvePuzzle = document.getElementById("SolvePuzzle");

GetPuzzle.onclick = function () {
  FillBoard(board);
};

SolvePuzzle.onclick = () => {
  SudokuSolver(board, 0, 0, 9);
};

function isValid(board, i, j, num, n) {
  // Row and Col checks if the number exists in that particular row and column
  for (let x = 0; x < n; x++) {
    if (board[i][x] == num || board[x][j] == num) {
      return false;
    }
  }

  // Check for Submatrix
  let rn = Math.sqrt(n);
  let si = i - (i % rn);
  let sj = j - (j % rn);

  for (let x = si; x < si + rn; x++) {
    for (let y = sj; y < sj + rn; y++) {
      if (board[x][y] == num) {
        return false;
      }
    }
  }

  return true;
}

function SudokuSolver(board, i, j, n) {
  // Base case
  if (i == n) {
    FillBoard(board);
    //board has been updated with solution,so, its is filled and displayed on the screen
    return true; //this true is later stored in 'subAns' variable
    // If printing is done successfully
  }

  // If we move outside the board (end of row)
  if (j == n) {
    return SudokuSolver(board, i + 1, 0, n);
    //ith row is processed
    //so,we are moving to next row
  }

  // If the cell is already filled, then move ahead
  if (board[i][j] != 0) {
    return SudokuSolver(board, i, j + 1, n);
  }

  // Try to fill the cell with appropriate number
  for (let num = 1; num <= 9; num++) {
    // Check if number can be filled
    if (isValid(board, i, j, num, n)) {
      board[i][j] = num;
      let subAns = SudokuSolver(board, i, j + 1, n);
      //checking if a valid solution is found for remaining cells of position
      //if false, this function has to continue by finding
      if (subAns) {
        return true;
      }
      // The usage of subAns is crucial to determine when to stop the backtracking process.
      //Once a valid solution is found, the function stops exploring further possibilities 
      //and starts undoing the changes to backtrack to the previous states of the board and continue the search for other solutions (if any).

      // Backtrack to undo the changes
      board[i][j] = 0;
    }
  }
  return false;
}
