import AbstractView from './abstract-view.js';
import getStatsBottom from './stats-bottom.js';

export default class StatsView extends AbstractView {
  constructor(answers, lives) {
    super();
    this._answers = answers;
    this._lives = lives;
    this._pointsForEachCorrectAnswer = 100;
    this._pointsForEachLive = 50;
    this._bonusForEachFastAnswer = 50;
    this._penaltyForEachSlowAnswer = 50;
    this._smallTimeAmount = 10;
    this._bigTimeAmount = 20;
  }

  get template() {
    let numberCorrectAnswers = 0;
    let numberFastAnswers = 0;
    let numberSlowAnswers = 0;
    let statsTitle = ``;
    if (this._answers.length === 10) {
      statsTitle = `Победа!`;
    } else {
      statsTitle = `Fail!`;
    }

    this._answers.forEach((answer) => {
      if (!answer.correct) {
        return;
      }
      numberCorrectAnswers++;

      if (answer.time < this._smallTimeAmount) {
        numberFastAnswers++;
      } else if (answer.time > this._bigTimeAmount) {
        numberSlowAnswers--;
      }
    });
    let total = numberCorrectAnswers * this._pointsForEachCorrectAnswer + numberFastAnswers * this._bonusForEachFastAnswer + numberSlowAnswers * this._penaltyForEachSlowAnswer + this._lives * this._pointsForEachLive;

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
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              ${getStatsBottom(this._answers)}
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">
              ${numberCorrectAnswers * this._pointsForEachCorrectAnswer}
            </td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${numberFastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">${numberFastAnswers * this._bonusForEachFastAnswer}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${this._lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">${this._lives * this._pointsForEachLive}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${numberSlowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">${numberSlowAnswers * this._penaltyForEachSlowAnswer}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${total}</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">2.</td>
            <td>
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--wrong"></li>
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">3.</td>
            <td colspan="2">
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--unknown"></li>
              </ul>
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">950</td>
          </tr>
        </table>
      </div>`;
  }

  onBackButtonClick() {}

  bind() {
    this._element.querySelector(`.back`).addEventListener(`click`, () => this.onBackButtonClick());
  }
}
