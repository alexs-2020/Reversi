import Board from "../model/board";
import BoardView from "./board_view";
import { symbolToStr } from "../model/player_symbol";

class ConsoleBoardView extends BoardView {
  constructor(board: Board) {
    super(board);
  }

  display(): void {
    // Print the board content and append row numbers at the end
    this.board.board.forEach((row, rowIndex) => {
      // Map each symbol in the row to its string representation
      const rowContent = row.map((symbol) => symbolToStr[symbol]);
      // Append row number at the end, with a space for alignment
      console.log(rowContent.join(" ") + " " + (rowIndex + 1).toString());
    });

    // Now, print the column numbers footer. We don't add an initial space for alignment here
    const footer = this.board.board[0]
      .map((_, index) => (index + 1).toString())
      .join(" ");

    // Print the column numbers, correctly aligned under the board's columns
    console.log(footer); // Removed the single space at the beginning
  }
}

export default ConsoleBoardView;
