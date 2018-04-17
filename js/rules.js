import showScreen from './show-screen.js';
import getGreeting from './greeting.js';
import RulesView from './rules-view.js';
import Application from './application';

export default () => {
  const rules = new RulesView();

  rules.onSubmitName = function () {
    Application.showGame();
  };

  rules.onBackButtonClick = function () {
    showScreen(getGreeting());
  };

  return rules.element;
};
