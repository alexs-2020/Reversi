import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
import Move from "./move";


class Game {
  /*
    The class attributes can be changed from public to private curren
    */
  private curr_player: Player;
  private player1: Player;
  private player2: Player;
  private board: Board;
  // private rules: GameRules;
  private winner: Player | null;
  private player: number;
  
  constructor(size: number, board: Board) { //rules: GameRules
    this.player1 = new Player(PlayerSymbol.X);
    this.player2 = new Player(PlayerSymbol.O);
    // this.board = new Board(size);
    this.curr_player = this.player1;
    // this.rules = rules;
    this.winner = null;
    this.player = 1;
    this.board = board;
  }

  // isLegalMove(move: Move): Boolean {
  //   /*
  //   currently set as public method 
  //   Method to check if a move is legal
  //   */
  //   // Implementation goes here

  //   return this.rules.isLegalMove(move);
  // }

  makeMove(move: Move): void {
    /*
     currently set as publib method 
     Method to make a move
     */
    // Implementation goes here
    this.player = (this.player === 2) ? 1 : 2; //switch player
    this.board.setValue(move.column, move.row, this.player);
  }



  getWinner(): Player | null {
    return this.winner;
  }
  isGameOver(): boolean {
    /*
     currently set as public method 
     Method to check if game is over 
     */
     for (let i = 0; i < this.board.getGrid.length; i++) {
      // Iterate over columns
      for (let j = 0; j < this.board.getGrid[i].length; j++) {
          // check if any spaces are empty or no valid placements
          if(this.board.getGrid[i][j] == 0){
            return false
          }
      }
    }
    return true;
  }
  switchPlayers() {}
}
export default Game;
