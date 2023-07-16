//changing vars go here
let movieData = [];
let rdmNum;
let movieId;
let dbug = true; //Default on(true) or off(false) for debug option
let Endgame = 0;
let points = 0;
let popUpMsg = "";

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
const closePopUp = document.getElementById("popUpClose")
const overlay = document.getElementById("overlay")
const popUp = document.getElementById("popUp")
const popUpContent = document.getElementById("popUpContent")


//!!!DEBUG!!! data line(s) go here
  console.log(`At fetch db` + '\n' + " ");
//END debug

// Fetch movie data from db.json
console.log("Start fetch");
fetch('http://localhost:3000/movieData')
  .then(response => response.json())
  .then(data => {
    movieData = data;
    data = data.dataMovie;
    HowManyTime();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });

  function HowManyTime(){
    //debug
      console.log('At howmanytimes()')
    //end debug

    //making the setup area visible and hiding the game area
    gameField.style.visibility = "hidden";
    setUP.style.visibility = "visible";


  
    //set up how many rounds a player wants to play
    setUP.innerHTML = `
    <h1>How many rounds do you wanna play?</h1>
    <br>
    <p>Min is 1 and max is ${movieData.length}!</p>
    <input type="text" id="amount-of-rounds" placeholder="1 - ${movieData.length}">
    <button id="roundbtn" class="btn" onclick="checkRoundNum()">Enter</button>
    `
  }

  function checkRoundNum(){
    if(dbug){
      console.log(`at checkroundnum()`)
    }

    Endgame = document.getElementById("amount-of-rounds").value;

    if (isNaN(Endgame)){
      popUpMsg = `
      <h1>${Endgame} is not a number.</h1>
      <p>Please enter a number 1 - ${movieData.length}</p>
      <br>
      <button id="roundbtn" class="btn" onclick="ClosePopUp(), HowManyTime()">Retry</button>
      `
      OpenPopUp(false)
      return;
    } 

    else if(Endgame < 1 || Endgame > movieData.length) {
      popUpMsg = `
      <h1>${Endgame} is not a valid number.</h1>
      <p>Please enter a number 1 - ${movieData.length}</p>
      <br>
      <button id="roundbtn" class="btn" onclick="ClosePopUp(), HowManyTime()">Retry</button>
      `
      OpenPopUp(false)
      return;
    }
    else {
      Choice();
    }
  }

  function Choice(){
    if(dbug){
      console.log(`at choice()`)
    }
  }

  function SetUp (){
    //Debug
    if (dbug){
      console.log(`At SetUp()` + '\n' + " ");
    }
    //END debug

    //Just making things visible or not.
    dirHint.style.visibility = "visible";
    ansrKey.style.visibility = "visible";
    setUP.style.visibility = "hidden";
    gameCon.style.visibility = "visible";
    movImg.style.visibility = "visible";
    hitTxt.style.visibility = "visible";
    Rslts.style.visibility = "hidden";
    gameField.style.visibility = "visible";
    btnField.style.visibility = "visible";

    loadMovie();
  }

  //here we are going to get the data for our movie
  function loadMovie (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At loadMovie()-----` + '\n' + " ");
    }
    //END debug

    rdmNum = Math.floor(Math.random() * movieData.length+1); //Getting a random number

          //!!!!DEBUG!!!!
          if (dbug){
            console.log(`rdm num is ${rdmNum}.`);
          }
          //END DEBUG

    // matching movieData.id to random number
    movieData.forEach(crntMov => {
      if(crntMov.id == rdmNum){
        movieId = crntMov.id-1;

      //!!!!DEBUG!!!!
      if (dbug){
        console.log(`Picked ${crntMov.name} with ID of ${crntMov.id}.`);
      }
      //END DEBUG
      }
    });
    displayMovie();
  }

  //This function will show all movie data
  function displayMovie (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At displayMovie()-----` + '\n' + " ");
    }
    //END debug

    //Displaying movie image
    movImg.src = movieData[movieId].imageUrl
    movImg.alt = "Movie Image";
    movImg.style.display = "block";
  }

//Hitting "/" on keyboard will turn on/off debug
document.addEventListener('keypress', (event) =>{
let keyCode = event.key;
      
if(keyCode == "/" || keyCode == "/"){
  if (dbug){
      dbug = false;
      console.log(`dbug = ${dbug}`);
    }
  else{
      dbug=true;
      console.log(`dbug = ${dbug}`);
    }
  }
});

closePopUp.onclick= function(){
  overlay.style.display = `none`;
  popUp.style.display = `none`;
}

function OpenPopUp(xPopUp){
  overlay.style.display= `block`
  if (xPopUp){
    closePopUp.style.visibility=`visible`;
  }
  else {
    closePopUp.style.visibility=`hidden`;
  }
  popUpContent.innerHTML=popUpMsg;
}

function ClosePopUp(){
  overlay.style.display = `none`;
}

console.log(`!!!dbug is ${dbug} by default!!!`);