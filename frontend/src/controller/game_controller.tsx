import Game from '../model/game';
import ConsoleGameView from '../view/console_game_view';
import Move from '../model/move';

/**
 * GameController class controls the flow of the game by interacting with the model and view.
 * It initializes with a Game model and a ConsoleGameView, then starts the main game loop.
 */
class GameController {
  model: Game; // The game model
  view: ConsoleGameView; // The console game view


  /**
   * Constructor for GameController class.
   * @param {Game} model - The Game model instance.
   * @param {ConsoleGameView} view - The ConsoleGameView instance for rendering the game.
   */
  constructor(model: Game, view: ConsoleGameView ) {
    this.model = model;
    this.view = view;

  }

  startGame(): void {
    // Display initial game board
    this.view.displayBoard();

    // Main game loop
    while (!this.model.isGameOver()) {
      // Retrieve valid placements and moves for the current player
      let validPlacements = this.model.getValidPlacements();
      let validMoves = validPlacements.map((validPlacement) => validPlacement.move);

      // Display current player, possible moves, and player scores
      this.view.showCurrentPlayer(this.model.curr_player);
      this.view.showPossibleMove(validMoves);
      this.view.showPlayerScores(this.model.player1, this.model.player2);

      // Validate the move until a legal move is obtained
      if (validPlacements.length > 0) {
        let move = this.view.getMoveGUI(this.model.curr_player); // Assuming getMove is the correct method to use
        if (!this.model.isLegalMove(move, validPlacements)) {
          this.view.showIllegalMove(move);
          move = this.view.getMoveGUI(this.model.curr_player);
        }
        else {

        // Make the validated move, display the updated board
        this.model.makeMove(move);
        this.view.displayBoard();
      }
      } else {
        // Handle draw scenario
        if (this.model.isGameDrawn()) {
          this.view.showNoMovesLeft();
          break;
        }
      }

      // Check if the game is over
      if (this.model.isGameOver()) {
        this.view.showWinner(this.model.getWinner());
        break;
      }

      // Switch players for the next turn
      this.model.switchPlayers();
    }
  }
}

export default GameController;

