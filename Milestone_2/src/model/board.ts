import PlayerSymbol from "./player_symbol";
import { Clonable } from './clonable';


class Board implements Clonable<Board>{
  size: number;
  board: PlayerSymbol[][];
  

  constructor(size: number = 3) {
    this.size = size;
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => PlayerSymbol.Empty));
    const mid_length = size / 2;

    this.board[mid_length - 1][mid_length - 1] = PlayerSymbol.White;
    this.board[mid_length][mid_length] = PlayerSymbol.White;
    this.board[mid_length - 1][mid_length] = PlayerSymbol.Black;
    this.board[mid_length][mid_length - 1] = PlayerSymbol.Black;
  }

  updateCell(row: number, col: number, playerSymbol: PlayerSymbol): void {
    this.board[row][col] = playerSymbol;
  }

  getCell(row: number, col: number): PlayerSymbol {
    return this.board[row][col];
  }

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

  clone(): Board {
    const clonedBoard = new Board(this.size);
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        clonedBoard.board[row][col] = this.board[row][col];
      }
    }
    return clonedBoard;
  }
}

export default Board;
