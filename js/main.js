import { getStudentData } from "./Fdnd.js";
import { Window } from "./display/Window.js";
import { Terminal } from "./terminal/Terminal.js";
import { TerminalContent } from "./display/TerminalContent.js";
import { Shortcut } from "./display/Shortcut.js";
import { Taskbar } from "./display/Taskbar.js";
import { SettingsContent } from "./display/SettingsContent.js";

/* === Lock Screen === */
const lockScreen = document.querySelector(".lock-screen");

const lockscreenTime = document.querySelector(".lock-screen-time");
const lockscreenDate = document.querySelector(".lock-screen-date");

function setLockscreenDateTime() {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = d.getMonth();
  let dd = d.getDate();

  let months = [
    "januari",
    "februari",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  let m = d.getMinutes();
  let h = d.getHours();

  lockscreenTime.textContent = ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2);

  lockscreenDate.textContent = dd + " " + months[mm] + " " + yyyy;
}

// Update the time and date every second
setInterval(setLockscreenDateTime, 1000);

// Open the lockscreen on click
lockScreen.addEventListener("click", () => {
  lockScreen.classList.add("lock-screen-unlocked");
});

// Remove after animation
lockScreen.addEventListener(
  "transitionend",
  () => {
    lockScreen.remove();
  },
  { once: true },
);

/* === Login Screen === */
const loginScreen = document.querySelector(".login-screen");

const loginForm = document.querySelector(".login-form");
const loginField = document.querySelector("#login-field");

// Reset validity on input
loginField.addEventListener("input", () => {
  loginField.setCustomValidity("");
});

// On login attempt, retrieve and display student data
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginField.setCustomValidity("");

  let formData = new FormData(loginForm);
  let id = formData.get("login");

  // Retrieve student data
  let studentData;

  try {
    studentData = await getStudentData(id);
    if (!studentData) throw new Error("Invalid ID or missing data");
  } catch (err) {
    loginField.setCustomValidity("Invalid ID");
    loginField.reportValidity();
    return;
  }

  // Retrieved valid data, build login window
  const loginWindow = document.querySelector(".login-screen");
  loginWindow.innerHTML = "";

  const profilePicture = document.createElement("img");
  profilePicture.classList.add("profile-picture");
  profilePicture.src = studentData.avatar || "resources/pfp.png"; // TODO on 404

  const welcomeText = document.createElement("p");
  welcomeText.classList.add("welcome-message");
  welcomeText.textContent = `Welcome ${studentData.name}!`;

  const loader = document.createElement("div");
  loader.classList.add("loader");

  loginWindow.append(profilePicture, welcomeText, loader);
  loginWindow.classList.add("login-screen-remove");
});

// Remove after animation
loginScreen.addEventListener(
  "transitionend",
  () => {
    loginScreen.remove();
  },
  { once: true },
);

/* === Terminal Window === */
const terminal = new Terminal();
const terminalContent = new TerminalContent(terminal);
const terminalWindow = new Window(
  "Kerrminal",
  "resources/fav_icon.svg",
  terminalContent,
);

const terminalShortcut = new Shortcut(
  "Kerrminal",
  "resources/fav_icon.svg",
  terminalWindow,
);

let shortcuts = document.querySelector(".shortcuts");
shortcuts.append(terminalShortcut.content);

/* === Settings Window === */
// const settings = new Terminal();
const settingsContent = new SettingsContent();
const settingsWindow = new Window(
  "Settings",
  "resources/settings_icon.svg",
  settingsContent,
);

const settingsShortcut = new Shortcut(
  "Settings",
  "resources/settings_icon.svg",
  settingsWindow,
);

shortcuts.append(settingsShortcut.content);

/* === Taskbar === */
const taskbar = new Taskbar();

// Connect window callbacks to taskbar
terminalWindow.onOpen = (win) => taskbar.onWindowOpen(win);
terminalWindow.onMinimise = (win) => taskbar.onWindowMinimise(win);
terminalWindow.onClose = (win) => taskbar.onWindowClose(win);

settingsWindow.onOpen = (win) => taskbar.onWindowOpen(win);
settingsWindow.onMinimise = (win) => taskbar.onWindowMinimise(win);
settingsWindow.onClose = (win) => taskbar.onWindowClose(win);

const powerButtonOff = document.querySelector(".power-button-off");
powerButtonOff.addEventListener("click", () => {
  document.body.innerHTML = "";
});

const powerButtonSleep = document.querySelector(".power-button-sleep");
powerButtonSleep.addEventListener("click", () => {
  window.location.reload();
});

// Source - https://stackoverflow.com/a/39418437
const time = document.querySelector(".taskbar-time");

function setTaskbarTime() {
  let d = new Date();
  let m = d.getMinutes();
  let h = d.getHours();
  time.textContent = ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2);
}

// Update the time every second
setInterval(setTaskbarTime, 1000);
