export default class GameModel {
  constructor(userName, questions) {
    this.userName = userName;
    this.questions = questions;
    this.question = `question1`;
    this.answers = [];
    this.lives = 3;
  }
}
