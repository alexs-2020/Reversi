"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_symbol_1 = __importDefault(require("./player_symbol"));
// Class representing the game board
class Board {
    // Constructor to initialize the board with default size or provided size
    constructor(size = 3) {
        this.size = size;
        // Creating a board when the Board object is instantiated
        this.board = Array.from({ length: size }, () => Array.from({ length: size }, () => player_symbol_1.default.Empty));
        // Placing initial game pieces
        const midLength = size / 2;
        this.board[midLength - 1][midLength - 1] = player_symbol_1.default.Black;
        this.board[midLength][midLength] = player_symbol_1.default.Black;
        this.board[midLength - 1][midLength] = player_symbol_1.default.White;
        this.board[midLength][midLength - 1] = player_symbol_1.default.White;
    }
    // Check if the board is full
    isBoardFull() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === player_symbol_1.default.Empty) {
                    return false; // Early return if an empty cell is found
                }
            }
        }
        return true; // Return true if all cells are occupied
    }
    // Method to clone the current instance of the board
    clone() {
        const clonedBoard = new Board(this.size);
        // Copy the values from the current board to the cloned board
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                clonedBoard.board[i][j] = this.board[i][j];
            }
        }
        return clonedBoard;
    }
}
exports.default = Board;
