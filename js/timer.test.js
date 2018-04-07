import {assert} from 'chai';
import createTimer from './timer';

describe(`Timer`, () => {
  it(`should set time correctly`, () => {
    const timer = createTimer(2);
    assert.equal(2, timer.time);
  });

  it(`should not tick lower 0`, () => {
    const timer = createTimer(1);
    timer.tick();
    timer.tick();
    assert.equal(0, timer.time);
  });

  it(`should throw error if time is not a number`, () => {
    assert.throws(() => createTimer(``), /Time should be a number/);
    assert.throws(() => createTimer(null), /Time should be a number/);
    assert.throws(() => createTimer([]), /Time should be a number/);
  });
});
