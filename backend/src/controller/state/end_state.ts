import IGameState from "./Interface_game_state"
import GameController from "../game_controller"

// EndState.ts
class EndState implements IGameState {
    handleInput(nput: string): void {
        // Handle input specific to the end state
    }

    update(): void {
        // Update logic for the end state
    }

    render(): void {
        // Render the end screen
    }
}
export default EndState
