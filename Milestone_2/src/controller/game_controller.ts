import Game from "../model/game";
import ConsoleGameView from "../view/console_game_view";
import Move from "../model/move";
import Player from "../model/player";
class GameController {
  model: Game;
  view: ConsoleGameView;

  constructor(model: Game, view: ConsoleGameView) {
    this.model = model;
    this.view = view;
  }

  startGame(): void {
    // Runs the main loop of the game
    this.view.displayBoard();
    while (true) {
      let move: Move = this.view.getMove(this.model.curr_player);

      while (!this.model.isLegalMove(move)) {
        this.view.showIllegalMove(move);
        move = this.view.getMove(this.model.curr_player);
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
