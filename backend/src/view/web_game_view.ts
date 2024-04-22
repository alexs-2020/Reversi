import GameView from "./game_view";
import WebBoardView from "./web_board_view";
import Move from "../model/move";
import Player from "../model/player";
import Board from "../model/board";
import { Server, Socket } from "socket.io";
import PlayerSymbol, { symbolToStr } from "../model/player_symbol";

export function logAndReturn(
  functionName: string,
  message: any,
): [string, any] {
  return [functionName, message]; // Returns a tuple (array with two elements)
}

class WebGameView extends GameView {
  constructor(board: Board) {
    super(new WebBoardView(board));
  }

  showPlayerScores(player1: Player, player2: Player): [string, string] {
    return logAndReturn(
      "showPlayerScores",
      `\nPlayer ${symbolToStr[player1.symbol]} current score: ${player1.getScore()} \n 
          Player ${symbolToStr[player2.symbol]} current score: ${player2.getScore()}`,
    );
  }

  showCurrentPlayer(player: Player): [string, string] {
    return logAndReturn(
      "showCurrentPlayer",
      `current player: Player ${player.username}`,
    );
  }
  getMove(player:Player, io:Server): Promise<Move> {
    const socketId = player.socketId;
    return new Promise((resolve, reject) => {
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
      io.sockets.sockets.get(socketId)?.once(`playerMove`, (row, col) => {
        if (!moveReceived) {
          clearTimeout(timeout);
          moveReceived = true;
          const move = new Move(row, col);
          resolve(move);
        }
      });
    });
  }

  showPossibleMove(moves: Move[]): [string, string] {
    let message = "\nPossible Moves:";
    moves.forEach((move, index) => {
      message += `\nMove ${index + 1}: Row ${move.row + 1}, Column ${move.column + 1}`;
    });
    return logAndReturn("showPossibleMove", message);
  }

  showWinner(player: Player): [string, string] {
    return logAndReturn(
      "showWinner",
      `Player ${symbolToStr[player.symbol]} is the winner!`,
    );
  }

  showIllegalMove(move: Move): [string, string] {
    return logAndReturn(
      "showIllegalMove",
      `Illegal Move: Row ${move.row + 1}, Column ${move.column + 1}`,
    );
  }

  showAIplays(): [string, string] {
    return logAndReturn("showAIplays", "AI plays");
  }

  showNoMovesLeft(): [string, string] {
    return logAndReturn("showNoMovesLeft", "There are no moves left");
  }
}

export default WebGameView;
