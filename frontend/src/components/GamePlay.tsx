import React, { useEffect } from 'react';
import Game from '../model/game';
import ConsoleGameView from '../view/console_game_view';
import GameController from '../controller/game_controller';
import { useGameSettings } from '../GameSettingsProvider'
const GameComponent = () => {
  const { currboardSize} = useGameSettings();
  useEffect(() => {
    // Create a new game instance
    const game = new Game(currboardSize)

    // Create a new console game view instance
    const view = new ConsoleGameView(game.board);

    // Create a new game controller instance with the game and view
    const gameController = new GameController(game, view);

    // Start the game
    gameController.startGame();
  }, []);

  return (
    <div>
      {/* Render your game board and other UI elements here */}
    </div>
  );
};

export default GameComponent;
