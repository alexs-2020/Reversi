import Board from "../model/board";
import BoardView from "./board_view";
import { logAndReturn } from "./web_game_view";
import { symbolToStr } from "../model/player_symbol";

class WebBoardView extends BoardView {
  constructor(board: Board) {
    super(board);
  }

  display(): [string,string] {
    // Initialize an empty array to hold the formatted rows
    let formattedRows: string[] = [];

    // Iterate over each row of the board
    this.board.board.forEach((row) => {
      // Convert each symbol in the row to its corresponding string representation
      const rowContent = row.map((symbol) => symbolToStr[symbol]);
      // Join the string representations with commas and add to the formattedRows array
      formattedRows.push(rowContent.join(","));
    });

    // Return the array containing the formatted rows
    return logAndReturn("display", formattedRows);
  }
}

export default WebBoardView;
