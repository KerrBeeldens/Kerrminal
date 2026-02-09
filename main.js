import { Context } from "./stateMachine/Context.js";
import { getStudentData } from "../FDND/Fdnd.js";

let context = new Context();

let bootupScreen = document.querySelector(".os-bootup");
bootupScreen.addEventListener("click", () => {
  bootupScreen.classList.add("open");
});

const loginForm = document.querySelector(".os-login-form");
const loginField = document.querySelector("#login-field");

async function onLogin(e) {
  e.preventDefault();

  loginField.setCustomValidity("");

  let formData = new FormData(loginForm);
  let id = formData.get("login");

  console.log("Attempting login with ID:", id);

  let studentData;

  try {
    studentData = await getStudentData(id);

    if (!studentData.data) {
      throw new Error("Invalid ID or missing data");
    }
  } catch (err) {
    loginField.setCustomValidity("Invalid ID");
    loginField.reportValidity();
    console.log("all good");
    return;
  }

  let window = document.querySelector(".os-login");
  window.innerHTML = "";

  let pfp = document.createElement("img");
  pfp.classList.add("pfp");
  pfp.src = studentData.data.avatar || "resources/pfp.png";

  let welcomeText = document.createElement("p");
  welcomeText.classList.add("welcome-message");
  welcomeText.textContent = `Welcome ${studentData.data.name}!`;

  let loader = document.createElement("div");
  loader.classList.add("loader");

  window.append(pfp, welcomeText, loader);
  window.classList.add("remove");
}

loginForm.addEventListener("submit", onLogin);

loginField.addEventListener("input", () => {
  loginField.setCustomValidity("");
});

// Source - https://stackoverflow.com/a/39418437
// Posted by Pranav C Balan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-09, License - CC BY-SA 4.0
const time = document.querySelector(".time");

function getTime() {
  let d = new Date();
  let m = d.getMinutes();
  let h = d.getHours();
  time.textContent = ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2);
}

setInterval(getTime, 1000);
