// GameInvoker.ts
import  ICommand  from "./ICommand";

class GameInvoker {
    private command?: ICommand;
  
    setCommand(command: ICommand) {
      this.command = command;
    }
  
    executeCommand() {
      if (this.command) {
        this.command.execute();
      } else {
        throw new Error("No command set");
      }
    }
  }
  export default GameInvoker