"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const move_1 = __importDefault(require("./move"));
const player_symbol_1 = __importDefault(require("./player_symbol"));
class GameRules {
    constructor(board) {
        // Constructor logic goes here
        this.board = board;
        this.valid_directions = 0;
        this.validMove = { move: null, valid_direction: 0, positions: null };
    }
    changeBoard(board) {
        this.board = board;
    }
    isLegalMove(move, valid_placement) {
        const foundPlacement = valid_placement.find(({ move: { row, column } }) => row === move.row && column === move.column);
        this.validMove = foundPlacement || {
            move: null,
            valid_direction: 0,
            positions: null,
        };
        return !!foundPlacement;
    }
    getLegalMove(move, curr_player) {
        // Find the directions it moves
        let positions = []; // Initialize positions as an empty array
        this.valid_directions = 0;
        const directions = [
            { row: -1, col: 0 }, // Up
            { row: 1, col: 0 }, // Down
            { row: 0, col: -1 }, // Left
            { row: 0, col: 1 }, // Right
            { row: -1, col: -1 }, // Up-Left
            { row: -1, col: 1 }, // Up-Right
            { row: 1, col: -1 }, // Down-Left
            { row: 1, col: 1 }, // Down-Right
        ];
        directions.forEach((direction) => {
            positions.push(...this.checkDirection(move, direction, curr_player.symbol));
        });
        return positions;
    }
    checkDirection(move, direction, symbol) {
        let positions = [];
        let curr_mv = [
            move.row + direction.row,
            move.column + direction.col,
        ];
        // Change loop condition to use dynamic indices and check for boundaries
        while (curr_mv[0] >= 0 &&
            curr_mv[0] < this.board.size &&
            curr_mv[1] >= 0 &&
            curr_mv[1] < this.board.size &&
            this.board.board[curr_mv[0]][curr_mv[1]] !== player_symbol_1.default.Empty) {
            positions.push({ row: curr_mv[0], col: curr_mv[1] });
            // Adjust the condition to check against the symbol
            if (this.board.board[curr_mv[0]][curr_mv[1]] == symbol) {
                this.valid_directions += 1;
                return positions;
            }
            // Update curr_mv for the next iteration
            curr_mv = [curr_mv[0] + direction.row, curr_mv[1] + direction.col];
        }
        return [];
    }
    flipPieces(positions, valid_direction, player, other_player) {
        positions.forEach((pos) => (this.board.board[pos.row][pos.col] = player.symbol));
        player.updateScore(positions.length - valid_direction);
        other_player.updateScore((positions.length - valid_direction) * -1);
    }
    makeMove(move, curr_player, other_player) {
        this.board.board[move.row][move.column] = curr_player.symbol;
        if (this.validMove.positions) {
            this.flipPieces(this.validMove.positions, this.validMove.valid_direction, curr_player, other_player);
        }
        curr_player.updateScore(1);
    }
    //check if player has any valid playable moves
    getValidPlacements(player) {
        // Iterate through all positions on the board
        const valid_placements = [];
        for (let row = 0; row < this.board.board.length; row++) {
            for (let col = 0; col < this.board.board[0].length; col++) {
                if (this.board.board[row][col] == player_symbol_1.default.Empty) {
                    let curr_mv = new move_1.default(row, col);
                    let positions = this.getLegalMove(curr_mv, player);
                    if (positions.length > this.valid_directions) {
                        valid_placements.push({
                            move: curr_mv,
                            valid_direction: this.valid_directions,
                            positions: positions,
                        });
                    }
                }
            }
        }
        return valid_placements;
    }
    isGameOver() {
        return this.board.isBoardFull();
    }
    isGameDrawn(other_player) {
        return this.getValidPlacements(other_player).length <= 0;
    }
    clone() {
        const clone = new GameRules(this.board.clone());
        clone.valid_directions = this.valid_directions;
        clone.validMove = {
            move: this.validMove.move,
            valid_direction: this.validMove.valid_direction,
            positions: this.validMove.positions,
        };
        return clone;
    }
}
exports.default = GameRules;
