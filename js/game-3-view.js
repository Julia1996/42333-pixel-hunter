import AbstractView from './abstract-view.js';
import getHeader from './header.js';
import getStatsBottom from './stats-bottom.js';

export default class Game3View extends AbstractView {
  constructor(question, answers, lives) {
    super();
    this._question = question;
    this._answers = answers;
    this._lives = lives;
  }
  get template() {
    return `${getHeader(this._lives)}
    <div class="game">
      <p class="game__task">${this._question.question}</p>
      <form class="game__content  game__content--triple">
        ${this._question.images.map((image, i) => `<div class="game__option" data-num="${i + 1}">
          <img src="${image}" alt="Option 1" width="304" height="455">
        </div>`).join(``)}
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
    this._element.addEventListener(`click`, () => {
      const image = event.target.closest(`.game__option`);
      if (image) {
        this.onAnswer(+image.dataset.num);
      }
    }, false);

    this._element.querySelector(`.back`).addEventListener(`click`, () => this.onBackButtonClick());
  }
}
