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

    this.board[mid_length-1][mid_length-1] = PlayerSymbol.White;
    this.board[mid_length][mid_length] = PlayerSymbol.White;
    this.board[mid_length-1][mid_length] = PlayerSymbol.Black;
    this.board[mid_length][mid_length -1] = PlayerSymbol.Black;

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
  isboardFull():boolean{
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j <this.size; j++) {
        if (this.board[i][j] === PlayerSymbol.Empty) {
          return false; // Early return if an empty cell is found
        }
      }
    }
    return true; 
  }
}
export default Board;
