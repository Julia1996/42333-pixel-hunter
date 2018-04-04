const showScreen = (elem) => {
  const main = document.querySelector(`.central`);
  main.innerHTML = ``;
  main.appendChild(elem);
};

export default showScreen;
