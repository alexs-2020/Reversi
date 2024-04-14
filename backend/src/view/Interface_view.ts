
export interface messageProps{
    showCurrentPlayer: "showCurrentPlayer"
    showPlayerScores: "showPlayerScores"
    getMove: "getMove"
    showPossibleMove: "showPossibleMove"
    showWinner: "showWinner"
    showIllegalMove: "showIllegalMove" 
}
interface IView {
    displayBoard(board: string[][]): void;
    displayMessage(message: messageProps): void;
  }

export default IView