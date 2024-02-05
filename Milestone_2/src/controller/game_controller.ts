import Game from "../model/game";
import ConsoleGameView from "../view/console_game_view";
import Move from "../model/move";

class GameController {
  model: Game;
  view: ConsoleGameView;

  constructor(model: Game, view: ConsoleGameView) {
    this.model = model;
    this.view = view;
  }

  startGame(): void {
    // Runs the main loop of the game
    while (true) {
      let move: Move = this.view.getMove();

      while (!this.model.isLegalMove(move)) {
        this.view.showIllegalMove(move);
        move = this.view.getMove();
      }

      this.model.makeMove(move);
      this.view.displayBoard();

      if (this.model.isGameOver()) {
        const winner = this.model.getWinner();
        if (!winner) {
          this.view.showDraw();
        } else {
          this.view.showWinner(winner);
        }
      }

      this.model.switchPlayers();
    }
  }
}

export default GameController;
