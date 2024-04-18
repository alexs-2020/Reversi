import Game, { GameMode } from "../model/game";
import ConsoleGameView from "../view/console_game_view";
import Move from "../model/move";
import ai from "../model/ai";
import Ai from "../model/ai";
import player from "../model/player";
import console_game_view from "../view/console_game_view";
import board from "../model/board";

/**
 * GameController class controls the flow of the game by interacting with the model and view.
 * It initializes with a Game model and a ConsoleGameView, then starts the main game loop.
 */
class GameController {
  model: Game; // The game model
  view: ConsoleGameView; // The console game view
  mode: GameMode;
  AI!: Ai;

  /**
   * Constructor for GameController class.
   * @param {Game} model - The Game model instance.
   * @param {ConsoleGameView} view - The ConsoleGameView instance for rendering the game.
   */
  constructor(model: Game, view: ConsoleGameView) {
    this.model = model;
    this.model.setUp();
    this.view = view;
    this.mode = model.getGameMode();
    console.log(`get game mode returning ${this.mode}`);
  }
  playAIMove(
    valid_placement: {
      move: Move;
      valid_direction: number;
      positions: { row: number; col: number }[];
    }[],
  ): void {
    this.view.showAIplays();

    const ai_score = this.model.AIPlayer.getScore();
    const human_score =
      this.model.player1 == this.model.AIPlayer
        ? this.model.player2.getScore()
        : this.model.player1.getScore();

    const best_move = this.AI.determineBestMove();

    this.model.AIPlayer.changeScore(ai_score);
    this.model.player1 == this.model.AIPlayer
      ? this.model.player2.changeScore(human_score)
      : this.model.player1.changeScore(human_score);
    while (!this.model.isLegalMove(best_move, valid_placement)) {
      this.AI.determineBestMove();
    }

    this.model.makeMove(best_move);
  }
  playHuman(
    valid_placement: {
      move: Move;
      valid_direction: number;
      positions: { row: number; col: number }[];
    }[],
  ) {
    let move: Move = this.view.getMove(this.model.curr_player);
    while (!this.model.isLegalMove(move, valid_placement)) {
      this.view.showIllegalMove(move);
      move = this.view.getMove(this.model.curr_player);
    }

    // Make the validated move, display the updated board
    this.model.makeMove(move);
  }

  /**
   * Initiates the main loop of the game.
   */
  startGame(): void {
    // Display initial game board
    this.view.displayBoard();
    console.log(`game mode is : ${this.mode}`);
    if (this.mode === GameMode.PvAI) {
      this.AI = new Ai(this.model, this.model.AIDifficulty);
    }

    // Main game loop
    while (true) {
      // Retrieve valid placements and moves for the current player
      let validPlacements: {
        move: Move;
        valid_direction: number;
        positions: { row: number; col: number }[];
      }[] = this.model.getValidPlacements();
      let validMoves: Move[] = validPlacements.map(
        (validPlacement) => validPlacement.move,
      );

      // Display current player, possible moves, and player scores
      this.view.showCurrentPlayer(this.model.curr_player);
      this.view.showPossibleMove(validMoves);
      this.view.showPlayerScores(this.model.player1, this.model.player2);
      // Validate the move until a legal move is obtained
      if (validPlacements.length > 0) {
        // Get move from the current player
        if (
          this.model.getGameMode() === GameMode.PvAI &&
          this.model.curr_player === this.model.AIPlayer
        ) {
          this.playAIMove(validPlacements);
        } else {
          this.playHuman(validPlacements);
        }
        this.view.displayBoard();
        console.log("new game\n\n");

        // Check if the game is over
        if (this.model.isGameOver()) {
          this.view.showWinner(this.model.getWinner());
          break;
        }

        // Switch players for the next turn
        this.model.switchPlayers();
      } else {
        // Handle draw scenario and switch players
        if (this.model.isGameDrawn()) {
          this.view.showNoMovesLeft();
          this.view.showWinner(this.model.getWinner());
          break;
        }
        this.model.switchPlayers();
      }
    }
  }
}

export default GameController;
