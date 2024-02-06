import Game from "../model/game";
import ConsoleGameView from "../view/console_game_view";
import Move from "../model/move";
import GameView from "../view/game_view";



class GameController {
  // model: Game;
  // // view: ConsoleGameView;
  // view: GameView;
  // constructor(model: Game, view: GameView) {
  //   this.model = model;
  //   this.view = view;
  //   //this.board = board;
  // }

    model: Game;
    // view: ConsoleGameView;
    view: GameView;
    constructor(model: Game, view: GameView) {
      this.model = model;
      this.view = view;
    }


    async startGame() {
    // Runs the main loop of the game
      while (!this.model.isGameOver()) {      
        this.model.makeMove(await this.view.getMove());
        this.view.displayBoard()
    

      //maybe set board size
      // setup board
      //            this.model.makeMove(this.view.getMove());


      //first player start/place piece
          //if not valid place again
      //check end game
      //next player

    //   let move: Move = this.view.getMove();

    //   while (!this.model.isLegalMove(move)) {
    //     this.view.showIllegalMove(move);
    //     move = this.view.getMove();
    //   }

    //   this.model.makeMove(move);
    //   this.view.displayBoard();

    //   if (this.model.isGameOver()) {
    //     const winner = this.model.getWinner();
    //     if (!winner) {
    //       this.view.showDraw();
    //     } else {
    //       this.view.showWinner(winner);
    //     }
    //   }

    //   this.model.switchPlayers();
    }
  }
}

export default GameController;
