import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
class Game {
  /*
    The class attributes can be changed from public to private based off needs
    */
  private curr_player: Player;
  public player1: Player;
  public player2: Player;
  public board: Board;
  public rules: GameRules;

  constructor(size: number, rules: GameRules) {
    this.player1 = new Player(PlayerSymbol.X);
    this.player2 = new Player(PlayerSymbol.O);
    this.board = new Board(size);
    this.curr_player = this.player1;
    this.rules = rules;
  }

  isLegalMove(row: number, col: number): Boolean {
    /*
    currently set as private method 
    Method to check if a move is legal
    */
    // Implementation goes here
    return this.rules.isLegalMove(row, col);
  }

  makeMove(row: number, col: number): void {
    /*
     currently set as private method 
     Method to make a move
     */
    // Implementation goes here
  }
  isGameOver() {
    /*
     currently set as private method 
     Method to check if game is over 
     */
  }
}
export default Game;
