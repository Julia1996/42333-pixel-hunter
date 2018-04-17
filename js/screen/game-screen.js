import showScreen from '../show-screen.js';
import Application from '../application';
import Game1View from '../game-1-view.js';
import Game2View from '../game-2-view.js';
import Game3View from '../game-3-view.js';
import Timer from '../timer.js';
import questions from '../questions.js';

const MAX_TIME = 30;

export default class GameScreen {
  addAnswer(correct, time) {
    this.answers.push({
      correct,
      time
    });
  }

  changeLocation(questionNumber, correct) {
    if (!correct) {
      if (this.lives === 0) {
        questionNumber = ``;
      } else {
        this.lives--;
      }
    }

    if (questions[questionNumber]) {
      this.question = questionNumber;
      this.initNewLocation();
    } else {
      Application.showStats(this.answers, this.lives);
    }
  }

  init() {
    this.question = `question1`;
    this.answers = [];
    this.lives = 3;
    this.view = new Game1View(questions[this.question], this.answers, this.lives);
    this.initNewLocation();
  }

  initNewLocation() {
    let NeededClass;
    switch (questions[this.question].location) {
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
    this.view = new NeededClass(questions[this.question], this.answers, this.lives);
    showScreen(this.view.element);
    const timer = new Timer(MAX_TIME);
    timer.onTimeEnds = () => {
      const currentIsCorrect = false;
      this.addAnswer(currentIsCorrect, MAX_TIME);
      this.changeLocation(questions[this.question].next, currentIsCorrect);
      timer.stop();
    };

    this.view.onAnswer = (answer1, answer2) => {
      timer.stop();

      // добавляем в массив ответов
      let currentIsCorrect;
      switch (questions[this.question].location) {
        case `game-1`:
          currentIsCorrect =
            (questions[this.question].image1.answer === answer1 && questions[this.question].image2.answer === answer2);
          break;
        case `game-2`:
          currentIsCorrect = (answer1.value === questions[this.question].image.answer);
          break;
        case `game-3`:
          currentIsCorrect = (answer1 === questions[this.question].paintNumber);
          break;
      }

      this.addAnswer(currentIsCorrect, MAX_TIME - timer.time);
      this.changeLocation(questions[this.question].next, currentIsCorrect);
    };

    this.view.onBackButtonClick = function () {
      timer.stop();
      Application.showWelcome();
    };
  }
}
