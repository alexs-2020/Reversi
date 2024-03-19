class GameState {
  log_message: string = ''
  read_message: string = ''
  log(log_message: string): void {
    this.log_message = log_message // Store the message in the message property
    console.log('log: ', log_message) // Log the message to the console
  }
  read(read_message: string): string {
    this.read_message = read_message // Store the message in the message property
    console.log('read: ', read_message) // Log the message to the console
    return this.read_message
  }
}
export default GameState
