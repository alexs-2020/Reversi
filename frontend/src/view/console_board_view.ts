import Board from '../model/board'
import BoardView from './board_view'
import { symbolToStr } from '../model/player_symbol'
import GameState from '../controller/game_state'

class ConsoleBoardView extends BoardView {
  GameState: GameState
  constructor(board: Board, GameState: GameState) {
    super(board)
    this.GameState = GameState
  }

  display(): void {
    let message: string = 'board /n'
    // Print the board content and append row numbers at the end
    this.board.board.forEach((row, rowIndex) => {
      // Map each symbol in the row to its string representation
      const rowContent = row.map((symbol) => symbolToStr[symbol])
      // Append row number at the end, with a space for alignment
      message = message.concat(
        rowContent.join(' ') + ' ' + (rowIndex + 1).toString() + '\n',
      )
    })

    // Now, print the column numbers footer. We don't add an initial space for alignment here
    const footer = this.board.board[0]
      .map((_, index) => (index + 1).toString())
      .join(' ')

    // Print the column numbers, correctly aligned under the board's columns
    message = message.concat(footer) // Removed the single space at the beginning
    this.GameState.log(message)
  }
}

export default ConsoleBoardView
