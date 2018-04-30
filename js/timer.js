export default class Timer {
  constructor(time) {
    this.time = time;
    this._intervalId = setInterval(() => this.tick(), 1000);
    this._timerElement = document.querySelector(`.game__timer`);
  }

  onTick() {
    this._timerElement.textContent = this.time;
  }

  onTimeEnds() {}

  stop() {
    clearInterval(this._intervalId);
  }

  tick() {
    this.time--;
    this.onTick();
    if (this.time === 0) {
      this.stop();
      this.onTimeEnds();
    }
  }
}
