import { Command } from "./Command.js";

export class ResetCommand extends Command {
  #terminal;

  constructor(terminal) {
    super("reset", "", "Reset terminal", "Clears the terminal");
    this.#terminal = terminal;
  }

  execute(...args) {
    this.#terminal.clear();
  }
}
