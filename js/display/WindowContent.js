export class WindowContent {
  _content;

  constructor() {
    this._content = document.createElement("div");
    this._content.classList.add("window-content");
  }

  onOpen() {}
  onClose() {}
  onMinimise() {}
}
