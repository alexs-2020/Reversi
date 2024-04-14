import Board from "./board";

class BoardEnhancer {
  // Property to hold the Board instance
  private board: Board;

  // Constructor to initialize the BoardEnhancer with a Board instance
  constructor() {
    this.board = new Board(8, "black")
  }

  // Method to change the color of the board
  changeColor(newColor: string): void {
    this.board.setBoardColor(newColor); // Sets the new color on the board
    console.log(`Board color changed to ${newColor}`); // Logs the color change
  }

  // Method to change the size of the board
  changeSize(newSize: number): void {
    this.board.setBoardSize(newSize); // Sets the new size on the board
    console.log(`Board size changed to ${newSize}x${newSize}`); // Logs the size change
  }

  // Method to check if the board is full
  isBoardFull(): boolean {
    return this.board.isBoardFull(); // Returns true if the board is full, false otherwise
  }
  getBoard(){
    return this.board
  }
}

export default BoardEnhancer;

