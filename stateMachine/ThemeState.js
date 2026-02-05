import { BaseState } from "./BaseState.js";

export class ThemeState extends BaseState {

    constructor(context) {
        super(context);

        this.context.terminal.clear();
        this.context.terminal.showLine("Theme Picker");

        this.context.terminal.showLine(" ");

        this.context.terminal.showLine("textcolor [r g b]     set the rgb value of the terminal text");
        this.context.terminal.showLine("windowcolor [r g b]   set the rgb color of the terminal window");
        this.context.terminal.showLine("wallpaper [name]      Set the background wallpaper");
        this.context.terminal.showLine("reset                 reset Kerrminal");

        this.context.terminal.showLine(" ");
    }

    handleCommand(command) {
        let tokens = command.split(" ");

        switch (tokens[0]) {
            case "textcolor": // Change text color
                break;
            case "windowcolor": // Change window color   
                break;
            case "wallpaper": // Set the background wallpaper
                this.context.state = new WelcomeState(this.context);
                break;
            default: // Unkown command, check if global command
                super.handleCommand(command)
        }
    }
}