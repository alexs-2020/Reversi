// PlaceDiskCommand.ts
import ICommand from "./ICommand"
import Game from "../model/game";
import Move from "../model/move";

class PlaceDiskCommand implements ICommand {
  private game: Game;
  private move: Move;

  constructor(game: Game, move: Move) {
    this.game = game;
    this.move = move;
  }

  execute(): void {
    this.game.makeMove(this.move);
  }
}
export default PlaceDiskCommand