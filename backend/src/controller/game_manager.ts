import Game from "../model/game";
import ConsoleGameView from "../view/console_game_view";
import GameController from "./game_controller";

/**
 * GameManager class follows the Singleton pattern to ensure only one instance
 * of the game manager is created. It extends the GameController to control the game flow.
 */
class GameManager extends GameController {
  private static instance: GameManager | null = null;

  /**
   * Private constructor to prevent external instantiation.
   */
  private constructor(model: Game, view: ConsoleGameView) {
    super(model, view);
  }

  /**
   * Static method to get the singleton instance of the GameManager.
   * @param {Game} model - The Game model instance.
   * @param {ConsoleGameView} view - The ConsoleGameView instance for rendering the game.
   * @returns {GameManager} The singleton instance of the GameManager.
   */
  public static getInstance(model: Game, view: ConsoleGameView): GameManager {
    if (GameManager.instance === null) {
      GameManager.instance = new GameManager(model, view);
    }
    return GameManager.instance;
  }

  /**
   * Overrides the startGame method to add additional logic if needed.
   */
  public startGame(): void {
    super.startGame();
    // Additional logic for the singleton game manager can be added here.
  }
}

export default GameManager;
