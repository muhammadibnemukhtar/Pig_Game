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

let p1score = 0;
let p2score = 0;
let turnscore = 0;
let activeplayer = currP1;

let p1passes = 0;
let p2passes = 0;

let winMesg = document.createElement("h2");
winMesg.classList.add("winmesgstyle");

diceimg.classList.add("Hidden");

const rolling = function () {
  if ((currP1 && p1passes < 5) || (currP2 && p2passes < 5)) {
    const num = Math.trunc(Math.random() * 6) + 1;
    console.log(num);
    diceimg.src = `/dice faces/${num}.png`;
    diceimg.classList.remove("Hidden");
    if (num != 1) {
      turnscore += num;
      activeplayer.textContent = turnscore;
    } else if (num == 1) {
      activeplayer.textContent = 0;
      turnscore = 0;
      activeplayer === currP1 ? p1passes++ : p2passes++;
      activeplayer === currP1
        ? console.log("p1 pass", p1passes)
        : console.log("p2 pass", p2passes);
      activeplayer = activeplayer === currP1 ? currP2 : currP1;
    }
  }
  if (p1passes == 5 && p2passes == 5) {
    if (p1score > p2score) {
      console.log("P1 winns with the lead of", p1score - p2score);
      winMesg.textContent = "🎉HOORAY! PLAYER 1 WINS!";
      diceimg.replaceWith(winMesg);
    } else if (p2score > p1score) {
      console.log("P2 winns with the lead of", p2score - p1score);
      winMesg.textContent = "🎉HOORAY! PLAYER 2 WINS!";
      diceimg.replaceWith(winMesg);
    }
  }
};

rollDice.addEventListener("click", rolling);
pass.addEventListener("click", function () {
  if (activeplayer == currP1 && p1passes - p2passes == 0) {
    p1score += turnscore;
    player1Score.textContent = p1score;
    activeplayer.textContent = 0;
    activeplayer = currP2;
    p1passes++;
    console.log("p1 pass", p1passes);
    turnscore = 0;
  } else if (activeplayer == currP2 && p2passes - p1passes == -1) {
    p2score += turnscore;
    player2Score.textContent = p2score;
    activeplayer.textContent = 0;
    activeplayer = currP1;
    p2passes++;
    console.log("p2 pass", p2passes);
    turnscore = 0;
  }
});
