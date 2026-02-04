import { BaseState } from "./BaseState.js";

export class WelcomeState extends BaseState {

    constructor(context) {
        super(context);
        // clear the terminal (hard reset)
        this.context.terminal.clear();
        this.context.terminal.showLine("Hello, World!");
    }

    handleCommand(command) {
        let tokens = command.split(" ");

        switch (tokens[0]) {
            case "reset": // Go back to welcome state
                this.context.state = new WelcomeState(this.context);
                break;
            case "echo": // Simply echo user
                this.context.terminal.showLine(tokens.slice(1).join(" "));
                break;

            default: // Unkown command, check if global command
                super.handleCommand(command)
        }
    }
}