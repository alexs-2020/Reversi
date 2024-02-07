import Move from "../model/move";
import BoardView from "./board_view";
import * as readline from 'readline';
import Board from "../model/board";



class GameView {
  // boardView: BoardView;
    public board: Board
    constructor(board: Board) {
      this.board = board;
    }

  // constructor(boardView: BoardView) {
  //   this.boardView = boardView;
  // }

  // abstract showCurrPlayer(): void;

  // abstract getMove(): void;

  // abstract showIllegalMove(move: Move): void;

  // abstract showWinner(player: any): void;

  displayBoard(): void {
    this.board.printGrid()
  }


  getMove(): Promise<Move> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
  
      rl.question('Enter row: ', (userInput1) => {
        rl.question('Enter col: ', (userInput2) => {
          const row = parseInt(userInput1, 10);
          const col = parseInt(userInput2, 10);
          rl.close();
          if (!isNaN(row) && !isNaN(col)) {
            resolve(new Move(row, col));
          } else {
            console.log('Invalid input. Please enter valid numbers.');
            this.getMove().then(resolve);
          }
        });
      });
    });
      
      //below can be used once implemented in browser
      // const move: string = prompt("Enter your move (row, col):") || "";
      // const values: string[] = move.split(",");
      // const row: number = parseInt(values[0], 10);
      // const col: number = parseInt(values[1], 10);
      // return new Move(row, col);
    }
}

export default GameView;
