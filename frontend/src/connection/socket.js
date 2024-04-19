import io from 'socket.io-client';

const URL = 'http://localhost:3001';

export const socket = io(URL);

// Handle socket connection and disconnection for debugging
socket.on('connect', () => {
    console.log(`Connected with socket ID: ${socket.id}`);
});

socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${reason}`);
});

window.onunload = window.onbeforeunload = () => {
    socket.close();
};

// Example of handling a custom event
socket.on("createNewGame", (statusUpdate) => {
    console.log(`A new game has been created! Username: ${statusUpdate.userName}, Game ID: ${statusUpdate.gameId}, Socket ID: ${socket.id}`);
});
