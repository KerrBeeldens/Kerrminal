export class Window {
  #container;
  #windowContent;

  constructor(name, icon, windowContent) {
    this.name = name;
    this.icon = icon;
    this.isOpen = false;
    this.#windowContent = windowContent;

    // Construct the window
    this.#container = document.createElement("div");
    this.#container.classList.add("window");

    // Construct the window titlebar
    const titlebar = document.createElement("div");
    titlebar.classList.add("window-titlebar");

    const titlebarIcon = document.createElement("img");
    titlebarIcon.classList.add("window-titlebar-icon");
    titlebarIcon.scr = this.icon;

    const titlebarName = document.createElement("p");
    titlebarName.classList.add("window-titlebar-text");
    titlebarName.textContent = this.name;

    // Minimise button
    const titlebarMinimiseButton = document.createElement("button");
    titlebarMinimiseButton.classList.add("window-minimise-button");
    titlebarMinimiseButton.addEventListener("click", () => this.minimise());

    const titlebarMinimiseButtonIcon = document.createElement("span");
    titlebarMinimiseButtonIcon.classList.add("material-symbols-outlined");
    titlebarMinimiseButtonIcon.classList.add("window-minimise-icon");
    titlebarMinimiseButtonIcon.textContent = "remove";
    titlebarMinimiseButton.append(titlebarMinimiseButtonIcon);

    // Close button
    const titlebarCloseButton = document.createElement("button");
    titlebarCloseButton.classList.add("window-close-button");
    titlebarCloseButton.addEventListener("click", () => this.close());

    const titlebarCloseButtonIcon = document.createElement("span");
    titlebarCloseButtonIcon.classList.add("material-symbols-outlined");
    titlebarCloseButtonIcon.classList.add("window-close-icon");
    titlebarCloseButtonIcon.textContent = "close";
    titlebarCloseButton.append(titlebarCloseButtonIcon);

    titlebar.append(
      titlebarName,
      titlebarIcon,
      titlebarMinimiseButton,
      titlebarCloseButton,
    );

    this.#container.append(titlebar, this.#windowContent._content);

    // Add the window to the desktop
    let desktop = document.querySelector(".desktop");
    desktop.append(this.#container);
  }

  open() {
    this.isOpen = true;
    this.#windowContent.onOpen();
    this.onOpen(this); // trigger external callback
    this.#container.classList.add("window-opened");
    this.#container.classList.remove("window-closed");
  }

  close() {
    this.isOpen = false;
    this.#windowContent.onClose();
    this.onClose(this); // trigger external callback
    this.#container.classList.remove("window-opened");
    this.#container.classList.add("window-closed");
  }

  minimise() {
    this.isOpen = false;
    this.#windowContent.onMinimise();
    this.onMinimise(this); // trigger external callback
    this.#container.classList.remove("window-opened");
    this.#container.classList.add("window-closed");
  }
}
