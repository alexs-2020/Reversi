
import Board from "./model/board";
import GameController from "./controller/game_controller";
import * as readline from 'readline';
// import * as readlineSync from 'readline-sync';
import GameView from "./view/game_view";
import Game from "./model/game";

var readlineSync = require('readline-sync');

class HelloWorld {
        private view: GameView;
        private game: Game;
        private controller: GameController;
        private board: Board;
    constructor() {
        console.log("Hello, World!");
        this.board = new Board()
          this.game = new Game(5, this.board)
          this.view = new GameView(this.board)
          this.controller =  new GameController(this.game, this.view);
            this.controller.startGame();
    //     let myGrid = new Board(4);
    //    myGrid.printGrid();
    //    myGrid.setValue(1,-2,2)
    //    myGrid.printGrid();
    // const value1: string = readlineSync.question('Enter the first value: ');

      


// Print the user input
// console.log(`You entered: ${userInput}`);
    }
// Example usage:


// // Set value at cell (1, 2)
// myGrid.setValue(1, 2, 42);

// // Get value at cell (1, 2)
// const cellValue = myGrid.getValue(1, 2);
// console.log(`Value at cell (1, 2): ${cellValue}`);










}

new HelloWorld();
