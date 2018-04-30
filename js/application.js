import WelcomeScreen from './screen/welcome-screen';
import GameScreen from './screen/game-screen';
import StatsScreen from './screen/stats-screen';
import GameModel from './game-model';
import showScreen from './show-screen';
import Loader from './loader';
import showCrossFade from './show-cross-fade';
import getGreeting from './greeting.js';

const QUESTIONS_URL = `https://es.dump.academy/pixel-hunter/questions`;
const STATS_URL = `https://es.dump.academy/pixel-hunter/stats/t42rhs8t4r`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

let gameQuestions;

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
  return questions;
};

const loadAllImages = (data) => {
  const imagesUrls = [];
  data.forEach((question) => question.answers.forEach((answer) => imagesUrls.push(answer.image.url)));
  return imagesUrls.map((url) => new Promise((resolve, reject) => {
    const imageElement = document.createElement(`img`);
    imageElement.addEventListener(`load`, resolve);
    imageElement.addEventListener(`error`, reject);
    imageElement.src = url;
  }));
};

export default class Application {

  static showIntro() {
    const welcomeScreen = new WelcomeScreen();
    showScreen(welcomeScreen.introScreen.view.element);

    fetch(QUESTIONS_URL)
        .then(checkStatus)
        .then((response) => response.json())
        .then((data) => {
          gameQuestions = adaptServerData(data);
          return loadAllImages(data);
        })
        .then((promises) => Promise.all(promises))
        .then(() => Application.showGreeting())
        .catch(Application.showError);
  }

  static showGreeting() {
    showCrossFade(getGreeting());
  }

  static showGame(userName) {
    const model = new GameModel(userName, gameQuestions);
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

  static showStats(answers, lives, userName) {
    const loader = new Loader();
    loader.start();

    fetch(`${STATS_URL}-${userName}`, {
      method: `POST`,
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({answers, lives}),
      protocol: `http:`
    })
        .then(checkStatus)
        .then(() => fetch(`${STATS_URL}-${userName}`))
        .then(checkStatus)
        .then((response) => response.json())
        .then((stats) => {
          const statistics = new StatsScreen(stats);
          showScreen(statistics.stats.element);
        })
        .catch(Application.showError)
        .then(() => loader.stop());
  }

  static showError(error) {
    const errorMessage = document.createElement(`p`);
    errorMessage.textContent = error.message;
    showScreen(errorMessage);
  }
}
