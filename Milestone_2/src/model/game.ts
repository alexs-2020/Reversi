import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
import Move from "./move";
class Game {
  /*
    The class attributes can be changed from public to private curren
    */
   curr_player: Player;
   player1: Player;
   player2: Player;
   board: Board;
   rules: GameRules;
   winner: Player | null; 


  constructor(size: number, rules: GameRules) {
    this.player1 = new Player(PlayerSymbol.X);
    this.player2 = new Player(PlayerSymbol.O);
    this.board = new Board(size);
    this.curr_player = this.player1;
    this.rules = rules;
    this.winner =null; 
  }

  isLegalMove(move:Move): Boolean {
    /*
    Method to check if a move is legal
    */
    // Implementation goes here
    return this.rules.isLegalMove(move);

  }

  makeMove(move:Move): void {
    /*
     Method to make a move
     */
    // Implementation goes here
  }
  getWinner():  Player | null{
    return this.winner; 
  }
  isGameOver(): boolean {
    /*
     Method to check if game is over 
     */
    return false
    
  }
  switchPlayers(): void{

  }

}
export default Game;
