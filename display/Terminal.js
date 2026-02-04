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

        this.#terminalWindow.addEventListener("click", (e) => {
            inputLineField.select();
        });

        // Handle input
        inputLineField.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && inputLineField.value !== "") {
                this.#context.handleCommand(inputLineField.value);
                this.#terminalWindow.append(this.#inputLine);
                inputLineField.value = "";
                inputLineField.select();
            }
        });

        this.#terminalWindow.append(this.#inputLine);
    }

    showLine(line) {
        this.#inputLine.remove();
        let newLine = document.createElement("p");
        newLine.classList.add("terminal-line");
        newLine.textContent = line;
        this.#terminalWindow.appendChild(newLine);
        this.#terminalWindow.append(this.#inputLine);
    }

    clear() {
        this.#terminalWindow.innerHTML = "";
    }
}