import PlayerSymbol from './player_symbol'
class Player {
  symbol: PlayerSymbol;
  private score: number;
  username: string | undefined;
  socketId: any;

  constructor(symbol: PlayerSymbol, username?: string, socketId?: any) {
    this.symbol = symbol;
    this.score = 2;
    this.username = username;
    this.socketId = socketId;
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
