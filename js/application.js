import WelcomeScreen from './screen/welcome-screen';
import GameScreen from './screen/game-screen';
import StatsScreen from './screen/stats-screen';

export default class Application {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    welcomeScreen.init();
  }

  static showGame() {
    const newGameScreen = new GameScreen();
    newGameScreen.init();
  }

  static showStats(answers, lives) {
    const statsScreen = new StatsScreen(answers, lives);
    statsScreen.init();
  }
}
