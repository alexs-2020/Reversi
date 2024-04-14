import Board from '../model/board';

import IView from './Interface_view';
import { messageProps } from './Interface_view';

export default  class WebViewAdapter implements IView {
  private boardView: WebBoardView;
  private gameView: WebGameView;
  private board: Board

  constructor(board:Board) {
    this.boardView = new WebBoardView(board);
    this.gameView = new WebGameView(board);
    this.board = board
  }

  displayBoard(board: string[][]): void {
    this.boardView.display();
  }

  displayMessage(message: messageProps ): void {
    this.gameView.displayMessage(message);
  }
}
