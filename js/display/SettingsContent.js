import { WindowContent } from "./WindowContent.js";

export class SettingsContent extends WindowContent {
  constructor() {
    super();
    this._content.classList.add("settings-window");

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

    let currentTheme;
    if (document.body.classList.contains("theme-dark")) currentTheme = "dark";
    else if (document.body.classList.contains("theme-light"))
      currentTheme = "light";
    else {
      currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.body.classList.add(`theme-${currentTheme}`);
    }

    themes.forEach((themeName) => {
      const option = document.createElement("option");
      option.classList.add("settings-theme-select-option");
      option.value = themeName;
      option.textContent =
        themeName.charAt(0).toUpperCase() + themeName.slice(1);

      if (themeName === currentTheme) option.selected = true;

      themeSelect.appendChild(option);
    });

    themePreviewImage.src = `../resources/theme_preview_${currentTheme}.png`;

    themeSelect.addEventListener("change", (e) => {
      const selected = e.target.value;

      document.body.className = "";
      document.body.classList.add(`theme-${selected}`);
      themePreviewImage.src = `../resources/theme_preview_${selected}.png`;
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
