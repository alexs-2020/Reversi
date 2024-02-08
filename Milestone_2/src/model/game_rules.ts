import { check } from "prettier";
import Board from "./board";
import Move from "./move";
import Player from "./player";
import PlayerSymbol from "./player_symbol";
class GameRules {
  board: Board
  constructor(board: Board) {
    // Constructor logic goes here
    this.board = board
  }
  isLegalMove(move: Move, curr_player: Player): boolean {
    return this.getLegalMove(move, curr_player).length > 0;
}

  getLegalMove(move: Move, curr_player: Player): { row: number, col: number }[] {
    // Find the directions it moves
    let positions: { row: number, col: number }[] = []; // Initialize positions as an empty array

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

    directions.forEach(direction => {
        positions.push(...this.checkDirection(move, direction, curr_player.symbol));
    });

    return positions;
}

  checkDirection(move: Move, direction: { row: number, col: number }, symbol: PlayerSymbol): { row: number, col: number }[] {
    let positions: { row: number, col: number }[] = [];
    let curr_mv: [number, number] = [move.row + direction.row, move.column + direction.col];

    // Change loop condition to use dynamic indices and check for boundaries
    while (
        curr_mv[0] >= 0 && curr_mv[0] < this.board.size&&
        curr_mv[1] >= 0 && curr_mv[1] < this.board.size &&
        this.board.board[curr_mv[0]][curr_mv[1]] !== PlayerSymbol.Empty
    ) {
        positions.push({ row: curr_mv[0], col: curr_mv[1] });
        console.log(curr_mv, direction);
        console.log('\n'); // Add a newline after printing the value of positions

        // Adjust the condition to check against the symbol
        if (this.board.board[curr_mv[0]][curr_mv[1]] !== symbol) {
             console.log('positions to flip:',positions );
            return positions;
        }

        // Update curr_mv for the next iteration
        curr_mv = [curr_mv[0] + direction.row, curr_mv[1] + direction.col];


    }

    return [];
}

  flipPieces(positions: { row: number, col: number }[], symbol: PlayerSymbol): void {
  positions.forEach(pos => this.board.board[pos.row][pos.col] = symbol);}

  makeMove(move: Move, curr_player: Player): void {
    this.board.board[move.row][move.column] = curr_player.symbol;
    const positions = this.getLegalMove(move, curr_player);
    this.flipPieces(positions, curr_player.symbol);

        // Assuming you want to set the current player's symbol at the moved position
       
    }
  
  isGameOver():boolean{
    
    return false;
  }
}
export default GameRules;
