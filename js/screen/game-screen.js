import showScreen from '../show-screen.js';
import Application from '../application';
import Game1View from '../game-1-view.js';
import Game2View from '../game-2-view.js';
import Game3View from '../game-3-view.js';
import Timer from '../timer.js';

const MAX_TIME = 30;

export default class GameScreen {
  constructor(model) {
    this._model = model;
  }
  addAnswer(correct, time) {
    this._model.answers.push({
      correct,
      time
    });
  }

  changeLocation(questionNumber, correct) {
    if (!correct) {
      if (this._model.lives === 0) {
        questionNumber = ``;
      } else {
        this._model.lives--;
      }
    }

    if (this._model.questions[questionNumber]) {
      this._model.question = questionNumber;
      this.initNewLocation();
    } else {
      Application.showStats(this._model.answers, this._model.lives);
    }
  }

  startGame() {
    this.view = new Game1View(this._model.questions[this._model.question], this._model.answers, this._model.lives);
    this.initNewLocation();
  }

  initNewLocation() {
    let NeededClass;
    switch (this._model.questions[this._model.question].location) {
      case `game-1`:
        NeededClass = Game1View;
        break;
      case `game-2`:
        NeededClass = Game2View;
        break;
      case `game-3`:
        NeededClass = Game3View;
        break;
    }
    this.view = new NeededClass(this._model.questions[this._model.question], this._model.answers, this._model.lives);
    showScreen(this.view.element);
    const timer = new Timer(MAX_TIME);
    timer.onTimeEnds = () => {
      const currentIsCorrect = false;
      this.addAnswer(currentIsCorrect, MAX_TIME);
      this.changeLocation(this._model.questions[this._model.question].next, currentIsCorrect);
      timer.stop();
    };

    this.view.onAnswer = (answer1, answer2) => {
      timer.stop();

      // добавляем в массив ответов
      let currentIsCorrect;
      switch (this._model.questions[this._model.question].location) {
        case `game-1`:
          currentIsCorrect =
            (this._model.questions[this._model.question].image1.answer === answer1 && this._model.questions[this._model.question].image2.answer === answer2);
          break;
        case `game-2`:
          currentIsCorrect = (answer1.value === this._model.questions[this._model.question].image.answer);
          break;
        case `game-3`:
          currentIsCorrect = (answer1 === this._model.questions[this._model.question].paintNumber);
          break;
      }

      this.addAnswer(currentIsCorrect, MAX_TIME - timer.time);
      this.changeLocation(this._model.questions[this._model.question].next, currentIsCorrect);
    };

    this.view.onBackButtonClick = function () {
      timer.stop();
      Application.showWelcome();
    };
  }
}
