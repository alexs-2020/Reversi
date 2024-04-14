import IGameState from "./Interface_game_state";
import StartState from "./start_state";
import Game from "../../model/game";
import IView from "../../view/Interface_view";
import ConsoleViewAdapter from '../../view/console_view_adapter';
import WebViewAdapter from '../../view/web_view_adapter';

export default class GameController {
    private state: IGameState;
    model: Game;                // The game model
    view: IView;                // The game view

    constructor(model: Game, view: IView) {
        this.state = new StartState();
        this.model = model;
        this.view = view;
    }

    startGame(): void {
        // Implementation of startGame method
    }

    setState(state: IGameState): void {
        this.state = state;
    }

    handleInput(input: string): void {
        this.state.handleInput(this, input); 
    }

    update(): void {
        this.state.update(this);
    }

    render(): void {
        this.state.render(this);
    }
}


// // Usage example:
// const model = new Game();
// const consoleView = new ConsoleViewAdapter();
// const webView = new WebViewAdapter();

// const consoleGameController = new GameController(model, consoleView);
// const webGameController = new GameController(model, webView);

// // Start the game with console view
// consoleGameController.startGame();

// // Or start the game with web view
// webGameController.startGame();
