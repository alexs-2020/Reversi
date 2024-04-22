import Move from "../model/move";
import Player from "../model/player";
import { Server } from "socket.io";
import BoardView from "./board_view";

abstract class GameView {
  boardView: BoardView;

  constructor(boardView: BoardView) {
    this.boardView = boardView;
  }
  abstract showCurrentPlayer(player: Player): void;
  abstract showPlayerScores(player1: Player, player2: Player): void;

  abstract getMove(player: Player, io?: Server): Promise<Move>;

  abstract showPossibleMove(moves: Move[]): void;

  abstract showWinner(player: any): void;
  abstract showIllegalMove(move: Move): void;
  abstract showAIplays(): void;

  displayBoard():  [string,string] {
    return this.boardView.display();

  }
}

export default GameView;
