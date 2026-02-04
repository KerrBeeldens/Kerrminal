import { getStudentData } from "../display/FDND/Fdnd.js";
import { BaseState } from "./BaseState.js";

export class WelcomeState extends BaseState {

    constructor(context) {
        super(context);
        // clear the terminal (hard reset)
        this.context.terminal.clear();
        this.context.terminal.showLine(" /$$   /$$                                             /$$                     /$$");
        this.context.terminal.showLine("| $$  /$$/                                            |__/                    | $$");
        this.context.terminal.showLine("| $$ /$$/   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$ /$$$$$$$   /$$$$$$ | $$");
        this.context.terminal.showLine("| $$$$$/   /$$__  $$ /$$__  $$ /$$__  $$| $$_  $$_  $$| $$| $$__  $$ |____  $$| $$");
        this.context.terminal.showLine("| $$  $$  | $$$$$$$$| $$  \\__/| $$  \\__/| $$ \\ $$ \\ $$| $$| $$  \\ $$  /$$$$$$$| $$");
        this.context.terminal.showLine("| $$\\  $$ | $$_____/| $$      | $$      | $$ | $$ | $$| $$| $$  | $$ /$$__  $$| $$");
        this.context.terminal.showLine("| $$ \\  $$|  $$$$$$$| $$      | $$      | $$ | $$ | $$| $$| $$  | $$|  $$$$$$$| $$");
        this.context.terminal.showLine("|__/  \\__/ \\_______/|__/      |__/      |__/ |__/ |__/|__/|__/  |__/ \\_______/|__/");

        this.context.terminal.showLine(" ");

        this.context.terminal.showLine("reset - reset this console");
        this.context.terminal.showLine("echo - echo your command");
        this.context.terminal.showLine("whoami - show personal information");

        this.context.terminal.showLine(" ");
    }

    async handleCommand(command) {
        let tokens = command.split(" ");

        switch (tokens[0]) {
            case "reset": // Go back to welcome state
                this.context.state = new WelcomeState(this.context);
                break;
            case "echo": // Simply echo user
                this.context.terminal.showLine(tokens.slice(1).join(" "));
                break;
            case "whoami": // print personal data   
                let personalData = await getStudentData(302);
                if (personalData) {
                    console.log(personalData.name);
                    this.context.terminal.showLine("Naam: " + personalData.name);
                    this.context.terminal.showLine("Bijnaam: " + personalData.nickname);
                    this.context.terminal.showLine("Verjaardag: " + personalData.birthdate);
                } else {
                    this.context.terminal.showLine("Failed to fetch personal data.");
                }
                break;
            default: // Unkown command, check if global command
                super.handleCommand(command)
        }
    }
}