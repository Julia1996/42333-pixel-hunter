import showScreen from '../show-screen.js';
import getGreeting from '../greeting.js';
import StatsView from '../stats-view.js';

export default class StatsScreen {
  constructor(answers, lives, prevStats) {
    this.stats = new StatsView(answers, lives, prevStats);

    this.stats.onBackButtonClick = function () {
      showScreen(getGreeting());
    };
  }
}
