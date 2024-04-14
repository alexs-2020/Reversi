import PlayerSymbol from "./player_symbol";

class Board {
  // Properties of the Board class
  private size: number;
  private color: string;
  private board: PlayerSymbol[][];

  // Constructor to initialize the board
  constructor(size: number, color: string ) {
    this.size = size;
    this.color = color;

    // Creating a 2D array to represent the board and initializing it with empty symbols
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => PlayerSymbol.Empty)
    );

    // Setting up the initial configuration for the board (e.g., for a game like Othello)
    const midLength = size / 2;
    this.board[midLength - 1][midLength - 1] = PlayerSymbol.White;
    this.board[midLength][midLength] = PlayerSymbol.White;
    this.board[midLength - 1][midLength] = PlayerSymbol.Black;
    this.board[midLength][midLength - 1] = PlayerSymbol.Black;
  }

  // Getter method for the board color
  getBoardColor() {
    return this.color;
  }

  // Setter method for the board color
  setBoardColor(color: string) {
    this.color = color;
  }

  // Getter method for the board size
  getBoardSize() {
    return this.size;
  }

  // Setter method for the board size
  setBoardSize(size: number) {
    this.size = size;
  }
  

  // Method to check if the board is full
  isBoardFull(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === PlayerSymbol.Empty) {
          return false;
        }
      }
    }
    return true;
  }
  getBoard(){
    return this.board
  }
}

export default Board;
