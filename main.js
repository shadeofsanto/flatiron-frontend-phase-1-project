//changing vars go here
let movieData = [];
let rdmNum;
let movieId;

//Const vars go here
const dirHint = document.getElementById("directHint");
const ansrKey = document.getElementById("answer-key");
const setUP = document.getElementById("SetUpPage");
const gameCon = document.getElementById("game-container");
const movImg = document.getElementById("movie-image");
const hitTxt = document.getElementById("hint-text");
const Rslts = document.getElementById("result");
const gameField = document.getElementById("GameFeild");
const btnField = document.getElementById("BtnFeild");


// Fetch movie data from db.json through git hub
console.log("Start fetch");
fetch('http://localhost:3000/movieData')
  .then(response => response.json())
  .then(data => {
    movieData = data;
    data = data.dataMovie;
    loadMovie();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });

  //here we are going to get the data for our movie
  function loadMovie (){
    movImg.style.display = "visible";
    //debug data line(s) go here
    console.log("load at loadMovie()");
    //END debug

    rdmNum = Math.floor(Math.random() * movieData.length);

    movieData.forEach(crntMov => {
      if(crntMov.id == rdmNum){
        movieId = crntMov.id -1;
        console.log("rdm num is ${rdmNum}.  Picked ${crntMov.name} as base line.");
      }
 console.log(`I am on ${crntMov.name} Movie!`);
    });
    displayMovie();
  }

  function displayMovie (){
    movImg.src = movieData[movieId].imageUrl
    movImg.alt = "Movie Image";
    movImg.style.display = "block";
  }