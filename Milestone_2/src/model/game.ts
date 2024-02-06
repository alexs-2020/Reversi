import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
import Move from "./move";


class Game {
  /*
    The class attributes can be changed from public to private curren
    */
  private curr_player: Player;
  private player1: Player;
  private player2: Player;
  private board: Board;
  // private rules: GameRules;
  private winner: Player | null;
  private player: number;
  
  constructor(size: number, board: Board) { //rules: GameRules
    this.player1 = new Player(PlayerSymbol.X);
    this.player2 = new Player(PlayerSymbol.O);
    // this.board = new Board(size);
    this.curr_player = this.player1;
    // this.rules = rules;
    this.winner = null;
    this.player = 1;
    this.board = board;
  }


  isLegalMove(move: Move, player: Number): Boolean {
    /*
    currently set as public method 
    Method to check if a move is legal
    */
    //possible directions
    const directions: Move[] = [
      { row: -1, column: 0 }, // Up
      { row: 1, column: 0 },  // Down
      { row: 0, column: -1 }, // Left
      { row: 0, column: 1 },  // Right
      { row: -1, column: -1 },// Up-left
      { row: -1, column: 1 }, // Up-right
      { row: 1, column: -1 }, // Down-left
      { row: 1, column: 1 },  // Down-right
    ];
    // const { row, col } = position;

    directions.forEach(element => {
      if(this.board.getValue(move.row + element.row, move.column + element.column) == 0){
          //continue search / skip
      } else if(this.board.getValue(move.row + element.row, move.column + element.column) !== player){
          // go in this directions 
          //only return true if valid direction, else continue iteration
          if (this.checkDirection(move, element.row, element.column, player)) {
            return true;
          }  
    });
    return false

    // //must place in empty spot
    // if(this.board.getValue(move.row, move.column) !== 0){
    //   return false
    // } else if(move.row >= size || move.column >= size)[ //must place within range
    //   return false
    // ]

    // const captured: Position[] = [];

    // for(){
    //   move.column + 1
    // }


    // // Implementation goes here

    // return this.rules.isLegalMove(move);
  }

  //move in the direction untill same playe is found
  checkDirection(move: Move, row: number, col: number, player: Number): Boolean {
    while (row >= 0 && row < this.board.getGrid.length && col >= 0 && col < this.board.getGrid[0].length) {
      move.row += row; 
      move.column += col;
      if(this.board.getValue(row, col) == 0 ){
        return false
      } else if(this.board.getValue(row, col) == player {
        return true //same player found
      }
    }
    return false
  }


  makeMove(move: Move): void {
    /*
     currently set as publib method 
     Method to make a move
     */
    this.player = (this.player === 2) ? 1 : 2; //switch player
    this.board.setValue(move.column, move.row, this.player);
  }



  getWinner(): Player | null {
    return this.winner;
  }
  isGameOver(): boolean {
    /*
     currently set as public method 
     Method to check if game is over 
     */
     for (let i = 0; i < this.board.getGrid.length; i++) {
      // Iterate over columns
      for (let j = 0; j < this.board.getGrid[i].length; j++) {
          // check if any spaces are empty or no valid placements
          if(this.board.getGrid[i][j] == 0){
            return false
          }
      }
    }
    return true;
  }
  switchPlayers() {}







}
export default Game;
