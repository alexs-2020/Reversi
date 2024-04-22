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
const game_1 = __importDefault(require("./model/game"));
const console_game_view_1 = __importDefault(require("./view/console_game_view"));
const game_controller_1 = __importDefault(require("./controller/game_controller"));
const readlineSync = __importStar(require("readline-sync"));
// Function to get user input for board size
function getBoardSizeFromUser() {
    const sizeInput = readlineSync.question("Enter the size of the board (Even number; Recommended range: 4-12 (recommendation = 8)):\n");
    const size = parseInt(sizeInput, 10);
    const isOdd = size % 2;
    if (isNaN(size) || isOdd || size <= 2 || size >= 13) {
        console.log("Invalid input for board size. Please enter a valid number.");
        return getBoardSizeFromUser(); // Retry input
    }
    return size;
}
// default board size
let boardSize = 8;
// Get the board size from the user
const sizeInput = readlineSync.question("Do you want to enter a board size No = 0 and Yes = 1?\n");
const wantsToEnterSize = parseInt(sizeInput, 10);
if (wantsToEnterSize) {
    boardSize = getBoardSizeFromUser();
}
// Create instances of Game and ConsoleGameView
const game = new game_1.default(boardSize);
const consoleGameView = new console_game_view_1.default(game.board);
const gameController = new game_controller_1.default(game, consoleGameView);
gameController.startGame();
