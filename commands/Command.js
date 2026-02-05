export class Command {
    constructor(name, args = "", short = "", long = "") {
        this.name = name;
        this.args = args;
        this.short = short;
        this.long = long;
    }

    execute(...args) {
        return ["Command not implemented"];
    }
}