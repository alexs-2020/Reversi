import Game from "../model/game";
import ConsoleGameView from "../view/console_game_view";
import Move from "../model/move";
import Player from "../model/player";
import web_game_view from "../view/web_game_view";
/**
 * GameController class controls the flow of the game by interacting with the model and view.
 * It initializes with a Game model and a ConsoleGameView, then starts the main game loop.
 */
class GameController {
  model: Game;                // The game model
  view: ConsoleGameView| web_game_view;      // The console game view

  /**
   * Constructor for GameController class.
   * @param {Game} model - The Game model instance.
   * @param {ConsoleGameView} view - The ConsoleGameView instance for rendering the game.
   */
  constructor(model: Game, view: ConsoleGameView) {
    this.model = model;
    this.view = view;
  }

  /**
   * Initiates the main loop of the game.
   */
  startGame(): void {
    // Display initial game board
    this.view.displayBoard();


    // Main game loop
    while (true) {
      // Retrieve valid placements and moves for the current player
      let validPlacements: {
        move: Move,
        valid_direction: number,
        positions: { row: number, col: number }[]
      }[] = this.model.getValidPlacements();
      let validMoves: Move[] = validPlacements.map(validPlacement => validPlacement.move);

      // Display current player, possible moves, and player scores
      this.view.showCurrentPlayer(this.model.curr_player);
      this.view.showPossibleMove(validMoves);
      this.view.showPlayerScores(this.model.player1, this.model.player2);


      // Validate the move until a legal move is obtained
      if (validPlacements.length > 0) {
        // Get move from the current player
        let move: Move =this.view.getMove(this.model.curr_player);
        while (!this.model.isLegalMove(move, validPlacements)) {
          this.view.showIllegalMove(move);
          move = this.view.getMove(this.model.curr_player);
        }

        // Make the validated move, display the updated board
        this.model.makeMove(move);
        this.view.displayBoard();

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
