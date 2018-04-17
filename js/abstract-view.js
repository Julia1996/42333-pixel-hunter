import getElementFromTemplate from './get-element-from-template.js';

export default class AbstractView {
  get template() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}
}
