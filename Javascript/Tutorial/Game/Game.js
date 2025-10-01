// create a value

let UserScore = 0;
let CompScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

// cont userscore
const userscorepara = document.querySelector("#User-score");
const compscorepara = document.querySelector("#Comp-score");

// choice For Computer Function
const GenCompchoice = () => {
  // rock paper scissor rendom clike
  // create Array
  const options = ["Rock", "Papper", "Scissor"];
  // random number index in Array
  const ranidx = Math.floor(Math.random() * 3);
  return options[ranidx];
};

// showwiner

const showwiner = (userwin, Userchoice, comchoice) => {
  if (userwin) {
    UserScore++;
    userscorepara.innerHTML = UserScore;
    console.log("you win..!");
    msg.innerHTML = `You win : ${Userchoice} beats ${comchoice}`;
    msg.style.backgroundColor = "green";
  } else {
    CompScore++;
    compscorepara.innerHTML = CompScore;
    console.log("your Lose..");
    msg.innerHTML = `You Lost : ${comchoice} beats ${Userchoice}`;
    msg.style.backgroundColor = "red";
  }
};

// Draw Condition Function
const Drawgame = () => {
  console.log("Game Has a Draw");
  msg.innerHTML = "Game Has A Draw Play Again.";
  msg.style.backgroundColor = "darkslategrey";
};

// Bild the Game
const PlayGame = (Userchoice) => {
  // Userchoice
  console.log(`Userchoice: ${Userchoice}`);
  // Genrate A Computer choice -> modular
  const comchoice = GenCompchoice();
  console.log(`Compchoice: ${comchoice}`);
  //   Condition for who's win
  if (Userchoice === comchoice) {
    // Draw Game and call Draw function
    Drawgame();
  } else {
    let userwin = true;
    if (Userchoice === "Rock") {
      //   scissor,paper
      userwin = comchoice === "Papper" ? false : true;
    } else if (Userchoice === "Papper") {
      // rock , scissor
      userwin = comchoice === "Scissor" ? false : true;
    } else {
      // rock , paper
      userwin = comchoice === "Rock" ? false : true;
    }
    showwiner(userwin, Userchoice, comchoice);
  }
};
choices.forEach((choice) => {
  //   console.log(choice);
  choice.addEventListener("click", () => {
    //   value of rock , paper , scissor
    const Userchoice = choice.getAttribute("id");
    // console.log("choice was click", Userchoice);s
    PlayGame(Userchoice);
  });
});
