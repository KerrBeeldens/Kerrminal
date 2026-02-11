import { EchoCommand } from "./commands/EchoCommand.js";
import { ResetCommand } from "./commands/ResetCommand.js";
import { WhoamiCommand } from "./commands/whoamiCommand.js";
import { ManCommand } from "./commands/ManCommand.js";
import { WhoisCommand } from "./commands/WhoisCommand.js";
import { GoalCommand } from "./commands/GoalCommand.js";

export class Terminal {
  constructor() {
    this.commands = new Map();
    this.outputHistory = [];

    this.register(new EchoCommand());
    this.register(new GoalCommand());
    this.register(new WhoamiCommand());
    this.register(new WhoisCommand());
    this.register(new ManCommand(this));
    this.register(new ResetCommand(this));

    this.showHelp();
  }

  register(command) {
    this.commands.set(command.name, command);
  }

  async handleCommand(input) {
    this.outputHistory.push("> " + input);

    const tokens = input.split(" ");
    const name = tokens[0];
    const args = tokens.slice(1);

    const command = this.commands.get(name);

    if (!command) {
      this.outputHistory.push(`Unknown command: ${name}`);
      return;
    }

    const result = await command.execute(...args);

    if (Array.isArray(result)) {
      result.forEach((line) => {
        this.outputHistory.push(line);
      });
    }
  }

  help() {
    return [...this.commands.values()].map(
      (c) => `${c.name} ${c.args} — ${c.short}`,
    );
  }

  showHelp() {
    this.help().forEach((line) => {
      this.outputHistory.push(line);
    });
  }

  clear() {
    this.outputHistory = [];
    this.showHelp();
  }
}
