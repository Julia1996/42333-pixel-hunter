import WelcomeScreen from './screen/welcome-screen';
import GameScreen from './screen/game-screen';
import StatsScreen from './screen/stats-screen';
import GameModel from './game-model';
import showScreen from './show-screen';

export default class Application {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    showScreen(welcomeScreen.introScreen.view.element);
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

  static showStats(answers, lives) {
    const statistics = new StatsScreen(answers, lives);
    showScreen(statistics.stats.element);
  }
}
