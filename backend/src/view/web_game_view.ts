import GameView from "./game_view";
import WebBoardView from "./web_board_view";
import Move from "../model/move";
import Player from "../model/player";
import Board from "../model/board";
import PlayerSymbol, { symbolToStr } from "../model/player_symbol";

class WebGameView extends GameView {
  constructor(board: Board) {
    super(new WebBoardView(board));
  }

  private logAndReturn(
    functionName: string,
    message: string,
  ): [string, string] {
    console.log(message);
    return [functionName, message];
  }

  showPlayerScores(player1: Player, player2: Player): [string, string[]] {
    return [
      "showPlayerScores",
      [
        this.logAndReturn(
          "showPlayerScores",
          `\nPlayer ${symbolToStr[player1.symbol]} current score: ${player1.getScore()}`,
        )[1],
        this.logAndReturn(
          "showPlayerScores",
          `Player ${symbolToStr[player2.symbol]} current score: ${player2.getScore()}`,
        )[1],
      ],
    ];
  }

  showCurrentPlayer(player: Player): [string, string] {
    return this.logAndReturn(
      "showCurrentPlayer",
      `current player: Player ${symbolToStr[player.symbol]}`,
    );
  }

  getMove(player: Player, row: number, col: number): Move {
    return new Move(row, col);
  }
  showPossibleMove(moves: Move[]): [string, string[]] {
    return [
      "showPossibleMove",
      moves.map(
        (move, index) =>
          this.logAndReturn(
            "showPossibleMove",
            `Move ${index + 1}: Row ${move.row + 1}, Column ${move.column + 1}`,
          )[1],
      ),
    ];
  }

  showWinner(player: Player): [string, string] {
    return this.logAndReturn(
      "showWinner",
      `Player ${symbolToStr[player.symbol]} is the winner!`,
    );
  }

  showIllegalMove(move: Move): [string, string] {
    return this.logAndReturn(
      "showIllegalMove",
      `Illegal Move: Row ${move.row + 1}, Column ${move.column + 1}`,
    );
  }

  showAIplays(): [string, string] {
    return this.logAndReturn("showAIplays", "AI plays");
  }

  showNoMovesLeft(): [string, string] {
    return this.logAndReturn("showNoMovesLeft", "There are no moves left");
  }
}

export default WebGameView;
