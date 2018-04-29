export default class Loader {
  constructor() {
    this._element = document.createElement(`div`);
    this._element.classList.add(`loader`);
  }
  start() {
    document.body.appendChild(this._element);
  }

  stop() {
    document.body.removeChild(this._element);
  }
}
