class Board {
  /*This class represents the board of the game.
   */
  private grid: number[][];
  private size: number; // size of the board. Defaults to 3.

  constructor(size: number = 3) {
    if (size <= 0) {
      throw new Error("Size must be positive integers.");
    }
    this.size = size;
    this.grid = new Array(size).fill(0).map(() => new Array(size).fill(0));
  }

  get getGrid(): number[][] {
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
      throw new Error("Invalid cell coordinates.");
    }
  }

  // Set value at a specific cell
  setValue(row: number, col: number, player: number): void {
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

