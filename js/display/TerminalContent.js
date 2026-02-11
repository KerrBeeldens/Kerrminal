import { WindowContent } from "./WindowContent.js";

export class TerminalContent extends WindowContent {
  #inputLine;
  #terminal;

  constructor(terminal) {
    super();

    this.#terminal = terminal;

    // Construct an input field in the terminal
    this.#inputLine = document.createElement("div");

    let inputLineIndicator = document.createElement("p");
    inputLineIndicator.classList.add("input-line-indicator");
    inputLineIndicator.textContent = ">";

    this.inputLineField = document.createElement("input");
    this.inputLineField.id = "input-line-field";
    this.inputLineField.autocomplete = "off";

    this.#inputLine.classList.add("input-line");
    this.#inputLine.append(inputLineIndicator, this.inputLineField);

    this.display();

    // When the terminal is clicked, focus on the input
    this._content.addEventListener("click", (e) => {
      this.inputLineField.select();
    });

    // On user input, handle the command
    this.inputLineField.addEventListener("keyup", async (e) => {
      if (e.key === "Enter" && this.inputLineField.value !== "") {
        const input = this.inputLineField.value;
        await this.#terminal.handleCommand(input);
        this.display();

        this.inputLineField.value = "";
        this.inputLineField.select();
      }
    });
  }

  displayHeader() {
    const header = [
      " /$$   /$$                                             /$$                     /$$",
      "| $$  /$$/                                            |__/                    | $$",
      "| $$ /$$/   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$ /$$$$$$$   /$$$$$$ | $$",
      "| $$$$$/   /$$__  $$ /$$__  $$ /$$__  $$| $$_  $$_  $$| $$| $$__  $$ |____  $$| $$",
      "| $$  $$  | $$$$$$$$| $$  \\__/| $$  \\__/| $$ \\ $$ \\ $$| $$| $$  \\ $$  /$$$$$$$| $$",
      "| $$\\  $$ | $$_____/| $$      | $$      | $$ | $$ | $$| $$| $$  | $$ /$$__  $$| $$",
      "| $$ \\  $$|  $$$$$$$| $$      | $$      | $$ | $$ | $$| $$| $$  | $$|  $$$$$$$| $$",
      "|__/  \\__/ \\_______/|__/      |__/      |__/ |__/ |__/|__/|__/  |__/ \\_______/|__/",
      " ",
    ];

    header.forEach((line) => {
      let newLine = document.createElement("p");
      newLine.classList.add("terminal-line");
      newLine.classList.add("header-ascii");
      newLine.textContent = line;
      this._content.appendChild(newLine);
    });

    let newLine = document.createElement("p");
    newLine.classList.add("terminal-line");
    newLine.classList.add("header-normal");
    newLine.textContent = "Kerminal";
    this._content.appendChild(newLine);
  }

  // Prints a line on the display
  display() {
    // Clear display
    this._content.innerHTML = "";

    this.displayHeader();

    this.#terminal.outputHistory.forEach((line) => {
      let newLine = document.createElement("p");
      newLine.classList.add("terminal-line");
      newLine.textContent = line;
      this._content.appendChild(newLine);
    });

    // Add inputline back
    this._content.append(this.#inputLine);
    this.inputLineField.focus();
    this.inputLineField.select();
  }

  onOpen() {
    this.inputLineField.select();
  }

  onClose() {
    this.#terminal.clear();
  }
}
