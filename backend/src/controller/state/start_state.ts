// StartState.ts
import IGameState from "./Interface_game_state"
import GameController from "../game_controller"

class StartState implements IGameState {
    handleInput(gameController: GameController, input: string): void {
        // Handle input specific to the start state
    }

    update(gameController: GameController): void {
        // Update logic for the start state
    }

    render(gameController: GameController): void {
        // Render the start screen
    }
}
export default StartState