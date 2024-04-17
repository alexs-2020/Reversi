import GameView from "./game_view";
import ConsoleBoardView from "./console_board_view";
import Move from "../model/move";
import Player from "../model/player";
import Board from "../model/board";
import * as readlineSync from 'readline-sync';
import { symbolToStr } from "../model/player_symbol";

class ConsoleGameView extends GameView {
  constructor(board: Board) {
    super(new ConsoleBoardView(board));
  }
  
  showAIMove(move: Move): void {
    console.log(`AI played at position (${move.row + 1}, ${move.column + 1})`); // Assuming rows and columns are 0-indexed
  }
  
  showCurrPlayer(): void {
    // Implementation for showCurrPlayer method goes here
  }

  getMove(player:Player): Move {
    const moveInput: string = readlineSync.question(`Player ${symbolToStr[player.symbol]}, Enter your move (row,col): `) || '';
    const values: string[] = moveInput.split(',');
    if (values.length !== 2) {
      console.log('Invalid input. Please enter a valid move (row, col).');
      return this.getMove(player); // Retry input
    }
    const row: number = parseInt(values[0], 10)-1;
    const col: number = parseInt(values[1], 10)-1;
    
    if (isNaN(row) || isNaN(col)) {
    console.log('Invalid input. Please enter numeric values for row and col.');
    return this.getMove(player); // Retry input
}
  
  
    return new Move(row, col);
  }

  showIllegalMove(move: Move): void {
    // Implementation for showIllegalMove method goes here
  }

  showWinner(player: Player): void {
    // Implementation for showWinner method goes here
  }
  showDraw(): void {
    //implementation to show draw
  }
}

export default ConsoleGameView;
