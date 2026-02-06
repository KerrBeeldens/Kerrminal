import { BaseState } from "./BaseState.js";

export class ThemeState extends BaseState {
  constructor(context) {
    super(context);

    this.context.terminal.clear();
    this.context.terminal.showLine("Theme Picker");

    this.context.terminal.showLine(" ");

    this.context.terminal.showLine(
      "man [command]         Get more info about a command",
    );

    this.context.terminal.showLine(" ");

    this.context.terminal.showLine(
      "textcolor [r g b]     set the rgb value of the terminal text",
    );
    this.context.terminal.showLine(
      "windowcolor [r g b]   set the rgb color of the terminal window",
    );
    this.context.terminal.showLine(
      "wallpaper [name]      Set the background wallpaper",
    );
    this.context.terminal.showLine("reset                 reset Kerrminal");

    this.context.terminal.showLine(" ");
  }

  handleCommand(command) {
    let tokens = command.split(" ");

    switch (tokens[0]) {
      case "textcolor": // Change text color
        // check input;
        if (!this.isValidColor(tokens.slice(1))) return;

        document.body.style.setProperty(
          "--text-color-base",
          `rgb(${tokens[1]}, ${tokens[2]}, ${tokens[3]})`,
        );
        break;
      case "windowcolor": // Change window color
        // check input
        if (!this.isValidColor(tokens.slice(1))) return;

        document.body.style.setProperty(
          "--terminal-color-base",
          `rgb(${tokens[1]}, ${tokens[2]}, ${tokens[3]})`,
        );
        break;
      case "wallpaper": // Set the background wallpaper
        if (!this.isValidName(tokens.slice(1))) return;

        const topicsMap = {
          monkey: "animals.jpg",
          cupcakes: "baking.jpg",
          boardgame: "boardgames.jpg",
          girlfriend: "girlfriend.jpg",
          halloween: "halloween.png",
          harry: "harry_potter.jpg",
          programming: "retrogames.jpg",
          sports: "sports.jpg",
          gameboy: "study.jpg",
          default: "background.jpg",
        };

        const desktop = document.querySelector(".desktop");
        desktop.style.backgroundImage = `url(./resources/${topicsMap[tokens[1]]})`;
        break;
      default: // Unkown command, check if global command
        super.handleCommand(command);
    }
  }

  isValidName(tokens) {
    if (tokens.length !== 1) {
      this.context.terminal.showLine(
        "Expecting 1 parameters but received " + tokens.length,
      );
      return false;
    }

    const topics = [
      "monkey",
      "cupcakes",
      "boardgame",
      "girlfriend",
      "halloween",
      "harry",
      "programming",
      "sports",
      "gameboy",
      "default",
    ];

    if (!topics.includes(tokens[0])) {
      this.context.terminal.showLine("The requested wallpaper does not exist");
      return false;
    }

    return true;
  }

  isValidColor(tokens) {
    if (tokens.length !== 3) {
      this.context.terminal.showLine(
        "Expecting 3 parameters but received " + tokens.length,
      );
      return false;
    }

    let r = tokens[0];
    let g = tokens[1];
    let b = tokens[2];

    if (r > 255 || r < 0) {
      this.context.terminal.showLine(
        "Red channel should be between 0 and 255, but was " + r,
      );
      return false;
    }

    if (g > 255 || g < 0) {
      this.context.terminal.showLine(
        "Green channel should be between 0 and 255, but was " + g,
      );
      return false;
    }

    if (b > 255 || b < 0) {
      this.context.terminal.showLine(
        "Blue channel should be between 0 and 255, but was " + b,
      );
      return false;
    }

    return true;
  }

  changeWallpaper(name) {}
}
