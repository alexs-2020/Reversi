import GameView from "./game_view";
import ConsoleBoardView from "./console_board_view";
import Move from "../model/move";
import Player from "../model/player";
import Board from "../model/board";
import * as readlineSync from "readline-sync";
import PlayerSymbol, { symbolToStr } from "../model/player_symbol";

class ConsoleGameView extends GameView {
  constructor(board: Board) {
    super(new ConsoleBoardView(board));
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

  getMove(player: Player): Move {
    const moveInput: string =
      readlineSync.question(
        `\n \nPlayer ${symbolToStr[player.symbol]}, Enter your move (row,col): `,
      ) || "";
    const values: string[] = moveInput.split(",");
    if (values.length !== 2) {
      console.log("Invalid input. Please enter a valid move (row, col).");
      return this.getMove(player); // Retry input
    }
    const row: number = parseInt(values[0], 10) - 1;
    const col: number = parseInt(values[1], 10) - 1;

    if (isNaN(row) || isNaN(col)) {
      console.log(
        "Invalid input. Please enter numeric values for row and col.",
      );
      return this.getMove(player); // Retry input
    }

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

export default ConsoleGameView;
