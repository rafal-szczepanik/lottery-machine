import { rand } from "./utils.js";

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

const createBalls = () => {
  for (let i = 0; i < ballLength; i++) {
    const myBall = document.createElement("div");
    myBall.classList.add("ball");
    myBall.dataset.number = `${i + 1}`;
    myBall.innerText = `${i + 1}`;
    ballContainer.appendChild(myBall);
  }
};

const showResult = () => {
  console.log(myChoosenNumbers);
  console.log(loterryArr);

  const resultArr = myChoosenNumbers.filter((number) =>
    loterryArr.includes(number)
  );
  console.log(resultArr);
  popUpTxt.innerText = String(resultArr.length);
  popUp.classList.remove("visible");
};

const chooseOneBall = (ball) => {
  const myNumber = ball.dataset.number;
  if (myChoosenNumbers.length >= 6) {
    alert("You have choosen 6 numbers already");
    return;
  }

  if (myChoosenNumbers.indexOf(myNumber) === -1) {
    myChoosenNumbers.push(myNumber);
    ball.classList.add("clicked-ball");
    myNumbers.innerText += ` *${myNumber}*`;
  }
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
  lotteryBtn.classList.remove("visible");
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
createBalls();
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
resetBtn.addEventListener("click", clearData);
