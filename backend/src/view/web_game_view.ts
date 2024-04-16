import GameView from "./game_view";
import Move from "../model/move";
import Player from "../model/player";
import Board from "../model/board";
import PlayerSymbol, { symbolToStr } from "../model/player_symbol";
import WebBoardView from "./web_board_view";
import { Server as SocketIoServer } from 'socket.io';
import move from "../model/move";

class WebGameView extends GameView {
    socket: SocketIoServer;
 constructor(board: Board, socket:SocketIoServer) {
    super(new WebBoardView(board));
    this.socket=socket

  }

  showAIMove(move: Move): void {
    // Implement the logic to display the AI move on the web interface
    this.socket.emit(`AI played at position (${move.row + 1}, ${move.column + 1})`);
  }

  showPlayerScores(player1: Player, player2: Player): void {
    // Implement the logic to display player scores on the web interface
    this.socket.emit(`\n \nPlayer ${symbolToStr[player1.symbol]} current score: ${player1.getScore()}`);
    this.socket.emit(`Player ${symbolToStr[player2.symbol]} current score: ${player2.getScore()}`);
  }

  showCurrentPlayer(player: Player): void {
    // Implement the logic to display the current player on the web interface
    this.socket.emit(`current player: Player ${symbolToStr[player.symbol]}`);
  }

 getMove(player: Player): Move {
    let move: Move | null = null;
    const callback = (row: number, col: number) => {
        console.log(`Received row:${row} col:${col}`);
        move = new Move(row, col);
    };

    this.socket.on('sendMove', callback);

    // Wait until the move is received
    while (move === null) {
        // This is a blocking loop, consider adding a timeout or some other way to prevent infinite waiting
    }

    // Unsubscribe from the 'sendMove' event
    this.socket.off('sendMove', callback);

    return move;
}


  showPossibleMove(moves: Move[]): void {
    // Implement the logic to display possible moves on the web interface
    this.socket.emit("\nPossible Moves:");
    moves.forEach((move, index) => {
      this.socket.emit(`Move ${index + 1}: Row ${move.row + 1}, Column ${move.column + 1}`);
    });
  }

  showWinner(player: Player): void {
    // Implement the logic to display the winner on the web interface
    this.socket.emit(`Player ${symbolToStr[player.symbol]} is the winner!`);
  }

  showIllegalMove(move: Move): void {
    // Implement the logic to display an illegal move on the web interface
    this.socket.emit(`Illegal Move: Row ${move.row + 1}, Column ${move.column + 1}`);
  }

  showNoMovesLeft(): void {
    // Implement the logic to display a message when no moves are left on the web interface
    this.socket.emit("There are no moves left");
  }
}

export default WebGameView;
