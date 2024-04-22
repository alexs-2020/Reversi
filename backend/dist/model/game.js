"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMode = void 0;
const player_1 = __importDefault(require("./player"));
const board_1 = __importDefault(require("./board"));
const player_symbol_1 = __importDefault(require("./player_symbol"));
const game_rules_1 = __importDefault(require("./game_rules"));
const readlineSync = __importStar(require("readline-sync"));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["PvPLocal"] = 0] = "PvPLocal";
    GameMode[GameMode["PvAI"] = 1] = "PvAI";
    GameMode[GameMode["PvPOnline"] = 2] = "PvPOnline";
})(GameMode || (exports.GameMode = GameMode = {}));
class Game {
    // Constructor initializes the game with players, board, and rules
    constructor(size, player1Name, player2Name, play1Socket, player2Socket) {
        this.player1 = new player_1.default(player_symbol_1.default.Black, player1Name, play1Socket);
        this.player2 = new player_1.default(player_symbol_1.default.White, player2Name, player2Socket);
        this.board = new board_1.default(size);
        this.curr_player = this.player1;
        this.rules = new game_rules_1.default(this.board);
    }
    setUp() {
        this.setGameMode();
        this.AIDifficulty = this.getAIdifficulty();
    }
    // Check if a move is legal based on the current game state
    isLegalMove(move, valid_placement) {
        return this.rules.isLegalMove(move, valid_placement);
    }
    // Make a move on the board and update the game state
    makeMove(move) {
        this.rules.makeMove(move, this.curr_player, this.getOtherPlayer());
    }
    // Get valid placements for the current player
    getValidPlacements() {
        return this.rules.getValidPlacements(this.curr_player);
    }
    // Get the winner of the game
    getWinner() {
        return this.player1.getScore() > this.player2.getScore()
            ? this.player1
            : this.player2;
    }
    // Check if the game is over
    isGameOver() {
        return this.rules.isGameOver();
    }
    // Check if the game is drawn
    isGameDrawn() {
        return this.rules.isGameDrawn(this.getOtherPlayer());
    }
    // Switch players for the next turn
    switchPlayers() {
        this.curr_player =
            this.curr_player === this.player1 ? this.player2 : this.player1;
    }
    // Get the player who is not the current player
    getOtherPlayer() {
        return this.curr_player === this.player1 ? this.player2 : this.player1;
    }
    setAIdifficulty() {
        const aiDifficultyInput = readlineSync.question("Enter the difficulty level of the AI (Acceptable Values: 1-5):\n");
        const aiDifficulty = parseInt(aiDifficultyInput, 10);
        if (aiDifficulty < 1 || aiDifficulty > 5) {
            console.log("Invalid input for AI difficulty. Please enter a valid number\n");
            return this.setAIdifficulty(); //Retry input
        }
        this.AIDifficulty = aiDifficulty;
    }
    getAIdifficulty() {
        return this.AIDifficulty;
    }
    setGameMode() {
        const gameModeInput = readlineSync.question("Enter Game Mode: PvP local = 0 | PvAI = 1 | PvP online = 2\n");
        const gameModeValue = parseInt(gameModeInput, 10);
        if (gameModeValue === 0) {
            console.log("Selected Game Mode: PvP Local");
        }
        else if (gameModeValue === 1) {
            console.log("Selected Game Mode: PvAI");
        }
        else if (gameModeValue === 2) {
            console.log("Selected Game Mode: PvP online");
        }
        else {
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
    getGameMode() {
        return this.gameMode;
    }
    // Method to clone the current instance of the Game
    // Clone the game
    clone() {
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
exports.default = Game;
