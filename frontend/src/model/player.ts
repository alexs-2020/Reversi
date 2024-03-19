import PlayerSymbol from './player_symbol'
class Player {
  symbol: PlayerSymbol
  private score: number
  color?: string

  constructor(symbol: PlayerSymbol, color?: string) {
    this.symbol = symbol
    this.score = 2
    this.color = color
  }

  updateScore(newScore: number): void {
    /*
    Method to update score
    */
    this.score += newScore
  }
  getScore(): number {
    return this.score
  }
}

export default Player
