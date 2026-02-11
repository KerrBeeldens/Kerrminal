import { Command } from "./Command.js";

export class ManCommand extends Command {
  constructor(terminal) {
    super("man", "[command]", "Show help", "Show manual for a command");
    this.terminal = terminal;
  }

  execute(...args) {
    const cmd = this.terminal.commands.get(args[0]);
    if (!cmd) return [`No manual entry for ${args[0]}`];

    return [
      `NAME`,
      `  ${cmd.name}`,
      ``,
      `USAGE`,
      `  ${cmd.name} ${cmd.args}`,
      ``,
      `DESCRIPTION`,
      `  ${cmd.long}`,
    ];
  }
}
