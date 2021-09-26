import { rand } from "./utils.js";

const balls = document.querySelectorAll(".ball");
const numberText = document.querySelector(".display-numbers-span");
const lotteryBtn = document.querySelector(".lottery-btn");

const choosenNumbers = 6;
const loterryArr = [];
const comparedBalls = [];

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
  balls.forEach((ball) => {
    loterryArr.find((number) => {
      if (String(number) === ball.textContent) {
        comparedBalls.push(ball);
        addClass("choosen-ball", 0);
      }
    });
  });
};

const display = () => {
  loterryArr.forEach((number) => (numberText.textContent += `${number}, `));
  lotteryBtn.classList.remove("visible");
};

const chooseLuckyNumbers = () => {
  for (let i = 0; i < choosenNumbers; i++) {
    loterryArr.push(rand(1, 49));
  }
  const uniqArr = [...new Set(loterryArr)];
  if (loterryArr.length !== uniqArr.length) {
    console.log("Tablice były różne");
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
