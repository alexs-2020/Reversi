"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameView {
    constructor(boardView) {
        this.boardView = boardView;
    }
    displayBoard() {
        return this.boardView.display();
    }
}
exports.default = GameView;
