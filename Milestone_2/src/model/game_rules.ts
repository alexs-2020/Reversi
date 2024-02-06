import Move from "./move";
import Player from "./player";
class GameRules {
  constructor() {
    // Constructor logic goes here
  }

  isLegalMove(move: Move): boolean {
    /*
    Method to check if a move is legal
        */
    // Implementation goes here
    return true;
  }

  makeMove(move: Move, curr_player:Player): void {
    /* Method to make a move
     */
    // Implementation goes here
  }
  isGameOver():boolean{
    return false; 
  }
}
export default GameRules;
