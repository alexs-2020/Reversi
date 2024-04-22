"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAndReturn = void 0;
const game_view_1 = __importDefault(require("./game_view"));
const web_board_view_1 = __importDefault(require("./web_board_view"));
const move_1 = __importDefault(require("../model/move"));
const player_symbol_1 = require("../model/player_symbol");
function logAndReturn(functionName, message) {
    return [functionName, message]; // Returns a tuple (array with two elements)
}
exports.logAndReturn = logAndReturn;
class WebGameView extends game_view_1.default {
    constructor(board) {
        super(new web_board_view_1.default(board));
    }
    showPlayerScores(player1, player2) {
        return logAndReturn("showPlayerScores", `\nPlayer ${player_symbol_1.symbolToStr[player1.symbol]} current score: ${player1.getScore()} \n 
          Player ${player_symbol_1.symbolToStr[player2.symbol]} current score: ${player2.getScore()}`);
    }
    showCurrentPlayer(player) {
        return logAndReturn("showCurrentPlayer", `current player: Player ${player.username}`);
    }
    getMove(player, io) {
        const socketId = player.socketId;
        return new Promise((resolve, reject) => {
            var _a;
            let moveReceived = false;
            // Set a timeout for 30 seconds to wait for the player's move
            const timeout = setTimeout(() => {
                if (!moveReceived) {
                    // Inform the player that the move was not received in time
                    io.to(socketId).emit("moveTimeout", "No move received within 30 seconds");
                    reject(new Error("No move received within 30 seconds"));
                }
            }, 30000); // Corrected to 30 seconds
            if (!io) {
                reject(new Error("Server not provided"));
                return;
            }
            // Register a listener for the player's move
            (_a = io.sockets.sockets.get(socketId)) === null || _a === void 0 ? void 0 : _a.once(`playerMove`, (row, col) => {
                if (!moveReceived) {
                    clearTimeout(timeout);
                    moveReceived = true;
                    const move = new move_1.default(row, col);
                    resolve(move);
                }
            });
        });
    }
    showPossibleMove(moves) {
        let message = "\nPossible Moves:";
        moves.forEach((move, index) => {
            message += `\nMove ${index + 1}: Row ${move.row + 1}, Column ${move.column + 1}`;
        });
        return logAndReturn("showPossibleMove", message);
    }
    showWinner(player) {
        return logAndReturn("showWinner", `Player ${player_symbol_1.symbolToStr[player.symbol]} is the winner!`);
    }
    showIllegalMove(move) {
        return logAndReturn("showIllegalMove", `Illegal Move: Row ${move.row + 1}, Column ${move.column + 1}`);
    }
    showAIplays() {
        return logAndReturn("showAIplays", "AI plays");
    }
    showNoMovesLeft() {
        return logAndReturn("showNoMovesLeft", "There are no moves left");
    }
}
exports.default = WebGameView;
