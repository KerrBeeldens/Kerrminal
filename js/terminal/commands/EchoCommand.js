import { Command } from "./Command.js";

export class EchoCommand extends Command {
  constructor() {
    super(
      "echo",
      "[string]",
      "Print the provided [string] in the terminal",
      "Print the provided [string] in the terminal",
    );
  }

  execute(...args) {
    return [args.join(" ")];
  }
}
