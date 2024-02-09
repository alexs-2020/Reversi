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
      let ValidPlacements: { move: Move, valid_direction:number, positions: { row: number, col: number }[] }[]= this.model.getValidPlacements()
      let ValidMoves: Move[] = this.model.getValidPlacements().map(validPlacement => validPlacement.move);
      this.view.showCurrentPlayer(this.model.curr_player)
      this.view.showPossibleMove(ValidMoves);
      this.view.showPlayerScores(this.model.player1, this.model.player2)

      let move: Move = this.view.getMove(this.model.curr_player);
      if (ValidPlacements.length>0) {
        while (!this.model.isLegalMove(move, ValidPlacements)) {
          this.view.showIllegalMove(move);
          move = this.view.getMove(this.model.curr_player);
        }
          this.model.makeMove(move);
          this.view.displayBoard();
          if (this.model.isGameOver()) {
              this.view.showWinner(this.model.curr_player);
              break
            }
          this.model.switchPlayers();
        }
      else{
        if (this.model.isGameDrawn()){
          this.view.showDraw();
          break
        }
         this.model.switchPlayers();}
    }
  }
}

export default GameController;
