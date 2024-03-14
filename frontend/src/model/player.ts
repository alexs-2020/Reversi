import PlayerSymbol from "./player_symbol";
class Player {
  symbol: PlayerSymbol;
  private score: number;

  constructor(symbol: PlayerSymbol) {
    this.symbol = symbol;
    this.score = 2;
  }

  updateScore(newScore: number): void {
    /*
    Method to update score
    */
    this.score += newScore;
  }
  getScore():number{
    return this.score
  }
}

export default Player;
