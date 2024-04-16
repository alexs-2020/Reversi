import Game from "./model/game";
import ConsoleGameView from "./view/console_game_view";
import GameController from "./controller/game_controller";

import * as readlineSync from 'readline-sync';
import PlayerSymbol from "./model/player_symbol";


// Function to get user input for board size 
function getBoardSizeFromUser(): number {
    const sizeInput: string = readlineSync.question('Enter the size of the board (Even number; Recommended range: 4-12 (recommendation = 8)):\n');
    const size: number = parseInt(sizeInput, 10);
    const isOdd:number = size%2 
    if (isNaN(size) ||isOdd || size <= 2 || size >= 13){
      console.log('Invalid input for board size. Please enter a valid number.');
      return getBoardSizeFromUser(); // Retry input
    }
  
    return size;
  }
  // default board size 
  let boardSize = 8;
  // Get the board size from the user
  const sizeInput: string = readlineSync.question('Do you want to enter a board size No = 0 and Yes = 1?\n');
  const wantsToEnterSize: number = parseInt(sizeInput, 10);
  if (wantsToEnterSize){
    boardSize= getBoardSizeFromUser()
  }

  function setAIdifficulty(): number{
    const aiDifficultyInput: string = readlineSync.question('Enter the difficulty level of the AI (Acceptable Values: 1-5):\n');
    const aiDifficulty: number = parseInt(aiDifficultyInput,10);
    if (aiDifficulty < 1 || aiDifficulty > 5){
      console.log('Invalid input for AI difficulty. Please enter a valid number\n');
      return setAIdifficulty(); //Retry input
    }
    return aiDifficulty;
  }
  
  function setGameMode(): number {
    const gameModeInput: string = readlineSync.question('Enter Game Mode: PvP local = 0 | PvAI = 1 | PvP online = 2\n');
    const gameModeValue: number = parseInt(gameModeInput, 10);
    if (gameModeValue === 0) {
      console.log('Selected Game Mode: PvP Local');
    } else if (gameModeValue === 1) {
      console.log('Selected Game Mode: PvAI');
    } else if (gameModeValue === 2) {
      console.log('PvP Online game mode currently unavailable');
      return setGameMode();
    } else {
      console.log('Please enter a valid input for game mode (0-2)');
      return setGameMode();
    }
    return gameModeValue;
  }



// Create instances of Game and ConsoleGameView
const game = new Game(boardSize);
const consoleGameView = new ConsoleGameView(game.board);

// Create an instance of GameController
const gameMode = setGameMode();
const gameController = new GameController(game, consoleGameView, gameMode);


// Run the game
if (gameMode === 1) {
    const aiDifficulty = setAIdifficulty();
    game.setupAIPlayer(PlayerSymbol.Black, aiDifficulty); // Assuming setupAIPlayer is a method in the Game class
}
gameController.startGame();
