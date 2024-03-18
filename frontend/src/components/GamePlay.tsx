import React, { useEffect, useState } from 'react';
import Game from '../model/game';
import ConsoleGameView from '../view/console_game_view';
import GameController from '../controller/game_controller';
import { useGameSettings } from '../GameSettingsProvider';
import Move from '../model/move';

const GamePlay = () => {
  const { currboardSize, GState, currMove, play, boardInfo, setBoardInfo, game, setGame, view, setView } = useGameSettings();
  const [isGameOver, setIsGameOver] = useState(false);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const [gameController, setGameController] = useState<GameController | null>(null);

  useEffect(() => {
    // Initialize the game controller
    const controller = new GameController(game, view);
    setGameController(controller);
  }, [game, view]);

  useEffect(() => {
    // Check if the game is over
    setIsGameOver(game.isGameOver());
    // Retrieve valid placements and moves for the current player
    let validPlacements = game.getValidPlacements();
    let moves = validPlacements.map((validPlacement) => validPlacement.move);
    setValidMoves(moves);
  }, [game]); // Add game to dependency array if it can change

  useEffect(() => {
    if (play && gameController) {
      // Update the board information
      setBoardInfo(game.get_boardInfo());
      console.log(view.getMoveGUI(game.curr_player));

      // Display the board and check for game over
      view.displayBoard();
      if (game.isGameOver()) {
        setIsGameOver(true);
      } else {
        // Retrieve valid placements and moves for the current player
        let validPlacements = game.getValidPlacements();
        let validMoves = validPlacements.map((validPlacement) => validPlacement.move);

        // Handle player move and switch players
        if (validPlacements.length > 0 && currMove) {
          if (game.isLegalMove(currMove, validPlacements)) {
            game.makeMove(currMove);
            view.displayBoard();
            game.switchPlayers();
          } else {
            view.showIllegalMove(currMove);
          }
        }
      }
    }
  }, [play, currMove, game, view, setBoardInfo,GState, gameController]);

  // Render your game's UI here
  return (
    <div>
      <p>{GState.log_message}</p>
      {/* Add more game-related UI components here */}
    </div>
  );
};

export default GamePlay;
