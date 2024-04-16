import express from 'express';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import Game from "./model/game";
import ConsoleGameView from "./view/console_game_view";
import GameController from "./controller/game_controller";
import readlineSync from 'readline-sync';
import WebGameView from "./view/web_game_view";
export default class GameManager {
    private type: 'web' | 'console';
    private size: number = 8;
    private game!: Game;
    private gameView!: WebGameView | ConsoleGameView;
    private gameController!: GameController;
    private socket: SocketIoServer;

    constructor(type: 'web' | 'console', port: string) {
        const app = express();
        const server = http.createServer(app);
        const io = new SocketIoServer(server);
        this.socket = io;

        // Start the server
        const PORT = port;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        this.type = type;
        this.initializeGame();
    }

    private initializeGame(): void {
        if (this.type === 'web') {
            this.getWebBoardSizeFromUser();
            this.game = new Game(this.size);
            this.gameView = new WebGameView(this.game.board, this.socket); // Assuming you have a WebGameView class for the web interface
            this.gameController = new GameController(this.game, this.gameView);
        } else if (this.type === 'console') {
            this.getConsoleBoardSizeFromUser();
            this.game = new Game(this.size);
            this.gameView = new ConsoleGameView(this.game.board);
            this.gameController = new GameController(this.game, this.gameView);
        }

        this.gameController.startGame();
    }

    private getConsoleBoardSizeFromUser(): void {
        // Your implementation here
    }

    private getWebBoardSizeFromUser(): void {
        this.socket.on('setBoardSize', (size: number) => {
            console.log(`Received boardSize ${size}`)
            this.size = size;
        });
    }
}

new GameManager('web', '1337'); // For web client
// new GameManager('console', '1337'); // For console client
