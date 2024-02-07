import Board from "./board";
import Move from "./move";
import Player from "./player";
class GameRules {
  board: Board
  constructor(board: Board) {
    // Constructor logic goes here
    this.board = board
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
