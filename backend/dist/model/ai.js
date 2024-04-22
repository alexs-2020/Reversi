"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_symbol_1 = __importDefault(require("./player_symbol"));
const move_1 = __importDefault(require("./move"));
const game_rules_1 = __importDefault(require("./game_rules"));
// import { Clonable } from './clonable';
class AI {
    constructor(game, difficulty = 1) {
        this.symbol = game.AIPlayer.symbol;
        this.game = game;
        this.gameRules = game.rules;
        this.difficulty = game.AIDifficulty;
        this.aiPlayer = game.AIPlayer;
        this.opponentPlayer =
            game.player1 === game.AIPlayer ? game.player2 : game.player1;
    }
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }
    determineBestMove() {
        const game_rules = new game_rules_1.default(this.gameRules.board);
        const [, bestMove] = this.minimax(game_rules, this.difficulty, true, -Infinity, Infinity);
        if (bestMove) {
            return bestMove;
        }
        // If no best move is found, return a random legal move as the default
        const legalMoves = this.getAllPossibleMoves(this.gameRules, this.aiPlayer);
        if (legalMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * legalMoves.length);
            return legalMoves[randomIndex];
        }
        // If there are no legal moves, return a dummy move (this should be handled appropriately in your game logic)
        return new move_1.default(-1, -1);
    }
    minimax(gameRules, depth, isMaximizingPlayer, alpha, beta) {
        if (depth === 0 || gameRules.isGameOver()) {
            return [this.evaluateBoard(gameRules), null];
        }
        let bestMove = null;
        if (isMaximizingPlayer) {
            let maxEval = -Infinity;
            const possibleMoves = this.getAllPossibleMoves(gameRules, this.aiPlayer);
            for (const move of possibleMoves) {
                const newGameRules = new game_rules_1.default(gameRules.board.clone());
                newGameRules.makeMove(move, this.aiPlayer, this.opponentPlayer);
                const [evaluation] = this.minimax(newGameRules, depth - 1, false, alpha, beta);
                if (evaluation > maxEval) {
                    maxEval = evaluation;
                    bestMove = move;
                }
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) {
                    break;
                }
            }
            return [maxEval, bestMove];
        }
        else {
            let minEval = Infinity;
            const possibleMoves = this.getAllPossibleMoves(gameRules, this.aiPlayer);
            for (const move of possibleMoves) {
                const newGameRules = new game_rules_1.default(gameRules.board.clone());
                newGameRules.makeMove(move, this.opponentPlayer, this.opponentPlayer);
                const [evaluation] = this.minimax(newGameRules, depth - 1, true, alpha, beta);
                if (evaluation < minEval) {
                    minEval = evaluation;
                    bestMove = move;
                }
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) {
                    break;
                }
            }
            return [minEval, bestMove];
        }
    }
    evaluateBoard(gameRules) {
        // Heuristic evaluation factors
        const pieceCount = this.getPieceCount(gameRules.board, this.aiPlayer.symbol);
        const mobility = this.getAllPossibleMoves(gameRules, this.aiPlayer).length -
            this.getAllPossibleMoves(gameRules, this.opponentPlayer).length; // Consider the difference in mobility
        const stability = this.getStability(gameRules.board, this.aiPlayer.symbol);
        const cornerOccupancy = this.getCornerOccupancy(gameRules.board, this.aiPlayer.symbol);
        const edgeControl = this.getEdgeControl(gameRules.board, this.aiPlayer.symbol);
        const potentialMobility = this.getPotentialMobility(gameRules.board);
        // Weights for each factor (these can be adjusted based on their perceived importance)
        const weights = {
            pieceCount: 1, // Reduce the weight of piece count
            mobility: 3,
            stability: 4,
            cornerOccupancy: 5,
            edgeControl: 2,
            potentialMobility: 3,
        };
        // Weighted sum of heuristic factors
        return (weights.pieceCount * pieceCount +
            weights.mobility * mobility +
            weights.stability * stability +
            weights.cornerOccupancy * cornerOccupancy +
            weights.edgeControl * edgeControl +
            weights.potentialMobility * potentialMobility);
    }
    getPieceCount(board, symbol) {
        let count = 0;
        for (let row = 0; row < board.size; row++) {
            for (let col = 0; col < board.size; col++) {
                if (board.board[row][col] === symbol) {
                    count++;
                }
            }
        }
        return count;
    }
    getStability(board, symbol) {
        // For simplicity, count the number of pieces on the edges and corners as stable
        let stability = 0;
        const edgeRows = [0, board.size - 1];
        const edgeCols = [0, board.size - 1];
        edgeRows.forEach((row) => {
            for (let col = 0; col < board.size; col++) {
                if (board.board[row][col] === symbol) {
                    stability++;
                }
            }
        });
        edgeCols.forEach((col) => {
            for (let row = 0; row < board.size; row++) {
                if (board.board[row][col] === symbol) {
                    stability++;
                }
            }
        });
        return stability;
    }
    getCornerOccupancy(board, symbol) {
        //valued as better get corner occupancy
        const corners = [
            [0, 0],
            [0, board.size - 1],
            [board.size - 1, 0],
            [board.size - 1, board.size - 1],
        ];
        let occupancy = 0;
        corners.forEach(([row, col]) => {
            if (board.board[row][col] === symbol) {
                occupancy++;
            }
        });
        return occupancy;
    }
    getEdgeControl(board, symbol) {
        let control = 0;
        for (let row = 0; row < board.size; row++) {
            if (board.board[row][0] === symbol)
                control++;
            if (board.board[row][board.size - 1] === symbol)
                control++;
        }
        for (let col = 1; col < board.size - 1; col++) {
            if (board.board[0][col] === symbol)
                control++;
            if (board.board[board.size - 1][col] === symbol)
                control++;
        }
        return control;
    }
    getPotentialMobility(board) {
        let potentialMoves = 0;
        for (let row = 0; row < board.size; row++) {
            for (let col = 0; col < board.size; col++) {
                if (board.board[row][col] === player_symbol_1.default.Empty) {
                    const adjacentCells = [
                        [row - 1, col - 1],
                        [row - 1, col],
                        [row - 1, col + 1],
                        [row, col - 1],
                        [row, col + 1],
                        [row + 1, col - 1],
                        [row + 1, col],
                        [row + 1, col + 1],
                    ];
                    const isAdjacentToOpponent = adjacentCells.some(([r, c]) => {
                        return (r >= 0 &&
                            r < board.size &&
                            c >= 0 &&
                            c < board.size &&
                            board.board[r][c] === this.opponentPlayer.symbol);
                    });
                    if (isAdjacentToOpponent) {
                        potentialMoves++;
                    }
                }
            }
        }
        return potentialMoves;
    }
    getAllPossibleMoves(gameRules, player) {
        const validPlacements = gameRules.getValidPlacements(player);
        const possibleMoves = [];
        validPlacements.forEach(({ move }) => {
            possibleMoves.push(move);
        });
        return possibleMoves;
    }
}
exports.default = AI;
