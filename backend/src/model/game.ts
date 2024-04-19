import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
import Move from "./move";
import * as readlineSync from "readline-sync";
import Ai from "./ai";
import ConsoleBoardView from "../view/console_board_view";
export enum GameMode {
  PvPLocal = 0,
  PvAI = 1,
  PvPOnline = 2,
}
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
  gameMode!: GameMode;
  AIDifficulty!: number;
  AIPlayer!: Player;

  // Constructor initializes the game with players, board, and rules
  constructor(size: number) {
    this.player1 = new Player(PlayerSymbol.Black);
    this.player2 = new Player(PlayerSymbol.White);
    this.board = new Board(size);
    this.curr_player = this.player1;
    this.rules = new GameRules(this.board);
  }
  setUp() {
    this.setGameMode();
    this.AIDifficulty = this.getAIdifficulty();
  }

  // Check if a move is legal based on the current game state
  isLegalMove(
    move: Move,
    valid_placement: {
      move: Move;
      valid_direction: number;
      positions: { row: number; col: number }[];
    }[],
  ): Boolean {
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
  getWinner(): Player {
    return this.player1.getScore() > this.player2.getScore()
      ? this.player1
      : this.player2;
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
    this.curr_player =
      this.curr_player === this.player1 ? this.player2 : this.player1;
  }

  // Get the player who is not the current player
  getOtherPlayer(): Player {
    return this.curr_player === this.player1 ? this.player2 : this.player1;
  }

  setAIdifficulty(): void {
    const aiDifficultyInput: string = readlineSync.question(
      "Enter the difficulty level of the AI (Acceptable Values: 1-5):\n",
    );
    const aiDifficulty: number = parseInt(aiDifficultyInput, 10);
    if (aiDifficulty < 1 || aiDifficulty > 5) {
      console.log(
        "Invalid input for AI difficulty. Please enter a valid number\n",
      );
      return this.setAIdifficulty(); //Retry input
    }
    this.AIDifficulty = aiDifficulty;
  }
  getAIdifficulty(): number {
    return this.AIDifficulty;
  }
  setGameMode(): void {
    const gameModeInput: string = readlineSync.question(
      "Enter Game Mode: PvP local = 0 | PvAI = 1 | PvP online = 2\n",
    );
    const gameModeValue: number = parseInt(gameModeInput, 10);
    if (gameModeValue === 0) {
      console.log("Selected Game Mode: PvP Local");
    } else if (gameModeValue === 1) {
      console.log("Selected Game Mode: PvAI");
    } else if (gameModeValue === 2) {
      console.log("Selected Game Mode: PvP online");
    } else {
      console.log("Please enter a valid input for game mode (0-2)");
      return this.setGameMode();
    }
    this.gameMode = gameModeValue;
    console.log(`game mode before:${gameModeValue}`);

    // Run the game
    if (gameModeValue === 1) {
      this.setAIdifficulty(); // Assuming setupAIPlayer is a method in the Game class
      this.AIPlayer = this.getOtherPlayer();
    }
  }
  getGameMode(): number {
    return this.gameMode;
  }

  // Method to clone the current instance of the Game
  // Clone the game
  clone(): Game {
    const clone = new Game(this.board.size);
    clone.curr_player = this.curr_player;
    clone.player1 = this.player1;
    clone.player2 = this.player2;
    // Clone board, rules, gameMode, AIDifficulty, and AIPlayer as needed
    clone.board = this.board.clone(); // Assuming Board is immutable or properly cloned
    clone.rules = this.rules.clone(); // Assuming GameRules is immutable or properly cloned
    clone.gameMode = this.gameMode;
    clone.AIDifficulty = this.AIDifficulty;
    clone.AIPlayer = this.AIPlayer;
    return clone;
  }
}

// Export the Game class as the default export
export default Game;
