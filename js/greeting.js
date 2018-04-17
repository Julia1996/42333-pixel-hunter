import showScreen from './show-screen.js';
import getRules from './rules.js';
import GreetingView from './greeting-view.js';

export default () => {
  const greeting = new GreetingView();

  greeting.onContinueClick = function () {
    showScreen(getRules());
  };

  return greeting.element;
};
