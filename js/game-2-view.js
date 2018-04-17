import AbstractView from './abstract-view.js';
import getHeader from './header.js';
import getStatsBottom from './stats-bottom.js';

export default class Game2View extends AbstractView {
  constructor(question, answers, lives) {
    super();
    this._question = question;
    this._answers = answers;
    this._lives = lives;
  }

  get template() {
    return `${getHeader(this._lives)}
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._question.image.link}" alt="Option 1" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo" class="radiobutton">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint" class="radiobutton">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <div class="stats">
        ${getStatsBottom(this._answers)}
      </div>
    </div>`;
  }

  onAnswer() {}

  onBackButtonClick() {}

  bind() {
    this._element.addEventListener(`change`, () => {
      if (event.target.classList.contains(`radiobutton`)) {
        const answer = this._element.querySelector(`input[name="question1"]:checked`);

        if (answer) {
          this.onAnswer(answer);
        }
      }
    }, true);

    this._element.querySelector(`.back`).addEventListener(`click`, () => this.onBackButtonClick());
  }
}
