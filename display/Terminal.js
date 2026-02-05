export class Terminal {

    #terminalWindow;
    #inputLine;
    #context; // TODO: Ugly dependency

    constructor(context) {
        this.#terminalWindow = document.querySelector(".terminal-window");
        this.#inputLine = document.createElement("div");
        this.#context = context; // TODO: remove

        // Construct an input field in the terminal
        let inputLineIndicator = document.createElement("p");
        inputLineIndicator.classList.add("input-line-indicator");
        inputLineIndicator.textContent = ">";

        let inputLineField = document.createElement("input");
        inputLineField.id = "input-line-field";
        inputLineField.type = "textarea";
        inputLineField.autocomplete = "off";

        this.#inputLine.classList.add("input-line");
        this.#inputLine.append(inputLineIndicator, inputLineField);

        this.#terminalWindow.append(this.inputLine);

        // Handle input TODO move
        this.#terminalWindow.addEventListener("click", (e) => {
            inputLineField.select();
        });

        inputLineField.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && inputLineField.value !== "") {
                // Echo user command
                this.#terminalWindow.append(this.#inputLine);
                this.showLine("> " + inputLineField.value);

                // Handle command
                this.#context.handleCommand(inputLineField.value);

                // Clear the input and select it again
                inputLineField.value = "";
                inputLineField.select();
            }
        });

        this.#terminalWindow.append(this.#inputLine);
    }

    focusInput() {
        const input = this.#inputLine.querySelector("input");
        input.focus();
        input.select();
    }


    showLine(line) {
        this.#inputLine.remove();

        let newLine = document.createElement("p");
        newLine.classList.add("terminal-line");
        newLine.textContent = line;

        this.#terminalWindow.appendChild(newLine);
        this.#terminalWindow.append(this.#inputLine);

        this.focusInput();
    }

    clear() {
        this.#terminalWindow.innerHTML = "";
        this.#terminalWindow.append(this.#inputLine);

        this.focusInput();
    }
}