import countScore from './count-score';
import {assert} from 'chai';

describe(`countScore`, () => {
  it(`should fail the game if correct answers is less then 10`, () => {
    assert.equal(-1, countScore([
      {isCorrect: true, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30},
      {isCorrect: false, time: 30}
    ], 3));
  });

  it(`should return 1150 if all answers are correct and time is middle`, () => {
    assert.equal(1150, countScore([
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15}
    ], 3));
  });

  it(`should return 1000 if all answers are correct and time is middle`, () => {
    assert.equal(1100, countScore([
      {isCorrect: true, time: 5},
      {isCorrect: true, time: 5},
      {isCorrect: true, time: 25},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15}
    ], 1));
  });

  it(`should throw error if data is incorrect`, () => {
    assert.throws(() => countScore(null, 1), /First argument should be an array/);
    assert.throws(() => countScore([], null), /Second argument should be a number/);
  });
});
