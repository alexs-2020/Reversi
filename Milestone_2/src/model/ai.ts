import PlayerSymbol from "./player_symbol";
import Board from "./board";
import Move from "./move";
import GameRules from "./game_rules";
import Player from "./player";

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
        return bestMove || new Move(0, 0); // Return a default move if no best move is found
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
                if (board.board[move.row][move.column] === PlayerSymbol.Empty) { // Ensure the cell is empty
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
            }
            return [maxEval, bestMove];
        } else {
            let minEval = Infinity;
            const possibleMoves = this.getAllPossibleMoves(board, opponentSymbol);
            for (const move of possibleMoves) {
                if (board.board[move.row][move.column] === PlayerSymbol.Empty) { // Ensure the cell is empty
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
            }
            return [minEval, bestMove];
        }
    }
    

  evaluateBoard(board: Board, symbol: PlayerSymbol): number {
    let playerCount = 0;
    let opponentCount = 0;
    for (let row = 0; row < board.size; row++) {
      for (let col = 0; col < board.size; col++) {
        if (board.board[row][col] === symbol) {
          playerCount++;
        } else if (board.board[row][col] !== PlayerSymbol.Empty) {
          opponentCount++;
        }
      }
    }
    return playerCount - opponentCount;
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
