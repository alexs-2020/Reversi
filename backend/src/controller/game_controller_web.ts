import Game, {GameMode} from "../model/game";
import Move from "../model/move";
import Ai from "../model/ai";
import WebGameView from "../view/web_game_view";
import {Server} from "socket.io";


/**
 * GameController class controls the flow of the game by interacting with the model and view.
 * It initializes with a Game model and a ConsoleGameView, then starts the main game loop.
 */
class GameController {
  model: Game; // The game model
  view: WebGameView; // The console game view
  mode: GameMode;
  AI!: Ai;
  io: Server;
  gameId:any

  constructor(model: Game, view: WebGameView, io: Server, gameId:any) {
    this.model = model;
    this.view = view;
    this.mode = GameMode.PvPOnline;
    this.io = io;
    this.gameId= gameId
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
  async playHuman(

    valid_placement: {
      move: Move;
      valid_direction: number;
      positions: { row: number; col: number }[];
    }[],
  ) {
    console.log('awaiting  move')
    let move: Move = await Promise.resolve(
      this.view.getMove(this.model.curr_player, this.io),
    );
    while (!this.model.isLegalMove(move, valid_placement)) {
      this.view.showIllegalMove(move);
      move = await Promise.resolve(
        this.view.getMove(this.model.curr_player, this.io),
      );
    }

    // Make the validated move, display the updated board
    this.model.makeMove(move);
  }

  updateSocket(log: [string, string]) {
    // Correct destructuring from tuple
    let [func, message] = log;
    console.log(log)

    this.io.to(this.gameId).emit('updateGame',log)
  }
  /**
   * Initiates the main loop of the game.
   */
  async startGame(): Promise<void >{
    // Display initial game board

    let ans=this.view.displayBoard()
     console.log('ans:',  ans)

    this.updateSocket(ans);

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
      this.updateSocket(this.view.showCurrentPlayer(this.model.curr_player));
      this.updateSocket(this.view.showPossibleMove(validMoves));
      this.updateSocket(
        this.view.showPlayerScores(this.model.player1, this.model.player2),
      );
      // Validate the move until a legal move is obtained
      if (validPlacements.length > 0) {
        // Get move from the current player
        if (
          this.model.getGameMode() === GameMode.PvAI &&
          this.model.curr_player === this.model.AIPlayer
        ) {
          this.playAIMove(validPlacements);
        } else {
          await this.playHuman(validPlacements);
        }
        this.updateSocket(this.view.displayBoard());
        console.log("new game\n\n");

        // Check if the game is over
        if (this.model.isGameOver()) {
          this.updateSocket(this.view.showWinner(this.model.getWinner()));
          break;
        }

        // Switch players for the next turn
        this.model.switchPlayers();
      } else {
        // Handle draw scenario and switch players
        if (this.model.isGameDrawn()) {
          this.updateSocket(this.view.showNoMovesLeft());
          this.updateSocket(this.view.showWinner(this.model.getWinner()));
          break;
        }
        this.model.switchPlayers();
      }

    }
  }
}

export default GameController;
