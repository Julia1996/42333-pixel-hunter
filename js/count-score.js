const POINTS_FOR_CORRECT_ANSWER = 100;
const NORMAL_ANSWER = {min: 10, max: 20};
const POINTS_FOR_EACH_LIVE = 50;
const POINTS_FOR_FAST_ANSWER = 50;
const PENALTY_FOR_SLOW_ANSWER = 50;

const countScore = (answers, lives) => {
  if (!(answers instanceof Array)) {
    throw new Error(`First argument should be an array`);
  }
  if (typeof lives !== `number`) {
    throw new Error(`Second argument should be a number`);
  }

  const allAnswersIsCorrect = answers.every((answer) => answer.isCorrect);
  if (!allAnswersIsCorrect) {
    return -1;
  }

  const pointsForAnswers = answers.reduce((accumulator, currentValue) => {
    let score = POINTS_FOR_CORRECT_ANSWER;
    if (currentValue.time < NORMAL_ANSWER.min) {
      score += POINTS_FOR_FAST_ANSWER;
    } else if (currentValue.time > NORMAL_ANSWER.max) {
      score -= PENALTY_FOR_SLOW_ANSWER;
    }
    return accumulator + score;
  }, 0);

  const pointsForLives = POINTS_FOR_EACH_LIVE * lives;

  return pointsForAnswers + pointsForLives;
};

export default countScore;
