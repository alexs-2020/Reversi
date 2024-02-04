import Board from '../model/board';
import BoardView from './board_view';

class ConsoleBoardView extends BoardView {

    constructor(board: Board) {
        super(board);
    }

    display(): void {
        //currently private 
        // Implementation for display method goes here
    }
}

export default ConsoleBoardView;