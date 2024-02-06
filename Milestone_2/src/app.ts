
import Board from "./model/board";
import GameController from "./controller/game_controller";
class HelloWorld {
    constructor() {
        console.log("Hello, World!");
        game = new GameController();
        let myGrid = new Board(4);
       myGrid.printGrid();
       myGrid.setValue(1,-2,2)
       myGrid.printGrid();
    }

    
// Example usage:


// // Set value at cell (1, 2)
// myGrid.setValue(1, 2, 42);

// // Get value at cell (1, 2)
// const cellValue = myGrid.getValue(1, 2);
// console.log(`Value at cell (1, 2): ${cellValue}`);










}

new HelloWorld();
