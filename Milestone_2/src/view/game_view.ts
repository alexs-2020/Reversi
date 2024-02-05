import Move from "../model/move";
import BoardView from "./board_view";

abstract class GameView {
  boardView: BoardView;

  constructor(boardView: BoardView) {
    this.boardView = boardView;
  }

  abstract showCurrPlayer(): void;

  abstract getMove(): void;

  abstract showIllegalMove(move: Move): void;

  abstract showWinner(player: any): void;

  displayBoard(): void {
    this.boardView.display();
  }
}

export default GameView;
