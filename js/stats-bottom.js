export default (stats) => {
  let html = stats.map((answer) => {
    let answerCharacteristic;
    if (answer.correct) {
      if (answer.time < 10) {
        answerCharacteristic = `fast`;
      } else if (answer.time > 20) {
        answerCharacteristic = `slow`;
      } else {
        answerCharacteristic = `correct`;
      }
    } else {
      answerCharacteristic = `wrong`;
    }
    return `<li class="stats__result stats__result--${answerCharacteristic}"></li>`;
  }).join(``);

  html += (new Array(10 - stats.length)).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``);

  return `<ul class="stats">${html}</ul>`;
};
