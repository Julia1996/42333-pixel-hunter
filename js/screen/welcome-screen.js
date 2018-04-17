import IntroScreen from '../intro.js';
import showScreen from '../show-screen.js';

export default class WelcomeScreen {
  constructor() {
    this.introScreen = new IntroScreen();
    this.introScreen.init();
  }

  init() {
    showScreen(this.introScreen.view.element);
  }
}
