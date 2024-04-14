import IGameState from "./Interface_game_state"
import GameController from "../game_controller"
// PlayState.ts
class PlayState implements IGameState {
    handleInput(gameController: GameController, input: string): void {
        // Handle input specific to the play state
    }

    update(gameController: GameController): void {
        // Update logic for the play state
    }

    render(gameController: GameController): void {
        // Render the game play screen
    }
}

export default PlayState