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

  constructor(size: number) {
    this.player1 = new Player(PlayerSymbol.Black);
    this.player2 = new Player(PlayerSymbol.White);
    this.board = new Board(size);
    this.curr_player = this.player1;
    this.rules = new GameRules(this.board);
    this.winner =null; 
  }

  isLegalMove(move:Move): Boolean {
    
    return this.rules.isLegalMove(move, this.curr_player);

  }

  makeMove(move:Move): void {
   this.rules.makeMove(move, this.curr_player)
  }
  getWinner():  Player | null{
    return this.winner; 
  }
  isGameOver(): boolean {
    return this.rules.isGameOver()
    
  }
  switchPlayers(): void{
    this.curr_player = (this.curr_player === this.player1) ? this.player2 : this.player1;

  }

}
export default Game;
