export class Taskbar {
  #windows = new Map();

  constructor() {
    this.Taskbar = document.querySelector(".taskbar");
    this.TaskbarWindows = document.querySelector(".taskbar-windows");
  }

  onWindowOpen(window) {
    let taskbarWindow = this.#windows.get(window.name);

    if (!taskbarWindow) {
      // Create the taskbar window
      taskbarWindow = document.createElement("span");
      taskbarWindow.classList.add("taskbar-window");

      const taskbarWindowText = document.createElement("p");
      taskbarWindowText.classList.add("taskbar-window-text");
      taskbarWindowText.textContent = window.name;

      const taskbarWindowIcon = document.createElement("img");
      taskbarWindowIcon.classList.add("taskbar-window-icon");
      taskbarWindowIcon.src = window.icon;

      // Add to the DOM and internal map
      taskbarWindow.append(taskbarWindowIcon, taskbarWindowText);
      this.#windows.set(window.name, taskbarWindow);
      this.TaskbarWindows.append(taskbarWindow);

      // Allow clicking the taskbar icon to restore/minimise
      taskbarWindow.addEventListener("click", () => {
        if (!window.isOpen) {
          window.open();
        } else {
          window.minimise();
        }
      });
    }

    taskbarWindow.offsetHeight;

    taskbarWindow.classList.add("taskbar-window-opened");
    taskbarWindow.classList.remove("taskbar-window-minimised");
  }

  onWindowMinimise(window) {
    const taskbarWindow = this.#windows.get(window.name);

    if (taskbarWindow) {
      taskbarWindow.classList.add("taskbar-window-minimised");
    }
  }

  onWindowClose(window) {
    const taskbarWindow = this.#windows.get(window.name);

    if (taskbarWindow) {
      // Add the closed class to trigger transition
      taskbarWindow.classList.add("taskbar-window-closed");
      taskbarWindow.classList.remove("taskbar-window-opened");

      // Remove after animation
      taskbarWindow.addEventListener(
        "transitionend",
        () => {
          taskbarWindow.remove();
          this.#windows.delete(window.name);
        },
        { once: true },
      );
    }
  }
}
