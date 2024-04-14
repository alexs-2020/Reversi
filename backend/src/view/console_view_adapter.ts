import Board from '../model/board';
import ConsoleBoardView from './console_board_view';
import ConsoleGameView  from './console_game_view';
import IView from './Interface_view';
import { messageProps } from './Interface_view';

export default class ConsoleViewAdapter implements IView {
  private boardView: ConsoleBoardView;
  private gameView: ConsoleGameView;
  private board: Board

  constructor(board:Board) {
    this.boardView = new ConsoleBoardView(board);
    this.gameView = new ConsoleGameView(board);
    this.board = board
  }

  displayBoard(board: string[][]): void {
    this.boardView.display();
  }

  displayMessage(message: messageProps ): void {
    this.gameView.displayMessage(message);
  }
}
