"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../model/game");
const ai_1 = __importDefault(require("../model/ai"));
/**
 * GameController class controls the flow of the game by interacting with the model and view.
 * It initializes with a Game model and a ConsoleGameView, then starts the main game loop.
 */
class GameController {
    constructor(model, view, io, gameId) {
        this.model = model;
        this.view = view;
        this.mode = game_1.GameMode.PvPOnline;
        this.io = io;
        this.gameId = gameId;
        console.log(`get game mode returning ${this.mode}`);
    }
    playAIMove(valid_placement) {
        this.view.showAIplays();
        const ai_score = this.model.AIPlayer.getScore();
        const human_score = this.model.player1 == this.model.AIPlayer
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
    playHuman(valid_placement) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('awaiting  move');
            let move = yield Promise.resolve(this.view.getMove(this.model.curr_player, this.io));
            while (!this.model.isLegalMove(move, valid_placement)) {
                this.view.showIllegalMove(move);
                move = yield Promise.resolve(this.view.getMove(this.model.curr_player, this.io));
            }
            // Make the validated move, display the updated board
            this.model.makeMove(move);
        });
    }
    updateSocket(log) {
        // Correct destructuring from tuple
        let [func, message] = log;
        console.log(log);
        this.io.to(this.gameId).emit('updateGame', log);
    }
    /**
     * Initiates the main loop of the game.
     */
    startGame() {
        return __awaiter(this, void 0, void 0, function* () {
            // Display initial game board
            let ans = this.view.displayBoard();
            console.log('ans:', ans);
            this.updateSocket(ans);
            if (this.mode === game_1.GameMode.PvAI) {
                this.AI = new ai_1.default(this.model, this.model.AIDifficulty);
            }
            // Main game loop
            while (true) {
                // Retrieve valid placements and moves for the current player
                let validPlacements = this.model.getValidPlacements();
                let validMoves = validPlacements.map((validPlacement) => validPlacement.move);
                // Display current player, possible moves, and player scores
                this.updateSocket(this.view.showCurrentPlayer(this.model.curr_player));
                this.updateSocket(this.view.showPossibleMove(validMoves));
                this.updateSocket(this.view.showPlayerScores(this.model.player1, this.model.player2));
                // Validate the move until a legal move is obtained
                if (validPlacements.length > 0) {
                    // Get move from the current player
                    if (this.model.getGameMode() === game_1.GameMode.PvAI &&
                        this.model.curr_player === this.model.AIPlayer) {
                        this.playAIMove(validPlacements);
                    }
                    else {
                        yield this.playHuman(validPlacements);
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
                }
                else {
                    // Handle draw scenario and switch players
                    if (this.model.isGameDrawn()) {
                        this.updateSocket(this.view.showNoMovesLeft());
                        this.updateSocket(this.view.showWinner(this.model.getWinner()));
                        break;
                    }
                    this.model.switchPlayers();
                }
            }
        });
    }
}
exports.default = GameController;
