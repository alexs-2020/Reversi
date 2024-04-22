"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_view_1 = __importDefault(require("./board_view"));
const web_game_view_1 = require("./web_game_view");
const player_symbol_1 = require("../model/player_symbol");
class WebBoardView extends board_view_1.default {
    constructor(board) {
        super(board);
    }
    display() {
        // Initialize an empty array to hold the formatted rows
        let formattedRows = [];
        // Iterate over each row of the board
        this.board.board.forEach((row) => {
            // Convert each symbol in the row to its corresponding string representation
            const rowContent = row.map((symbol) => player_symbol_1.symbolToStr[symbol]);
            // Join the string representations with commas and add to the formattedRows array
            formattedRows.push(rowContent.join(","));
        });
        // Return the array containing the formatted rows
        return (0, web_game_view_1.logAndReturn)("display", formattedRows);
    }
}
exports.default = WebBoardView;
