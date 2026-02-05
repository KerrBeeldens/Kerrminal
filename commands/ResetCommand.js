import { Command } from "./Command.js"
import { WelcomeState } from "../stateMachine/WelcomeState.js";

export class ResetCommand extends Command {
    constructor(context) {
        super("reset", "", "Reset the terminal", "Resets Kerrminal to the welcome screen");
        this.context = context;
    }

    execute() {
        this.context.state = new WelcomeState(this.context);
    }
}