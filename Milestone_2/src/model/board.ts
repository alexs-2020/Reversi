class Board {
  /*This class represents the board of the game.
   */
  private size: number; // size of the board. Defaults to 3.

  constructor(size: number = 3) {
    this.size = size;
  }
  updateCell(row: number, col: number, player: number) {
    /*
    currently set as private method 
    Method to update cell
    */
  }
  getCell(row: number, col: number) {
    /*
    currently set as private method 
    Method to get cell
    */
  }
}
export default Board;
