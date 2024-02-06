import GameView from "./game_view";
import ConsoleBoardView from "./console_board_view";
import Move from "../model/move";
import Player from "../model/player";
import Board from "../model/board";
import * as readlineSync from 'readline-sync';

class ConsoleGameView extends GameView {
  constructor(board: Board) {
    super(new ConsoleBoardView(board));
  }

  showCurrPlayer(): void {
    // Implementation for showCurrPlayer method goes here
  }

  getMove(): Move {
    const moveInput: string = readlineSync.question('Enter your move (row,col): ') || '';
    const values: string[] = moveInput.split(',');
    if (values.length !== 2) {
      console.log('Invalid input. Please enter a valid move (row, col).');
      return this.getMove(); // Retry input
    }
    const row: number = parseInt(values[0], 10);
    const col: number = parseInt(values[1], 10);
    
    if (isNaN(row) || isNaN(col)) {
    console.log('Invalid input. Please enter numeric values for row and col.');
    return this.getMove(); // Retry input
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
