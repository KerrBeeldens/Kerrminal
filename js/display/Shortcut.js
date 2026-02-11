export class Shortcut {
  constructor(name, icon, window) {
    this.name = name;
    this.content; // TODO not the cleanest way to do this

    // Conststuct the shortcut
    this.content = document.createElement("div");
    this.content.classList.add("shortcut");

    const shortcutIcon = document.createElement("img");
    shortcutIcon.classList.add("shortcut-icon");
    shortcutIcon.src = icon;

    const shortcutText = document.createElement("p");
    shortcutText.classList.add("shortcut-text");
    shortcutText.textContent = name;

    this.content.append(shortcutIcon, shortcutText);

    // Open the given window when the shortcut is clicked
    this.content.addEventListener("click", () => window.open());
  }
}
