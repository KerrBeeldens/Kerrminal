let terminalWindow = document.querySelector(".terminal");
let inputline = document.querySelector("#input-line-field");

terminalWindow.addEventListener("click", (e) => {
    inputline.select();
});

inputline.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' && inputline.value !== "") {
        inputline.value = "";
        // parse text
    }
});