import PlayerSymbol from "./player_symbol";
import Board from "./board";
import Move from "./move";
import GameRules from "./game_rules";
import Player from "./player";
import { Clonable } from './clonable';



class AI {
    symbol: PlayerSymbol;
    difficulty: number;
    gameRules: GameRules;
    aiPlayer: Player;
    opponentPlayer: Player;

    constructor(symbol: PlayerSymbol, gameRules: GameRules, difficulty: number = 1) {
        this.symbol = symbol;
        this.gameRules = gameRules;
        this.difficulty = difficulty;
        this.aiPlayer = new Player(symbol);
        this.opponentPlayer = new Player(symbol === PlayerSymbol.Black ? PlayerSymbol.White : PlayerSymbol.Black);
    }

    setDifficulty(difficulty: number): void {
        this.difficulty = difficulty;
    }

    determineBestMove(board: Board): Move {
        const [, bestMove] = this.minimax(board, this.difficulty, true, -Infinity, Infinity, this.aiPlayer.symbol, this.opponentPlayer.symbol);
        if (bestMove) {
            return bestMove;
        }

        // If no best move is found, return a random legal move as the default
        const legalMoves = this.getAllPossibleMoves(board, this.aiPlayer.symbol);
        if (legalMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * legalMoves.length);
            return legalMoves[randomIndex];
        }

        // If there are no legal moves, return a dummy move (this should be handled appropriately in your game logic)
        return new Move(-1, -1);
    }

    minimax(
        board: Board,
        depth: number,
        isMaximizingPlayer: boolean,
        alpha: number,
        beta: number,
        currPlayerSymbol: PlayerSymbol,
        opponentSymbol: PlayerSymbol
    ): [number, Move | null] {
        if (depth === 0 || this.gameRules.isGameOver(board)) {
            return [this.evaluateBoard(board, currPlayerSymbol), null];
        }

        let bestMove: Move | null = null;

        if (isMaximizingPlayer) {
            let maxEval = -Infinity;
            const possibleMoves = this.getAllPossibleMoves(board, currPlayerSymbol);
            for (const move of possibleMoves) {
                const newBoard = board.clone();
                this.gameRules.makeMove(newBoard, move, this.aiPlayer);
                const [evaluation] = this.minimax(newBoard, depth - 1, false, alpha, beta, opponentSymbol, currPlayerSymbol);
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
        } else {
            let minEval = Infinity;
            const possibleMoves = this.getAllPossibleMoves(board, opponentSymbol);
            for (const move of possibleMoves) {
                const newBoard = board.clone();
                this.gameRules.makeMove(newBoard, move, this.opponentPlayer);
                const [evaluation] = this.minimax(newBoard, depth - 1, true, alpha, beta, currPlayerSymbol, opponentSymbol);
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

    evaluateBoard(board: Board, symbol: PlayerSymbol): number {
        // Heuristic evaluation factors
        const pieceCount = this.getPieceCount(board, symbol);
        const mobility = this.getMobility(board, symbol) - this.getMobility(board, this.opponentPlayer.symbol); // Consider the difference in mobility
        const stability = this.getStability(board, symbol);
        const cornerOccupancy = this.getCornerOccupancy(board, symbol);
        const edgeControl = this.getEdgeControl(board, symbol);
        const potentialMobility = this.getPotentialMobility(board, symbol);

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
        return weights.pieceCount * pieceCount +
               weights.mobility * mobility +
               weights.stability * stability +
               weights.cornerOccupancy * cornerOccupancy +
               weights.edgeControl * edgeControl +
               weights.potentialMobility * potentialMobility;
    }

    getPieceCount(board: Board, symbol: PlayerSymbol): number {
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

    getMobility(board: Board, symbol: PlayerSymbol): number {
        return this.getAllPossibleMoves(board, symbol).length;
    }

    getStability(board: Board, symbol: PlayerSymbol): number {
        // For simplicity, count the number of pieces on the edges and corners as stable
        let stability = 0;
        const edgeRows = [0, board.size - 1];
        const edgeCols = [0, board.size - 1];
        
        edgeRows.forEach(row => {
            for (let col = 0; col < board.size; col++) {
                if (board.board[row][col] === symbol) {
                    stability++;
                }
            }
        });
        
        edgeCols.forEach(col => {
            for (let row = 0; row < board.size; row++) {
                if (board.board[row][col] === symbol) {
                    stability++;
                }
            }
        });
        
        return stability;
    }

    getCornerOccupancy(board: Board, symbol: PlayerSymbol): number {
        const corners = [[0, 0], [0, board.size - 1], [board.size - 1, 0], [board.size - 1, board.size - 1]];
        let occupancy = 0;
        corners.forEach(([row, col]) => {
            if (board.board[row][col] === symbol) {
                occupancy++;
            }
        });
        return occupancy;
    }

    getEdgeControl(board: Board, symbol: PlayerSymbol): number {
        let control = 0;
        for (let row = 0; row < board.size; row++) {
            if (board.board[row][0] === symbol) control++;
            if (board.board[row][board.size - 1] === symbol) control++;
        }
        for (let col = 1; col < board.size - 1; col++) {
            if (board.board[0][col] === symbol) control++;
            if (board.board[board.size - 1][col] === symbol) control++;
        }
        return control;
    }

    getPotentialMobility(board: Board, symbol: PlayerSymbol): number {
        let potentialMoves = 0;
        for (let row = 0; row < board.size; row++) {
            for (let col = 0; col < board.size; col++) {
                if (board.board[row][col] === PlayerSymbol.Empty) {
                    const adjacentCells = [
                        [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
                        [row, col - 1],                   [row, col + 1],
                        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
                    ];
                    const isAdjacentToOpponent = adjacentCells.some(([r, c]) => {
                        return r >= 0 && r < board.size && c >= 0 && c < board.size && board.board[r][c] === this.opponentPlayer.symbol;
                    });
                    if (isAdjacentToOpponent) {
                        potentialMoves++;
                    }
                }
            }
        }
        return potentialMoves;
    }

    getAllPossibleMoves(board: Board, playerSymbol: PlayerSymbol): Move[] {
        let possibleMoves: Move[] = [];
        for (let row = 0; row < board.size; row++) {
            for (let col = 0; col < board.size; col++) {
                if (board.board[row][col] === PlayerSymbol.Empty) {
                    let move = new Move(row, col);
                    if (this.gameRules.isLegalMove(board, move, new Player(playerSymbol))) {
                        possibleMoves.push(move);
                    }
                }
            }
        }
        return possibleMoves;
    }
}

export default AI;
