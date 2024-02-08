import Game from "./model/game";
import ConsoleGameView from "./view/console_game_view";
import GameController from "./controller/game_controller";
import * as readlineSync from 'readline-sync';

// Function to get user input for board size 
function getBoardSizeFromUser(): number {
    const sizeInput: string = readlineSync.question('Enter the size of the board (Even number; Recommended range: 4-12 (recommendation = 8)):');
    const size: number = parseInt(sizeInput, 10);
    const isOdd:number = size%2 
    if (isNaN(size) ||isOdd || size <= 2 || size >= 13){
      console.log('Invalid input. Please enter a valid number.');
      return getBoardSizeFromUser(); // Retry input
    }
  
    return size;
  }
  // default board size 
  let boardSize = 8;
  // Get the board size from the user
  const sizeInput: string = readlineSync.question('Do you want to enter a board size No = 0 and Yes = 1?');
  const wantsToEnterSize: number = parseInt(sizeInput, 10);
  if (wantsToEnterSize){
    boardSize= getBoardSizeFromUser()
  }





// Create instances of Game and ConsoleGameView
const game = new Game(boardSize);
const consoleGameView = new ConsoleGameView(game.board);

// Create an instance of GameController
const gameController = new GameController(game, consoleGameView);

// Run the game
gameController.startGame();
