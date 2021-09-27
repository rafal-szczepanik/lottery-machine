import { rand } from "./utils.js";

const numberText = document.querySelector(".display-numbers-span");
const lotteryBtn = document.querySelector(".lottery-btn");
const ballContainer = document.querySelector(".container");

const choosenNumbers = 6;
const loterryArr = [];
const comparedBalls = [];
let displaydText = "";
const ballLength = 49;

const createBalls = () => {
  for (let i = 0; i < ballLength; i++) {
    const myBall = document.createElement("div");
    myBall.classList.add("ball");
    myBall.innerText = `${i + 1}`;
    ballContainer.appendChild(myBall);
  }
};

const addClass = (className, index) => {
  if (typeof index === "undefined") {
    index = 0;
  }
  if (comparedBalls.length > index) {
    comparedBalls[index].classList.add(className);
    setTimeout(() => {
      addClass(className, index + 1);
    }, 500);
  }
};

const compareNumbers = () => {
  const balls = document.querySelectorAll(".ball");
  balls.forEach((ball) => {
    loterryArr.find((number) => {
      if (String(number) === ball.innerText) {
        comparedBalls.push(ball);
        addClass("choosen-ball", 0);
      }
    });
  });
};

const display = () => {
  displaydText = "";
  loterryArr.forEach((number) => (displaydText += `${number}, `));
  lotteryBtn.classList.remove("visible");
  const txtArr = displaydText.split(",");
  txtArr.pop();
  displaydText = txtArr.join(",");
  numberText.textContent = displaydText;
};

const chooseLuckyNumbers = () => {
  for (let i = 0; i < choosenNumbers; i++) {
    loterryArr.push(rand(1, 49));
  }
  const uniqArr = [...new Set(loterryArr)];
  if (loterryArr.length !== uniqArr.length) {
    console.log("Arrays are diffrent. Choosing another");
    loterryArr.length = 0;
    chooseLuckyNumbers();
  }
};

const clearData = () => {
  comparedBalls.forEach((ball) => ball.classList.remove("choosen-ball"));
  numberText.innerText = "";
  comparedBalls.length = 0;
  loterryArr.length = 0;
};
createBalls();

const startLottery = () => {
  lotteryBtn.classList.add("visible");
  if (numberText.innerText !== "") {
    clearData();
  }
  chooseLuckyNumbers();
  setTimeout(display, 3000);
  compareNumbers();
};

lotteryBtn.addEventListener("click", startLottery);
