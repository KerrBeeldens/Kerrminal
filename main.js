import { Context } from "./stateMachine/Context.js";
import { getStudentData } from "../FDND/Fdnd.js";

let context = new Context();

/* === Lock Screen === */
const lockScreen = document.querySelector(".lock-screen");

// Open the lockscreen on click
lockScreen.addEventListener("click", () => {
  lockScreen.classList.add("lock-screen-unlocked");
});

/* === Login Screen === */
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
    if (!studentData.data) throw new Error("Invalid ID or missing data");
  } catch (err) {
    loginField.setCustomValidity("Invalid ID");
    loginField.reportValidity();
    return;
  }

  // Retrieved valid data, build login window
  const window = document.querySelector(".login-screen");
  window.innerHTML = "";

  const profilePicture = document.createElement("img");
  profilePicture.classList.add("profile-picture");
  profilePicture.src = studentData.data.avatar || "resources/pfp.png"; // TODO on 404

  const welcomeText = document.createElement("p");
  welcomeText.classList.add("welcome-message");
  welcomeText.textContent = `Welcome ${studentData.data.name}!`;

  const loader = document.createElement("div");
  loader.classList.add("loader");

  window.append(profilePicture, welcomeText, loader);
  window.classList.add("login-screen-remove");
});

/* === Taskbar === */

// Source - https://stackoverflow.com/a/39418437
const time = document.querySelector(".time");

function getTime() {
  let d = new Date();
  let m = d.getMinutes();
  let h = d.getHours();
  time.textContent = ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2);
}

// Update the time every second
setInterval(getTime, 1000);
