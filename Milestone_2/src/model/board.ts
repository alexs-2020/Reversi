import PlayerSymbol from "./player_symbol";

class Board {
  /*This class represents the board of the game.
   */
  size: number; // size of the board. Defaults to 3.]
  board:PlayerSymbol[][]

  constructor(size: number = 3) {
    this.size = size;
    //creating a board when board object is created 
    this.board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => PlayerSymbol.Empty));
    const mid_length= size/2;

    this.board[mid_length-1][mid_length-1] = PlayerSymbol.X;
    this.board[mid_length][mid_length] = PlayerSymbol.X
    this.board[mid_length-1][mid_length] = PlayerSymbol.O
    this.board[mid_length][mid_length -1] = PlayerSymbol.O

  }

  updateCell(row: number, col: number, player: number) {
    /*
    currently set aa public method 
    Method to update cell
    */
  }
  getCell(row: number, col: number) {
    /*
    currently set as public method 
    Method to get cell
    */
  }
}
export default Board;
