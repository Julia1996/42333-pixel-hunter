import showCrossFade from './show-cross-fade';
import getGreeting from './greeting.js';
import IntroView from './intro-view.js';

export default class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    this.view.onAsteriskClick = function () {
      showCrossFade(getGreeting());
    };
  }

  showGreeting() {
    showCrossFade(getGreeting());
  }
}
