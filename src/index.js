import { rand } from "./utils.js";
import { Ball } from "./Ball.js";

const numberText = document.querySelector(".display-numbers-span");
const lotteryBtn = document.querySelector(".lottery-btn");
const ballContainer = document.querySelector(".container");
const myNumbers = document.querySelector(".choosen-numbers span");
const popUp = document.querySelector(".pop-up");
const popUpTxt = document.querySelector(".pop-up span");
const resetBtn = document.querySelector(".reset-btn");

const choosenNumbersLength = 6;
const loterryArr = [];
const comparedBalls = [];
let displaydText = "";
const ballLength = 49;
const myChoosenNumbers = [];
let clicked;
const mainArr = [];

const ball = new Ball();

for (let i = 0; i < ballLength; i++) {
  const myBall = document.createElement("div");
  const styledBall = ball.createBall(myBall, i);
  mainArr.push(styledBall);
}
mainArr.forEach((ball) => ballContainer.appendChild(ball));

const showResult = () => {
  const resultArr = myChoosenNumbers.filter((number) =>
    loterryArr.includes(number)
  );
  popUpTxt.innerText = String(resultArr.length);
  popUp.classList.remove("visible");
  console.log(loterryArr);
};

const chooseOneBall = (ball) => {
  const myNumber = ball.dataset.number;

  if (myChoosenNumbers.indexOf(myNumber) === -1) {
    if (myChoosenNumbers.length >= 6) {
      alert("You have choosen 6 numbers already");
      return;
    }
    myChoosenNumbers.push(myNumber);
    ball.classList.add("clicked-ball");
    myNumbers.innerText += ` *${myNumber}*`;
    clicked = false;
  }

  if (clicked) {
    ball.classList.remove("clicked-ball");
    myChoosenNumbers.splice(myChoosenNumbers.indexOf(myNumber), 1);
    myNumbers.innerText = "";
    myChoosenNumbers.forEach((number) => {
      myNumbers.innerText += ` *${String(number)}*`;
    });
    clicked = false;
  }
  clicked = true;
};

const chooseYourBalls = () => {
  const balls = document.querySelectorAll(".ball");
  balls.forEach((ball) =>
    ball.addEventListener("click", () => chooseOneBall(ball))
  );
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
  const txtArr = displaydText.split(",");
  txtArr.pop();
  displaydText = txtArr.join(",");
  numberText.textContent = displaydText;
  showResult();
};

const chooseLuckyNumbers = () => {
  for (let i = 0; i < choosenNumbersLength; i++) {
    loterryArr.push(String(rand(1, 49)));
  }

  const uniqArr = [...new Set(loterryArr)];
  if (loterryArr.length !== uniqArr.length) {
    console.log("Array has a duplicate. Choosing another");
    loterryArr.length = 0;
    chooseLuckyNumbers();
  }
};

const clearData = () => {
  comparedBalls.forEach((ball) => ball.classList.remove("choosen-ball"));
  numberText.innerText = "";
  comparedBalls.length = 0;
  loterryArr.length = 0;
  myChoosenNumbers.length = 0;
  myNumbers.textContent = "";
  const balls = document.querySelectorAll(".ball");
  balls.forEach((ball) => ball.classList.remove("clicked-ball"));
  popUp.classList.add("visible");
};

const resetResult = () => {
  clearData();
  lotteryBtn.classList.remove("visible");
};

chooseYourBalls();

const startLottery = () => {
  if (myChoosenNumbers.length < 6) {
    alert("You have to choose 6 numbers");
    return;
  } else {
    lotteryBtn.classList.add("visible");
    if (numberText.innerText !== "") {
      clearData();
    }
    chooseLuckyNumbers();
    setTimeout(display, 4200);
    setTimeout(compareNumbers, 800);
  }
};

lotteryBtn.addEventListener("click", startLottery);
resetBtn.addEventListener("click", resetResult);
