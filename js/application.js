import WelcomeScreen from './screen/welcome-screen';
import GameScreen from './screen/game-screen';
import StatsScreen from './screen/stats-screen';
import GameModel from './game-model';
import showScreen from './show-screen';
import Loader from './loader';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const adaptServerData = (data) => {
  const questions = {};
  data.forEach((question, i) => {
    questions[`question${i + 1}`] = {
      next: data.length === i + 1 ? `` : `question${i + 2}`,
      question: question.question
    };
    switch (question.type) {
      case `two-of-two`:
        questions[`question${i + 1}`].location = `game-1`;
        questions[`question${i + 1}`].image1 = {
          link: question.answers[0].image.url,
          width: question.answers[0].image.width,
          height: question.answers[0].image.height,
          answer: question.answers[0].type === `photo` ? `photo` : `paint`
        };
        questions[`question${i + 1}`].image2 = {
          link: question.answers[1].image.url,
          width: question.answers[1].image.width,
          height: question.answers[1].image.height,
          answer: question.answers[1].type === `photo` ? `photo` : `paint`
        };
        break;
      case `tinder-like`:
        questions[`question${i + 1}`].location = `game-2`;
        questions[`question${i + 1}`].image = {
          link: question.answers[0].image.url,
          width: question.answers[0].image.width,
          height: question.answers[0].image.height,
          answer: question.answers[0].type === `photo` ? `photo` : `paint`
        };
        break;
      case `one-of-three`:
        questions[`question${i + 1}`].location = `game-3`;
        questions[`question${i + 1}`].images = question.answers.map((answer) => answer.image.url);
        let needle;
        if (question.question === `Найдите рисунок среди изображений`) {
          needle = `painting`;
        } else {
          needle = `photo`;
        }
        questions[`question${i + 1}`].correctNumber = 1 + question.answers.findIndex((answer) => answer.type === needle);
        break;
    }
  });
  console.log(questions);
  return questions;
};

export default class Application {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    showScreen(welcomeScreen.introScreen.view.element);
  }

  static showGame(userName) {
    const loader = new Loader();
    loader.start();
    fetch(`https://es.dump.academy/pixel-hunter/questions`)
        .then(checkStatus)
        .then((response) => response.json())
        .then(adaptServerData)
        .then((questions) => {
          const model = new GameModel(userName, questions);
          const gameScreen = new GameScreen(model);
          gameScreen.startGame();
        })
        .catch(Application.showError)
        .then(() => loader.stop());
  }

  static showStats(answers, lives) {
    const statistics = new StatsScreen(answers, lives);
    showScreen(statistics.stats.element);
  }

  static showError(error) {
    const errorMessage = document.createElement(`p`);
    errorMessage.textContent = error.message;
    showScreen(errorMessage);
  }
}
