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

    let inputLineField = document.createElement("input");
    inputLineField.id = "input-line-field";
    inputLineField.autocomplete = "off";

    this.#inputLine.classList.add("input-line");
    this.#inputLine.append(inputLineIndicator, inputLineField);

    this.display();

    // When the terminal is clicked, focus on the input
    this._content.addEventListener("click", (e) => {
      inputLineField.select();
    });

    // On user input, handle the command
    inputLineField.addEventListener("keyup", async (e) => {
      if (e.key === "Enter" && inputLineField.value !== "") {
        const input = inputLineField.value;
        await this.#terminal.handleCommand(input);
        this.display();

        inputLineField.value = "";
        inputLineField.select();
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
    this.focusInput(); // TODO
  }

  // TODO both functions
  onOpen() {
    let inputLineField = document.querySelector("#input-line-field");
    inputLineField.select();
  }

  focusInput() {
    const input = this.#inputLine.querySelector("input");
    input.focus();
    input.select();
  }
}
