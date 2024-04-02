
class UserQueryBuilder {
    constructor() {
        this.query = 'CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100), wins INT, losses INT, ratio FLOAT)';
        this.fields = [];
    }
    reset(){
        this.query = ''
        this.fields = [];
    }
    setUsername(username) {
        this.fields.push(username);
        return this;
    }

    setPassword(password) {
        this.fields.push(password);
        return this;
    }
    checkUsername(){
        this.query = 'SELECT * FROM users WHERE username = ?';
        return this;
    }
    // Add other methods for different user attributes as needed
    signUp(){ 
        this.query = 'INSERT INTO users (username, password) VALUES (?, ?)'
    }
    build(){
        return {
          query:  this.query,
          fields: this.fields
        }
    }
}



  class BoardQueryBuilder {
    constructor() {
        this.query = 'CREATE TABLE IF NOT EXISTS board (id INT AUTO_INCREMENT PRIMARY KEY, size INT NOT NULL, current_turn VARCHAR(100), game_state VARCHAR(100))';
        this.fields = [];
    }
    createBoard(size, currentTurn, gameState) {
      this.query = `INSERT INTO board (size, current_turn, game_state) VALUES (${size}, '${currentTurn}', '${gameState}')`;
      return this;
    }
    createPiece
  
    updateBoardState(boardId, gameState) {
      this.query = `UPDATE board SET game_state = '${gameState}' WHERE id = ${boardId}`;
      return this;
    }
  
    deleteBoard(boardId) {
      this.query = `DELETE FROM board WHERE id = ${boardId}`;
      return this;
    }

    build() {
        return this.query + this.fields.join(", ");
    }
  }


module.exports = { UserQueryBuilder, BoardQueryBuilder };
