export default (newElement) => {
  const central = document.querySelector(`.central`);
  central.appendChild(newElement);
  const oldElement = central.firstElementChild;
  oldElement.classList.add(`fade`);
  newElement.classList.add(`appear`);
  setTimeout(() => {
    oldElement.remove();
    oldElement.classList.remove(`fade`);
    newElement.classList.remove(`appear`);
  }, 500);
};
