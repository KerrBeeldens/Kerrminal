import { WindowContent } from "./WindowContent.js";

export class SettingsContent extends WindowContent {
  constructor() {
    super();
    this._content.classList.add("settings-window");

    // Create settings menu
    const header = document.createElement("h1");
    header.classList.add("settings-heading");
    header.textContent = "Settings";

    const themeHeader = document.createElement("h2");
    themeHeader.classList.add("settings-heading");
    themeHeader.textContent = "Theme Settings";

    const themeSelect = document.createElement("select");
    themeSelect.classList.add("settings-theme-select");

    const themePreviewImageText = document.createElement("p");
    themePreviewImageText.classList.add("settings-theme-preview-text");
    themePreviewImageText.textContent = "Theme Preview";

    const themePreviewImage = document.createElement("img");
    themePreviewImage.classList.add("settings-theme-preview");

    const themes = ["dark", "light"];

    themes.forEach((themeName) => {
      let themeOption = document.createElement("option");
      themeOption.value = themeName;
      themeOption.textContent = themeName; // TODO capital letter
      themeSelect.appendChild(themeOption);
    });

    themeSelect.addEventListener("change", (e) => {
      document.body.className = "";
      document.body.classList.add(`theme-${e.target.value}`);
    });

    this._content.append(
      header,
      themeHeader,
      themeSelect,
      themePreviewImageText,
      themePreviewImage,
    );
  }
}
