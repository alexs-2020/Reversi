import GameView from './game_view';
import ConsoleBoardView from './console_board_view';

class ConsoleGameView extends GameView {
    constructor(board: any) {
        super(new ConsoleBoardView(board));
    }

    showCurrPlayer(): void {
        // Implementation for showCurrPlayer method goes here
    }

    getMove(): [number, number] {
        const move: string = prompt('Enter your move (row, col):') || '';
        const values: string[] = move.split(',');
        const row: number = parseInt(values[0], 10);
        const col: number = parseInt(values[1], 10);
        return [row, col];
    }

    showIllegalMove(row: number, col: number): void {
        // Implementation for showIllegalMove method goes here
    }

    showWinner(player: any): void {
        // Implementation for showWinner method goes here
    }
}

export default ConsoleGameView;
