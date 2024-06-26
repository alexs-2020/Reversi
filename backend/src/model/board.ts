import PlayerSymbol from "./player_symbol";

// Class representing the game board
class Board {
  // Size of the board. Defaults to 3.
  size: number;

  // 2D array representing the game board with PlayerSymbol values
  board: PlayerSymbol[][];

  // Constructor to initialize the board with default size or provided size
  constructor(size: number = 3) {
    this.size = size;

    // Creating a board when the Board object is instantiated
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => PlayerSymbol.Empty),
    );

    // Placing initial game pieces
    const midLength = size / 2;
    this.board[midLength - 1][midLength - 1] = PlayerSymbol.Black;
    this.board[midLength][midLength] = PlayerSymbol.Black;
    this.board[midLength - 1][midLength] = PlayerSymbol.White;
    this.board[midLength][midLength - 1] = PlayerSymbol.White;
  }

  // Check if the board is full
  isBoardFull(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === PlayerSymbol.Empty) {
          return false; // Early return if an empty cell is found
        }
      }
    }
    return true; // Return true if all cells are occupied
  }

  // Method to clone the current instance of the board
  clone(): Board {
    const clonedBoard = new Board(this.size);

    // Copy the values from the current board to the cloned board
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        clonedBoard.board[i][j] = this.board[i][j];
      }
    }

    return clonedBoard;
  }
}

export default Board;
