import showScreen from '../show-screen.js';
import getGreeting from '../greeting.js';
import StatsView from '../stats-view.js';

export default class StatsScreen {
  constructor(answers, lives) {
    this.stats = new StatsView(answers, lives);

    this.stats.onBackButtonClick = function () {
      showScreen(getGreeting());
    };
  }
}
