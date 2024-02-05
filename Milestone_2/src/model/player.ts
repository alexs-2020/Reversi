import PlayerSymbol from "./player_symbol";
class Player {
  private symbol: PlayerSymbol;
  private score: number;

  constructor(symbol: PlayerSymbol) {
    this.symbol = symbol;
    this.score = 0;
  }

  updateScore(newScore: number): void {
    /*
    Method to update score
    */
    this.score = newScore;
  }
}

export default Player;
