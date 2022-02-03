export class Ball {
  constructor(ball) {
    this.ball = ball;
  }
  createBall(ball, index) {
    ball.dataset.number = index + 1;
    ball.innerText = index + 1;
    ball.classList.add("ball");
    return ball;
  }
}
