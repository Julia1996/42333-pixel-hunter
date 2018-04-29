import AbstractView from './abstract-view.js';
import getStatsBottom from './stats-bottom.js';

export default class StatsView extends AbstractView {
  constructor(stats) {
    super();
    this._stats = stats.sort((a, b) => b.date - a.date);
    this._POINTS_FOR_EACH_CORRECT_ANSWER = 100;
    this._POINTS_FOR_EACH_LIFE = 50;
    this._BONUS_FOR_EACH_FAST_ANSWER = 50;
    this._PENALTY_FOR_EACH_SLOW_ANSWER = 50;
    this._SMALL_TIME_AMOUNT = 10;
    this._BIG_TIME_AMOUNT = 20;
  }

  get template() {
    let statsTitle = ``;
    if (this._stats[0].answers.length === 10) {
      statsTitle = `Победа!`;
    } else {
      statsTitle = `Fail!`;
    }

    return `<header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>
    <div class="result">
      <h1>${statsTitle}</h1>
      ${this._stats.map((result, i) => this.renderResult(result, i)).join(``)}
    </div>`;
  }

  renderResult(result, i) {
    let numberCorrectAnswers = 0;
    let numberFastAnswers = 0;
    let numberSlowAnswers = 0;

    result.answers.forEach((answer) => {
      if (!answer.correct) {
        return;
      }
      numberCorrectAnswers++;

      if (answer.time < this._SMALL_TIME_AMOUNT) {
        numberFastAnswers++;
      } else if (answer.time > this._BIG_TIME_AMOUNT) {
        numberSlowAnswers--;
      }
    });

    let total = numberCorrectAnswers * this._POINTS_FOR_EACH_CORRECT_ANSWER
      + numberFastAnswers * this._BONUS_FOR_EACH_FAST_ANSWER
      + numberSlowAnswers * this._PENALTY_FOR_EACH_SLOW_ANSWER
      + result.lives * this._POINTS_FOR_EACH_LIFE;

    return `<table class="result__table">
      <tr>
        <td class="result__number">${i + 1}.</td>
        <td colspan="2">
          ${getStatsBottom(result.answers)}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">
          ${result.answers.length === 10 ? numberCorrectAnswers * this._POINTS_FOR_EACH_CORRECT_ANSWER : `fail`}
        </td>
      </tr>
      ${result.answers.length === 10 ? `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${numberFastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${numberFastAnswers * this._BONUS_FOR_EACH_FAST_ANSWER}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${result.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${result.lives * this._POINTS_FOR_EACH_LIFE}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${numberSlowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${numberSlowAnswers * this._PENALTY_FOR_EACH_SLOW_ANSWER}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${total}</td>
        </tr>
      ` : ``}
    </table>
   `;
  }

  onBackButtonClick() {}

  bind() {
    this._element.querySelector(`.back`).addEventListener(`click`, () => this.onBackButtonClick());
  }
}
