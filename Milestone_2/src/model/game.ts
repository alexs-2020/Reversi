import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
import Move from "./move";
import AI from "./ai";

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
   aiPlayer: AI | null;
   gameRules: GameRules; 


  constructor(size: number) {
    this.player1 = new Player(PlayerSymbol.Black);
    this.player2 = new Player(PlayerSymbol.White);
    this.board = new Board(size);
    this.curr_player = this.player1;
    this.rules = new GameRules(this.board);
    this.winner =null;
    this.gameRules = new GameRules(this.board);
    this.aiPlayer = new AI(PlayerSymbol.Black, this.gameRules, 1); 
  }


  // Method to set up an AI player
  setupAIPlayer(symbol: PlayerSymbol, difficulty: number): void {
    this.aiPlayer = new AI(symbol, this.gameRules, difficulty);
  }

  

  makeMove(move: Move): void {
    this.rules.makeMove(this.board, move, this.curr_player);
  }
  
  getWinner(): Player | null {
    if (!this.gameRules.isGameOver(this.board)) {
      return null; // The game is not over yet
    }

    let blackCount = 0;
    let whiteCount = 0;
    for (let row = 0; row < this.board.size; row++) {
      for (let col = 0; col < this.board.size; col++) {
        if (this.board.board[row][col] === PlayerSymbol.Black) {
          blackCount++;
        } else if (this.board.board[row][col] === PlayerSymbol.White) {
          whiteCount++;
        }
      }
    }

    if (blackCount > whiteCount) {
      return this.player1.symbol === PlayerSymbol.Black ? this.player1 : this.player2;
    } else if (whiteCount > blackCount) {
      return this.player1.symbol === PlayerSymbol.White ? this.player1 : this.player2;
    } else {
      return null; // It's a draw
    }
  }
  
  isLegalMove(move: Move, player: Player): boolean {
    return this.gameRules.isLegalMove(this.board, move, player);
  }

  hasValidMoves(playerSymbol: PlayerSymbol): boolean {
    // Check if the player has any valid moves available
    for (let row = 0; row < this.board.size; row++) {
      for (let col = 0; col < this.board.size; col++) {
        if (this.board.board[row][col] === PlayerSymbol.Empty) {
          const move = new Move(row, col);
          const player = new Player(playerSymbol);
          if (this.isLegalMove(move, player)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isGameOver(): boolean {
    return this.isBoardFull() || !this.hasValidMoves(PlayerSymbol.Black) || !this.hasValidMoves(PlayerSymbol.White);
  }

  isBoardFull(): boolean {
    for (let row = 0; row < this.board.size; row++) {
      for (let col = 0; col < this.board.size; col++) {
        if (this.board.board[row][col] === PlayerSymbol.Empty) {
          return false; // Found an empty cell, so the board is not full
        }
      }
    }
    return true; // No empty cells found, so the board is full
  }

  switchPlayers(): void{
    this.curr_player = (this.curr_player === this.player1) ? this.player2 : this.player1;

  }

  makeAIMove(): void {
    if (this.aiPlayer) {
      const bestMove = this.aiPlayer.determineBestMove(this.board);
      this.makeMove(bestMove); // Assuming makeMove is a method that applies a move to the board
    }
  }

}
export default Game;
