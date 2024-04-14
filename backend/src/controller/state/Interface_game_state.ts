import GameController from "../game_controller";
// IGameState.ts

interface IGameState {
    handleInput(gameController:GameController, input: string): void;
    update(gameController:GameController): void;
    render(gameController:GameController): void;
}


export default IGameState