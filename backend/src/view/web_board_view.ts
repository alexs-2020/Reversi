import Board from "../model/board";
import BoardView from "./board_view";
import { symbolToStr } from "../model/player_symbol";

class WebBoardView extends BoardView {
    constructor(board: Board) {
        super(board);
    }

    display(): void {
        // Print the board col separated by comma and column represented by new line
        this.board.board.forEach((row, rowIndex) => {
            const rowContent = row.map(symbol => symbolToStr[symbol]);
            console.log(rowContent.join(','));
        });
    }
}

export default WebBoardView;
