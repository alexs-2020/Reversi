class Board {
  /*This class represents the board of the game.
   */
  private grid: number[][];
  private size: number; // size of the board. Defaults to 3.

  constructor(size: number = 8) {
    if (size <= 0 || size % 2 !== 0) {
      throw new Error("Size must be positive integers.");
    }
    this.size = size;
    this.grid = new Array(size).fill(0).map(() => new Array(size).fill(0));
    this.initializeBoard(); 
  }
  
  initializeBoard(){
    //setup board a place starting checkers
    const mid = this.size / 2 - 1;
    this.grid[mid][mid] = this.grid[mid + 1][mid + 1] = 2;//white
    this.grid[mid][mid + 1] = this.grid[mid + 1][mid] = 1; // Black
  }

  get getGrid(): number[][] {
    //getter for 2D grid
    return this.grid
  }

  printGrid(): void {
    for (let i = 0; i < this.size; i++) {
      console.log(this.grid[i].join(" "));
    }
  }

  // Get value at a specific cell
  getValue(row: number, col: number): number {
    if (this.isValidCell(row, col)) {
      return this.grid[row][col];
    } else {
      console.log("invalid cell coords try again")
      return this.getValue(row, col)
    }
  }

  // Set value at a specific cell
  setValue(row: number, col: number, player: number): void {
    console.log("Valid cell " + this.isValidCell(row,col))
    if (this.isValidCell(row, col)) {
      this.grid[row][col] = player;
    } else {
      throw new Error("Invalid cell coordinates.");
    }
  }

  // Check if the given cell coordinates are valid
  private isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }
}
export default Board;

