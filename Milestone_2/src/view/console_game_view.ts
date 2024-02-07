import GameView from "./game_view";
import ConsoleBoardView from "./console_board_view";
import Move from "../model/move";
import Player from "../model/player";

class ConsoleGameView extends GameView {
  // constructor(board: any) {
  //   super(new ConsoleBoardView(board));
  // }

  showCurrPlayer(): void {
    // Implementation for showCurrPlayer method goes here
  }

  // getMove(): Move {
  //   const move: string = prompt("Enter your move (row, col):") || "";
  //   const values: string[] = move.split(",");
  //   const row: number = parseInt(values[0], 10);
  //   const col: number = parseInt(values[1], 10);
  //   return new Move(row, col);
  // }

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
