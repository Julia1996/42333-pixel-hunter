import showScreen from './show-screen.js';
import getGreeting from './greeting.js';
import IntroView from './intro-view.js';

export default class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    this.view.onAsteriskClick = function () {
      showScreen(getGreeting());
    };
  }
}
