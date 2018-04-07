const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be a number`);
  }

  return {
    time,
    onEnd() {},
    tick() {
      if (this.time > 0) {
        this.time--;
      }
      if (this.time === 0) {
        this.onEnd();
      }
    }
  };
};

export default createTimer;
