import Game from "../model/game";

class GameController {
  private model: Game;
  private view: any;

  constructor(model: Game, view: any) {
    this.model = model;
    this.view = view;
  }

  startGame(): void {
    /* Runs the main loop of the game
      Implement the logic for starting the game here*/
  }
}

export default GameController;
