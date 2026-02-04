import { WelcomeState } from "./WelcomeState.js";

export class BaseState {

    constructor(context) {
        this.context = context;
        this.terminalWindow = document.querySelector(".terminal-window");
    }

    // Define global commands
    handleCommand(command) {
        let tokens = command.split(" ");

        switch (tokens[0]) {
            case "reset": // Go back to welcome state
                this.context.state = new WelcomeState(this.context);
                break;
            default: // Unkown command, display error
                this.context.terminal.showLine("Unkown Command :/");
        }
    }
}