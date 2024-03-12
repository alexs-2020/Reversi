import Game from "../model/game";
import ConsoleGameView from "../view/console_game_view";
import Move from "../model/move";
import PlayerSymbol from "../model/player_symbol"; // Import PlayerSymbol enum

class GameController {
  model: Game;
  view: ConsoleGameView;
  gameMode: number; // Add an attribute to store the game mode (0: PvP, 1: PvAI)

  constructor(model: Game, view: ConsoleGameView, gameMode: number) {
    this.model = model;
    this.view = view;
    this.gameMode = gameMode;
  }

  startGame(): void {
    this.view.displayBoard();
    while (!this.model.isGameOver()) {
      let move: Move;

      if (this.gameMode === 1 && this.model.curr_player.symbol === this.model.aiPlayer?.symbol) {
        // AI's turn
        move = this.model.aiPlayer.determineBestMove(this.model.board);
        this.view.showAIMove(move);
      } else {
        // Human player's turn
        move = this.view.getMove(this.model.curr_player);
        while (!this.model.isLegalMove(move, this.model.curr_player)) {
          this.view.showIllegalMove(move);
          move = this.view.getMove(this.model.curr_player);
        }
      }

      this.model.makeMove(move);
      this.view.displayBoard();

      this.model.switchPlayers();
    }

    // Game is over
    const winner = this.model.getWinner();
    if (!winner) {
      this.view.showDraw();
    } else {
      this.view.showWinner(winner);
    }
  }
}

export default GameController;
