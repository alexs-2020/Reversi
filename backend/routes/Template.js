class QueryTemplate {
    constructor() {
      if (new.target === QueryTemplate) {
        throw new Error('QueryTemplate is an abstract class and cannot be instantiated directly.');
      }
      this.query = '';
      this.fields = [];
    }
  //template method
    build() {
      this.reset();
      this.createQuery();
      return this.finalize();
    }
  
    reset() {
      this.query = '';
      this.fields = [];
    }
  
    createQuery() {
      // Overridden by subclasses
      throw new Error('createQuery must be implemented by subclasses');
    }
  
    finalize() {
      return {
        query: this.query,
        fields: this.fields,
      };
    }
  }
  
  class UserQuery extends QueryTemplate{
      constructor() {
        super();
      }
      reset(){
        super.reset();
      }
      
      createQuery() { //password is not required
        this.query = 'CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100), wins INT, losses INT, ratio FLOAT)';
        this.fields = [];
      }
    }
  
    class BoardQuery extends QueryTemplate {
      constructor() {
        super();
      }
      createQuery(boardAttributes) {
        this.query = 'CREATE TABLE IF NOT EXISTS board (id INT AUTO_INCREMENT PRIMARY KEY, size INT NOT NULL, current_turn VARCHAR(100), game_state VARCHAR(100))';
          this.fields = [];
      }
    }

    class PiecesQuery extends QueryTemplate {
        constructor() {
          super();
        }
        createQuery() {
          this.query = 'CREATE TABLE IF NOT EXISTS pieces (id INT AUTO_INCREMENT PRIMARY KEY, board_id INT, position VARCHAR(5), color VARCHAR(100), FOREIGN KEY (board_id) REFERENCES board(id))';
          this.fields = [];
        }
    }
    class GameQuery extends QueryTemplate {
        constructor() {
          super();
        }
        createQuery() {
          this.query = 'CREATE TABLE IF NOT EXISTS game_sessions (id INT AUTO_INCREMENT PRIMARY KEY, board_id INT, user_id INT, FOREIGN KEY (board_id) REFERENCES board(id), FOREIGN KEY (user_id) REFERENCES users(id))';
          this.fields = [];
        }
    }

  
  
  module.exports = { UserQuery, BoardQuery, PiecesQuery, GameQuery };
  