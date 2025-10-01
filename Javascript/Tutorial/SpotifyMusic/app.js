console.log("welcome to spotify");

// Make a array
let songIndex = 0;
let audioElement = new Audio("songs/1.m4a");
let MasterPlay = document.getElementById("MasterPlay");
let progressbar = document.getElementById("progressbar");
let gif = document.getElementById("gif");
let songItmes = Array.from(document.getElementsByClassName("songs"));
let song = [
  {
    songname: "Gulabi-Sadi",
    filepath: "songs/1/m4a",
    Images: "Images/Banner-1.jpg",
  },
  {
    songname: "Toofan",
    filepath: "songs/2/m4a",
    Images: "Images/Banner-2.jpg",
  },
  {
    songname: "Huwa-Main",
    filepath: "songs/3/m4a",
    Images: "Images/Banner-3.jpg",
  },
  {
    songname: "Dil-Tu-Jaan-Tu",
    filepath: "songs/4/m4a",
    Images: "Images/Banner-4.jpg",
  },
  {
    songname: "I-Guess",
    filepath: "songs/5/m4a",
    Images: "Images/Banner-5.jpg",
  },
  {
    songname: "DIE-WITH-SMILE",
    filepath: "songs/6/m4a",
    Images: "Images/Banner-6.jpg",
  },
];

songItmes.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = song[i].Images;
  element.getElementsByClassName("songName")[0].innerText = song[i].songname;
});

// Handle play/paush
MasterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    MasterPlay.classList.remove("fa-play");
    MasterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    MasterPlay.classList.remove("fa-pause");
    MasterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
  // console.log("clike");
});

// progressbar
// audioElement.addEventListener("timeupdate", () => {
//   // update progressbar
//   progress = prasInt((audioElement.currentTime / audioElement.duration) * 100);
//   progressbar.value = progress;
// });

// progressbar.addEventListener("change", () => {
//   audioElement.currentTime = (progressbar.value * audioElement.duration) / 100;
// });

// playlist song play and pause
const makeallplay = () => {
  Array.from(document.getElementsByClassName("songItmesplays")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItmesplay")).forEach(
  (element) => {
    element.addEventListener("clike", (e) => {
      makeallplay();
      // index = parseInt(e.target.id);
      // console.log(index)
      // e.target.classList.remove("fa-play");
      // e.target.classList.add("fa-pause");
      // audioElement.src = `songs${index}.m4a`;
      // audioElement.play();
      // MasterPlay.classList.remove("fa-pause");
      // MasterPlay.classList.add("fa-play");
      // console.log("cilkeindex")
    });
  }
);
