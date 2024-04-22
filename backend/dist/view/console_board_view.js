"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_view_1 = __importDefault(require("./board_view"));
const player_symbol_1 = require("../model/player_symbol");
class ConsoleBoardView extends board_view_1.default {
    constructor(board) {
        super(board);
    }
    display() {
        // Print the board content and append row numbers at the end
        this.board.board.forEach((row, rowIndex) => {
            // Map each symbol in the row to its string representation
            const rowContent = row.map((symbol) => player_symbol_1.symbolToStr[symbol]);
            // Append row number at the end, with a space for alignment
            console.log(rowContent.join(" ") + " " + (rowIndex + 1).toString());
        });
        // Now, print the column numbers footer. We don't add an initial space for alignment here
        const footer = this.board.board[0]
            .map((_, index) => (index + 1).toString())
            .join(" ");
        // Print the column numbers, correctly aligned under the board's columns
        console.log(footer); // Removed the single space at the beginning
        return ['console', 'done'];
    }
}
exports.default = ConsoleBoardView;
