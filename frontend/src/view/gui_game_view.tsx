// import GameView from "./game_view";
import React, { ReactNode, useState } from 'react'
// import Move from "../model/move";
// import Player from "../model/player";
// import Board from "../model/board";
// // @ts-ignore
// import * as readlineSync from 'readline-sync';
// import { symbolToStr } from "../model/player_symbol";
// import Chip from '../components/chips'
// import ConsoleBoardView from './console_board_view'

// class GUIGameView extends GameView {

//   constructor(board: Board) {
//     super(new ConsoleBoardView(board));
//   }

//  showPlayerScores(player1: Player, player2:Player): ReactNode {
//   return(
//     <div>
//       <p>
//         <Chip color={player1.color} />
//         current score: {player1.getScore()}
//       </p>
//       <p>
//         <Chip color={player1.color} />
//         current score: {player1.getScore()}
//       </p>
//     </div>
//   );
//  }

//   showCurrentPlayer(player: Player): ReactNode {
//     return(
//     <p>
//      Current Player <Chip color={player.color} />
//     </p>);

//   }

//   getMove(player: Player): Move {
//     const moveInput: string = readlineSync.question(`\n \nPlayer ${symbolToStr[player.symbol]}, Enter your move (row,col): `) || '';
//     const values: string[] = moveInput.split(',');
//     if (values.length !== 2) {
//       console.log('Invalid input. Please enter a valid move (row, col).');
//       return this.getMove(player); // Retry input
//     }
//     const row: number = parseInt(values[0], 10)-1;
//     const col: number = parseInt(values[1], 10)-1;

//     if (isNaN(row) || isNaN(col)) {
//     console.log('Invalid input. Please enter numeric values for row and col.');
//     return this.getMove(player); // Retry input
// }

//     return new Move(row, col);
//   }
//   showPossibleMove(moves: Move[]): void {
//     console.log("\nPossible Moves:");
//     moves.forEach((move, index) => {
//       console.log(`Move ${index + 1}: Row ${move.row+1}, Column ${move.column+1}`);
//     });}
//   showWinner(player: Player): void {
//     console.log(`Player ${symbolToStr[player.symbol]} is the winner!`);
//   }

//     showIllegalMove(move: Move): void {
//     console.log(`Illegal Move: Row ${move.row+1}, Column ${move.column+1}`);
//   }

//  showNoMovesLeft(): void {
//     console.log("There are no moves left");
//   }
// }

// export default GUIGameView;
