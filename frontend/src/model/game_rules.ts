import { check } from 'prettier'
import Board from './board'
import Move from './move'
import Player from './player'
import PlayerSymbol from './player_symbol'
import player_symbol from './player_symbol'
import player from './player'
import board from './board'
import move from './move'
import { builders } from 'prettier/doc'
import cursor = builders.cursor
class GameRules {
  board: Board
  valid_directions: number
  validMove: {
    move: Move | null
    valid_direction: number
    positions: { row: number; col: number }[] | null
  }

  constructor(board: Board) {
    // Constructor logic goes here
    this.board = board
    this.valid_directions = 0
    this.validMove = { move: null, valid_direction: 0, positions: null }
  }

  isLegalMove(
    move: Move,
    valid_placement: {
      move: Move
      valid_direction: number
      positions: { row: number; col: number }[]
    }[],
  ): boolean {
    const foundPlacement = valid_placement.find(
      ({ move: { row, column } }) => row === move.row && column === move.column,
    )

    this.validMove = foundPlacement || {
      move: null,
      valid_direction: 0,
      positions: null,
    }

    return !!foundPlacement
  }

  getLegalMove(
    move: Move,
    curr_player: Player,
  ): { row: number; col: number }[] {
    // Find the directions it moves
    let positions: { row: number; col: number }[] = [] // Initialize positions as an empty array
    this.valid_directions = 0

    const directions: { row: number; col: number }[] = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }, // Right
      { row: -1, col: -1 }, // Up-Left
      { row: -1, col: 1 }, // Up-Right
      { row: 1, col: -1 }, // Down-Left
      { row: 1, col: 1 }, // Down-Right
    ]

    directions.forEach((direction) => {
      positions.push(
        ...this.checkDirection(move, direction, curr_player.symbol),
      )
    })

    return positions
  }

  checkDirection(
    move: Move,
    direction: { row: number; col: number },
    symbol: PlayerSymbol,
  ): {
    row: number
    col: number
  }[] {
    let positions: { row: number; col: number }[] = []
    let curr_mv: [number, number] = [
      move.row + direction.row,
      move.column + direction.col,
    ]

    // Change loop condition to use dynamic indices and check for boundaries
    while (
      curr_mv[0] >= 0 &&
      curr_mv[0] < this.board.size &&
      curr_mv[1] >= 0 &&
      curr_mv[1] < this.board.size &&
      this.board.board[curr_mv[0]][curr_mv[1]] !== PlayerSymbol.Empty
    ) {
      positions.push({ row: curr_mv[0], col: curr_mv[1] })
      // Adjust the condition to check against the symbol
      if (this.board.board[curr_mv[0]][curr_mv[1]] == symbol) {
        this.valid_directions += 1
        return positions
      }

      // Update curr_mv for the next iteration
      curr_mv = [curr_mv[0] + direction.row, curr_mv[1] + direction.col]
    }

    return []
  }

  flipPieces(
    positions: { row: number; col: number }[],
    valid_direction: number,
    player: Player,
    other_player: Player,
  ): void {
    positions.forEach(
      (pos) => (this.board.board[pos.row][pos.col] = player.symbol),
    )
    player.updateScore(positions.length - valid_direction)
    other_player.updateScore((positions.length - valid_direction) * -1)
  }

  makeMove(move: Move, curr_player: Player, other_player: Player): void {
    this.board.board[move.row][move.column] = curr_player.symbol
    if (this.validMove.positions) {
      this.flipPieces(
        this.validMove.positions,
        this.validMove.valid_direction,
        curr_player,
        other_player,
      )
    }
    curr_player.updateScore(1)
  }

  //check if player has any valid playable moves
  getValidPlacements(player: Player): {
    move: Move
    valid_direction: number
    positions: { row: number; col: number }[]
  }[] {
    // Iterate through all positions on the board
    const valid_placements: {
      move: Move
      valid_direction: number
      positions: { row: number; col: number }[]
    }[] = []

    for (let row = 0; row < this.board.board.length; row++) {
      for (let col = 0; col < this.board.board[0].length; col++) {
        if (this.board.board[row][col] == PlayerSymbol.Empty) {
          let curr_mv = new Move(row, col)
          let positions = this.getLegalMove(curr_mv, player)
          if (positions.length > this.valid_directions) {
            valid_placements.push({
              move: curr_mv,
              valid_direction: this.valid_directions,
              positions: positions,
            })
          }
        }
      }
    }

    return valid_placements
  }

  isGameOver(): boolean {
    return this.board.isBoardFull()
  }

  isGameDrawn(other_player: Player): boolean {
    return this.getValidPlacements(other_player).length <= 0
  }
}
export default GameRules
