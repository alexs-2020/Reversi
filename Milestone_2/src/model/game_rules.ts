import Board from "./board";
import Move from "./move";
import Player from "./player";
import PlayerSymbol from "./player_symbol";

class GameRules {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  isLegalMove(board: Board, move: Move, player: Player): boolean {
    const flippedPositions = this.getFlippedPositions(board, move, player.symbol);
    return flippedPositions.length > 0;
  }

  getFlippedPositions(board: Board, move: Move, playerSymbol: PlayerSymbol): { row: number, col: number }[] {
    let flippedPositions: { row: number, col: number }[] = [];
    const opponentSymbol = playerSymbol === PlayerSymbol.Black ? PlayerSymbol.White : PlayerSymbol.Black;

    const directions: { row: number, col: number }[] = [
      { row: -1, col: 0 },   // Up
      { row: 1, col: 0 },    // Down
      { row: 0, col: -1 },   // Left
      { row: 0, col: 1 },    // Right
      { row: -1, col: -1 },  // Up-Left
      { row: -1, col: 1 },   // Up-Right
      { row: 1, col: -1 },   // Down-Left
      { row: 1, col: 1 }     // Down-Right
    ];

    for (const direction of directions) {
      let positionsToFlip: { row: number, col: number }[] = [];
      let currentRow = move.row + direction.row;
      let currentCol = move.column + direction.col;

      while (
        currentRow >= 0 && currentRow < board.size &&
        currentCol >= 0 && currentCol < board.size &&
        board.board[currentRow][currentCol] === opponentSymbol
      ) {
        positionsToFlip.push({ row: currentRow, col: currentCol });
        currentRow += direction.row;
        currentCol += direction.col;
      }

      if (
        currentRow >= 0 && currentRow < board.size &&
        currentCol >= 0 && currentCol < board.size &&
        board.board[currentRow][currentCol] === playerSymbol &&
        positionsToFlip.length > 0
      ) {
        flippedPositions = flippedPositions.concat(positionsToFlip);
      }
    }

    return flippedPositions;
  }

  flipPieces(board: Board, positions: { row: number, col: number }[], symbol: PlayerSymbol): void {
    positions.forEach(pos => board.board[pos.row][pos.col] = symbol);
  }

  makeMove(board: Board, move: Move, player: Player): void {
    const flippedPositions = this.getFlippedPositions(board, move, player.symbol);
    if (flippedPositions.length > 0) {
      board.board[move.row][move.column] = player.symbol;
      this.flipPieces(board, flippedPositions, player.symbol);
    }
  }

  hasValidPlacements(player: Player): boolean {
    for (let row = 0; row < this.board.size; row++) {
      for (let col = 0; col < this.board.size; col++) {
        if (this.isLegalMove(this.board,new Move(row, col), player)) {
          return true;
        }
      }
    }
    return false;
  }

  isGameOver(testBoard: Board): boolean {
    const originalBoard = this.board; // Save the original board
    this.board = testBoard; // Temporarily set the board to the provided board

    const blackPlayer = new Player(PlayerSymbol.Black);
    const whitePlayer = new Player(PlayerSymbol.White);
    const gameOver = !this.hasValidPlacements(blackPlayer) && !this.hasValidPlacements(whitePlayer);

    this.board = originalBoard; // Reset the board to the original board
    return gameOver;
  }
}

export default GameRules;
