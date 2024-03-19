import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
import Move from "./move";
class Game {
  /*
    The class attributes can be changed from public to private currently
  */
  // Players and board related attributes
  curr_player: Player;
  player1: Player;
  player2: Player;
  board: Board;
  rules: GameRules;

  // Constructor initializes the game with players, board, and rules
  constructor(size: number) {
    this.player1 = new Player(PlayerSymbol.Black);
    this.player2 = new Player(PlayerSymbol.White);
    this.board = new Board(size);
    this.curr_player = this.player1;
    this.rules = new GameRules(this.board);
  }

  // Check if a move is legal based on the current game state
  isLegalMove(move: Move, valid_placement: { move: Move; valid_direction: number; positions: { row: number; col: number }[] }[]): Boolean {
    return this.rules.isLegalMove(move, valid_placement);
  }

  // Make a move on the board and update the game state
  makeMove(move: Move): void {
    this.rules.makeMove(move, this.curr_player, this.getOtherPlayer());
  }

  // Get valid placements for the current player
  getValidPlacements() {
    return this.rules.getValidPlacements(this.curr_player);
  }

  // Get the winner of the game
  getWinner(): Player{
    return (this.player1.getScore()>this.player2.getScore())? this.player1: this.player2
  }

  // Check if the game is over
  isGameOver(): boolean {
    return this.rules.isGameOver();
  }

  // Check if the game is drawn
  isGameDrawn(): boolean {
    return this.rules.isGameDrawn(this.getOtherPlayer());
  }

  // Switch players for the next turn
  switchPlayers(): void {
    this.curr_player = this.curr_player === this.player1 ? this.player2 : this.player1;
  }

  // Get the player who is not the current player
  getOtherPlayer(): Player {
    return this.curr_player === this.player1 ? this.player2 : this.player1;
  }
}

// Export the Game class as the default export
export default Game;
