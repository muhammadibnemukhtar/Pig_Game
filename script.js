"use strict";

const rollDice = document.querySelector(".diceroll");
const newGame = document.querySelector(".newgame");
const pass = document.querySelector(".pass");
let player1Score = document.querySelector(".score1");
let player2Score = document.querySelector(".score2");
const streakP1 = document.querySelector(".streakScore1");
const streakP2 = document.querySelector(".streakScore2");
let currP1 = document.querySelector(".currscore1");
let currP2 = document.querySelector(".currscore2");
const diceimg = document.querySelector(".Dice");
let p1passnum = document.querySelector(".p1pass");
let p2passnum = document.querySelector(".p2pass");

let p1score = 0;
let p2score = 0;
let turnscore = 0;
let activeplayer = currP1;

let p1passes = 0;
let p2passes = 0;

let strp1 = 0;
let strp2 = 0;

let startMasg = document.createElement("h2");
startMasg.textContent = "🏁 START ROLLING";
diceimg.replaceWith(startMasg);
startMasg.classList.add("winmesgstyle");
let winMesg = document.createElement("h2");
winMesg.classList.add("winmesgstyle");

const rolling = function () {
  if ((currP1 && p1passes < 3) || (currP2 && p2passes < 3)) {
    const num = Math.trunc(Math.random() * 6) + 1;
    console.log(num);
    diceimg.src = `/dice faces/${num}.png`;
    startMasg.replaceWith(diceimg);
    diceimg.classList.remove("Hidden");
    if (num != 1) {
      turnscore += num;
      activeplayer.textContent = turnscore;
    } else if (num == 1) {
      activeplayer.textContent = 0;
      turnscore = 0;
      activeplayer === currP1 ? p1passes++ : p2passes++;
      activeplayer === currP1
        ? (p1passnum.textContent = p1passes)
        : (p2passnum.textContent = p2passes);
      activeplayer = activeplayer === currP1 ? currP2 : currP1;
    }
  }
  if (p1passes == 3 && p2passes == 3) {
    winscreen();
  }
};

const winscreen = function () {
  document.querySelector("body").style.backgroundImage =
    "linear-gradient(to right, #f83600 0%, #f9d423 100%)";
  document.querySelector(".currentscore1").style.backgroundColor = "#f46b0d";
  document.querySelector(".score1").style.color = "#f46b0d";
  document.querySelector(".currentscore2").style.backgroundColor = "#f46b0d";
  document.querySelector(".score2").style.color = "#f46b0d";
  pass.removeEventListener("click", passfunction);
  rollDice.removeEventListener("click", rolling);
  if (p1score > p2score) {
    console.log("P1 winns with the lead of", p1score - p2score);
    winMesg.textContent = "🎉HOORAY! PLAYER 1 WINS!";
    document.querySelector(".score1").style.scale = "130%";
    strp1++;
    streakP1.textContent = strp1;
    diceimg.replaceWith(winMesg);
  } else if (p2score > p1score) {
    console.log("P2 winns with the lead of", p2score - p1score);
    winMesg.textContent = "🎉HOORAY! PLAYER 2 WINS!";
    document.querySelector(".score2").style.scale = "130%";
    strp2++;
    streakP2.textContent = strp2;
    diceimg.replaceWith(winMesg);
  }
};

const passfunction = function () {
  if (activeplayer == currP1 && p1passes - p2passes == 0) {
    p1score += turnscore;
    player1Score.textContent = p1score;
    activeplayer.textContent = 0;
    activeplayer = currP2;
    p1passes++;
    p1passnum.textContent = p1passes;
    console.log("p1 pass", p1passes);
    turnscore = 0;
  } else if (activeplayer == currP2 && p2passes - p1passes == -1) {
    p2score += turnscore;
    player2Score.textContent = p2score;
    activeplayer.textContent = 0;
    activeplayer = currP1;
    p2passes++;
    p2passnum.textContent = p2passes;
    console.log("p2 pass", p2passes);
    turnscore = 0;
  }
  if (p1passes == 3 && p2passes == 3) {
    winscreen();
  }
};

const againFunction = function () {
  turnscore = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  p1passnum.textContent = 0;
  p2passnum.textContent = 0;
  p1passes = 0;
  p2passes = 0;
  p1score = 0;
  p2score = 0;
  turnscore = 0;
  activeplayer.textContent = 0;
  activeplayer = currP1;
  pass.addEventListener("click", passfunction);
  rollDice.addEventListener("click", rolling);
  document.querySelector(".currentscore1").style.backgroundColor = "#9e4677";
  document.querySelector(".score1").style.color = "#9e4677";
  document.querySelector(".currentscore2").style.backgroundColor = "#ac425f";
  document.querySelector(".score2").style.color = "#ac425f";
  diceimg.classList.add("Hidden");
  winMesg.replaceWith(startMasg);
  document.querySelector("body").style.backgroundImage =
    "linear-gradient(45deg, #874da2 0%, #c43a30 100%)";
};

rollDice.addEventListener("click", rolling);
pass.addEventListener("click", passfunction);
newGame.addEventListener("click", againFunction);
