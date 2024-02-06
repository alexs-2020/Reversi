import Board from "../model/board";
import BoardView from "./board_view";
import { symbolToStr } from "../model/player_symbol";

class ConsoleBoardView extends BoardView {
  constructor(board: Board) {
    super(board);
  }

  display(): void {
    //currently public
    // Implementation for display method goes here
    for (let row of this.board.board) {
      console.log(row.map(symbol => symbolToStr[symbol]).join(' '));
    }
  }
}

export default ConsoleBoardView;
