import questions from './questions.js';

export default class GameModel {
  constructor(userName) {
    this.userName = userName;
    this.questions = questions;
    this.question = `question1`;
    this.answers = [];
    this.lives = 3;
  }
}
