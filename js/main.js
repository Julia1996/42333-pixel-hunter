const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const templates = document.querySelectorAll(`template`);
const central = document.querySelector(`.central`);
let currentScreen = 0;

const showScreen = (num) => {
  central.innerHTML = ``;
  central.appendChild(templates[num].content.cloneNode(true));
};

showScreen(currentScreen);

document.addEventListener(`keydown`, (event) => {
  if (event.altKey) {
    if ((event.keyCode === LEFT_KEY) && currentScreen > 0) {
      currentScreen--;
      showScreen(currentScreen);
    } else if ((event.keyCode === RIGHT_KEY) && currentScreen < templates.length - 1) {
      currentScreen++;
      showScreen(currentScreen);
    }
  }
});
