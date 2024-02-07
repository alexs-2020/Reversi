import Player from "./player";
import Board from "./board";
import PlayerSymbol from "./player_symbol";
import GameRules from "./game_rules";
import Move from "./move";
import { moveEmitHelpers } from "typescript";


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


  isLegalMove(move: Move, player: number): Boolean {
    /*
    currently set as public method 
    Method to check if a move is legal
    */
    //all possible directions
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
  

    for (const element of directions) {
      //check if even valid on board - skip iteration
      if(move.row + element.row < 0 || move.row + element.row > this.board.getGrid.length - 1 ||  move.column + element.column < 0 || move.column + element.column > this.board.getGrid.length - 1){
          continue
      }
      //if a zero is found skip iteration
      if(this.board.getValue(move.row + element.row, move.column + element.column) == 0){
          continue
      } else if(this.board.getValue(move.row + element.row, move.column + element.column) !== player){
          // if an opposite player checker is found continue in that direction
          //only return true if same player checker found, else continue iteration
          if (this.checkDirection(move, element.row, element.column, player)) {
            return true;
          }  
        }
    }
    return false
  }

  //move in the direction untill same playe is found
  checkDirection(move: Move, row: number, col: number, player: number): Boolean {
    //temp variables for search
    let tempRow = move.row + (2*row); 
    let tempCol = move.column + (2*col);
    while (tempRow >= 0 && tempRow < this.board.getGrid.length && tempCol >= 0 && tempCol < this.board.getGrid[0].length) {    
      if(this.board.getValue(tempRow, tempCol) == 0 ){
        return false
      } else if(this.board.getValue(tempRow, tempCol) == player){
        return true //same player found
      }
      tempRow += row; 
      tempCol += col;
    }
    return false
  }

//TEMP DISPLAY BOARD

  makeMove(move: Move): void {
    /*
     currently set as publib method 
     Method to make a move
     */
    if(this.isLegalMove(move, this.player)){
      this.board.setValue(move.row, move.column, this.player);
      this.player = (this.player === 2) ? 1 : 2; //if valid placement switch player
    }
    else{
      console.log("not legal try again")
    }
   
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
