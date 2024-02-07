
import Board from "./model/board";
import GameController from "./controller/game_controller";
import GameView from "./view/game_view";
import Game from "./model/game";


class HelloWorld {
        private view: GameView;
        private game: Game;
        private controller: GameController;
        public board: Board;
    constructor() {
        console.log("Starting Game");
        this.board = new Board(6)
        this.game = new Game(6, this.board)
        this.view = new GameView(this.board)
        this.controller =  new GameController(this.game, this.view);
        this.controller.startGame();
    }
}

new HelloWorld();
