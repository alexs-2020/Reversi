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
const game_view_1 = __importDefault(require("./game_view"));
const console_board_view_1 = __importDefault(require("./console_board_view"));
const move_1 = __importDefault(require("../model/move"));
const readlineSync = __importStar(require("readline-sync"));
const player_symbol_1 = require("../model/player_symbol");
class ConsoleGameView extends game_view_1.default {
    constructor(board) {
        super(new console_board_view_1.default(board));
    }
    logAndReturn(functionName, message) {
        console.log(message);
        return [functionName, message];
    }
    showPlayerScores(player1, player2) {
        return [
            "showPlayerScores",
            [
                this.logAndReturn("showPlayerScores", `\nPlayer ${player_symbol_1.symbolToStr[player1.symbol]} current score: ${player1.getScore()}`)[1],
                this.logAndReturn("showPlayerScores", `Player ${player_symbol_1.symbolToStr[player2.symbol]} current score: ${player2.getScore()}`)[1],
            ],
        ];
    }
    showCurrentPlayer(player) {
        return this.logAndReturn("showCurrentPlayer", `current player: Player ${player_symbol_1.symbolToStr[player.symbol]}`);
    }
    getMove(player) {
        return __awaiter(this, void 0, void 0, function* () {
            const moveInput = readlineSync.question(`\n \nPlayer ${player_symbol_1.symbolToStr[player.symbol]}, Enter your move (row,col): `) || "";
            const values = moveInput.split(",");
            if (values.length !== 2) {
                console.log("Invalid input. Please enter a valid move (row, col).");
                return this.getMove(player); // Retry input
            }
            const row = parseInt(values[0], 10) - 1;
            const col = parseInt(values[1], 10) - 1;
            if (isNaN(row) || isNaN(col)) {
                console.log("Invalid input. Please enter numeric values for row and col.");
                return this.getMove(player); // Retry input
            }
            return new move_1.default(row, col);
        });
    }
    showPossibleMove(moves) {
        return [
            "showPossibleMove",
            moves.map((move, index) => this.logAndReturn("showPossibleMove", `Move ${index + 1}: Row ${move.row + 1}, Column ${move.column + 1}`)[1]),
        ];
    }
    showWinner(player) {
        return this.logAndReturn("showWinner", `Player ${player_symbol_1.symbolToStr[player.symbol]} is the winner!`);
    }
    showIllegalMove(move) {
        return this.logAndReturn("showIllegalMove", `Illegal Move: Row ${move.row + 1}, Column ${move.column + 1}`);
    }
    showAIplays() {
        return this.logAndReturn("showAIplays", "AI plays");
    }
    showNoMovesLeft() {
        return this.logAndReturn("showNoMovesLeft", "There are no moves left");
    }
}
exports.default = ConsoleGameView;
