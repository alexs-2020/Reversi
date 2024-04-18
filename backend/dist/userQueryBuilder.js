class UserQueryBuilder {
  constructor() {
    this.query = "";
    this.fields = [];
  }

  createQuery(username) {
    this.query = "SELECT * FROM users WHERE username = ?";
    this.fields = [username];
    console.log(this.query);
    return this;
  }

  checkUsername() {
    // Modify the query to check for existence
    this.query = "SELECT COUNT(*) FROM users WHERE username = ?";
    return this;
  }


  signUp() {
    // Assuming username and password are set as fields
    this.query = "INSERT INTO users (username, password) VALUES (?, ?)";
    return this;
  }

  build() {
    return { query: this.query, fields: this.fields };
  }

  reset() {
    this.query = "";
    this.fields = [];
  }
}

module.exports = new UserQueryBuilder();
