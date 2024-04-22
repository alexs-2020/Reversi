"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(symbol, username, socketId) {
        this.symbol = symbol;
        this.score = 2;
        this.username = username;
        this.socketId = socketId;
    }
    updateScore(newScore) {
        /*
        Method to update score
        */
        this.score += newScore;
    }
    changeScore(newScore) {
        /*
        Method to update score
        */
        this.score = newScore;
    }
    getScore() {
        return this.score;
    }
}
exports.default = Player;
