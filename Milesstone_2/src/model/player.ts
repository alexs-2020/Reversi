import PlayerSymbol from "./player_symbol";
class Player {
  symbol: PlayerSymbol;
  score: number;

  constructor(symbol: PlayerSymbol) {
    this.symbol = symbol;
    this.score = 0;
  }

  updateScore(newScore: number): void {
    /*
    currently set as private method 
    Method to update score
    */
    this.score = newScore;
  }
}

export default Player;
