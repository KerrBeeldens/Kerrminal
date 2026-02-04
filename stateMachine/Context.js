import { Terminal } from "../display/Terminal.js";
import { WelcomeState } from "./WelcomeState.js";

export class Context {
    constructor() {
        this.terminal = new Terminal(this);
        this.state = new WelcomeState(this);
    }

    handleCommand(command) {
        this.state.handleCommand(command);
    }
}