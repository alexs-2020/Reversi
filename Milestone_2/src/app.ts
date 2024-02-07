import Game from "./model/game";
import ConsoleGameView from "./view/console_game_view";
import GameController from "./controller/game_controller";
import GameRules from "./model/game_rules";
import Board from "./model/board";
import * as readlineSync from 'readline-sync';

// Function to get user input for board size 
// function getBoardSizeFromUser(): number {
//     const sizeInput: string = readlineSync.question('Enter the size of the board(Even number):');
//     const size: number = parseInt(sizeInput, 10);
  
//     if (isNaN(size) ) {
//       console.log('Invalid input. Please enter a valid number.');
//       return getBoardSizeFromUser(); // Retry input
//     }
  
//     return size;
//   }



// Get the board size from the user
const boardSize = 8;

// Create instances of Game and ConsoleGameView
const game = new Game(boardSize);
const consoleGameView = new ConsoleGameView(game.board);

// Create an instance of GameController
const gameController = new GameController(game, consoleGameView);

// Run the game
gameController.startGame();
