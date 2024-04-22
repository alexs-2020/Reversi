import Board from "../model/board";

abstract class BoardView {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  abstract display():[string,string];
}

export default BoardView;
