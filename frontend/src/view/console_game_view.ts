import GameView from './game_view'
import ConsoleBoardView from './console_board_view'
import Move from '../model/move'
import Player from '../model/player'
import Board from '../model/board'
import GameState from '../controller/game_state'
// @ts-ignore
//import * as readlineSync from 'readline-sync';
import { symbolToStr } from '../model/player_symbol'
import Game_state from '../controller/game_state'

class ConsoleGameView extends GameView {
  Gamestate: GameState
  Move: Move
  constructor(board: Board, gamestate: GameState = new Game_state(), Move:Move) {
    super(new ConsoleBoardView(board, gamestate))
    this.Gamestate = gamestate
    this.Move=Move
    
    
  }
  

  showPlayerScores(player1: Player, player2: Player): void {
    this.Gamestate.log(
      `showPlayerScores \n \nPlayer ${symbolToStr[player1.symbol]} current score: ${player1.getScore()}`,
    )
    this.Gamestate.log(
      `showPlayerScores Player ${symbolToStr[player2.symbol]} current score: ${player2.getScore()}`,
    )
  }
  showCurrentPlayer(player: Player): void {
    this.Gamestate.log(
      `showCurrentPlayer current player: Player ${symbolToStr[player.symbol]}`,
    )
  }
  getMoveGUI(player: Player,): Move {
    return this.Move
  }
  setMoveGUI(Move:Move,player?: Player,): void {
    this.Move=Move
  }

  getMove(player: Player): Move {
    //  const moveInput: string = readlineSync.question(`\n \nPlayer ${symbolToStr[player.symbol]}, Enter your move (row,col): `) || '';
    // const values: string[] = moveInput.split(',');
    // if (values.length !== 2) {
    //   console.log('Invalid input. Please enter a valid move (row, col).');
    //   return this.getMove(player); // Retry input
    // }
    // const row: number = parseInt(values[0], 10)-1;
    // const col: number = parseInt(values[1], 10)-1;
    //
    // if (isNaN(row) || isNaN(col)) {
    // console.log('Invalid input. Please enter numeric values for row and col.');
    // return this.getMove(player); // Retry input
    // }
    //
    //
    return new Move(-1, -1)
  }
  showPossibleMove(moves: Move[]): void {
    this.Gamestate.log('showPossibleMove \nPossible Moves:')
    moves.forEach((move, index) => {
      this.Gamestate.log(
        `showPossibleMove Move ${index + 1}: Row ${move.row + 1}, Column ${move.column + 1}`,
      )
    })
  }
  showWinner(player: Player): void {
    this.Gamestate.log(
      `showWinner Player ${symbolToStr[player.symbol]} is the winner!`,
    )
  }

  showIllegalMove(move: Move): void {
    this.Gamestate.log(
      `showIllegalMove Illegal Move: Row ${move.row + 1}, Column ${move.column + 1}`,
    )
  }

  showNoMovesLeft(): void {
    this.Gamestate.log('showNoMovesLeft There are no moves left')
  }
}

export default ConsoleGameView
