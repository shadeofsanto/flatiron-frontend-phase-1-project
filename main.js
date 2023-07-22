//let vars go here
let movieData = [];
let rdmNum;
let movieId;
let dbug = true;
let endGame = 0;
let points = 0;
let popUpMesg = "";
let choiceGame;
let lvl = 1;
let hint;
let hintR;
let holder=[];
let btnHint;
let movieNum=[];
let getRight=0;
let getWrong=0;
let score=0;

//Const vars go here
const dirHint = document.getElementById("directHint");
const ansrKey = document.getElementById("answerKey");
const setUP = document.getElementById("SetUpPage");
const gameCon = document.getElementById("gameContainer");
const movImg = document.getElementById("movieImage");
const hitTxt = document.getElementById("hintText");
const Rslts = document.getElementById("result");
const gameField = document.getElementById("gameField");
const btnField = document.getElementById("btnField");
const closePopup = document.getElementById("popUpClose");
const overlay = document.getElementById("overlay");
const popUP = document.getElementById("popUp");
const popUpContent = document.getElementById("popUpContent");

//Check 1
  console.log(`At fetch db`);
//End check 1

//Fetching movie data from db.json
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
    //check 2
        console.log(`-----At HowManyTime()-----` + '\n' + " ");
    //END check 2

      //Making the setup area visible while hiding the game area
      gameCon.style.visibility = "hidden";
      setUP.style.visibility = "visible";

      //creating an input field with button so players can input how many rounds they want to play
      setUP.innerHTML = `
      <h1>How many rounds do you wana play?</h1> 
      <br>
      <p>Min is 1 and max is ${movieData.length}!</p>
      <input type="text" id="amountOfRounds" placeholder="1 - ${movieData.length}">
      <button id="roundbtn" class = "btn" onclick = "checkRoundNum()">Enter</button>
      `
  }

  function checkRoundNum() {
    //check 3 with new dbug event to stop people from seeing answers in console window
    if (dbug){
    console.log(`At checkRoundNum()` + '\n' + 
    `I saw that input "amountOfRounds" is sending ${document.getElementById("amountOfRounds").value}`);
    }
    //END check 3

    endGame = document.getElementById("amountOfRounds").value;

    if (isNaN(endGame)) {
      popUpMesg = `
      <h1>${endGame} is <i>NOT</i> a number!</h1> 
      <p>Please enter a number 1 to ${movieData.length}</p>
      <br>
      <button id="roundbtn" class = "btn" onclick = "ClosePopup(), HowManyTime()">Retry</button>`
      OpenPopup(false)
      return;
    }

    else if (endGame<1 || endGame>movieData.length) {
      popUpMesg = `
      <h1>${endGame} is <i>NOT</i> a valid number!</h1>
      <p>Please enter a number 1 to ${movieData.length}</p>
      <br>
      <button id="roundbtn" class = "btn" onclick = "ClosePopup(), HowManyTime()">Retry</button>`
      OpenPopup(false)
      return;
    }

    else {
      Choice();
    }

  }
  
  function Choice(){
    //check 4
    if (dbug){
      console.log(`At Choice()`);
    }
    //END check 4

    points = 100/endGame;
    //check 5
    if (dbug){
      console.log(`Questions are worth ${points} each.  There will be ${endGame} question(s).`);
    }
    //END check 5
    setUP.innerHTML = `
    <p>Questions are worth ${Math.round(points)} each.  There will be ${endGame} question(s).</p>
    <h1>Choose your Style</h1>
    <select id="gamePlay" multiple>
    <option value = true selected>Multiple Choice</option>
    <option value = false>Type it in</option>
    </select>
    <br>
    <button id="roundbtn" class="btn" onclick="Diff()">Next</button>`
  }

  function Diff() {
    //check 5
    if (dbug){
      console.log(`At Diff()`);
    }
    //END check 5

    choice = document.getElementById("gamePlay").value

    setUP.innerHTML = `
    <h1>Choose your Difficulty</h1>
    <select id="gamePlay" multiple>
    <option value=1 selected>Easy</option>
    <option value=2>Medium</option>
    <option value=3>Hard</option>
    </select>
    <br>
    <button id="roundbtn" class="btn" onclick="SetUp()">Next</button>
    `

  }

  function SetUp (){
    //check 6
    if (dbug){
      console.log(`-----At SetUp()-----` + '\n' + " ");
    }
    //END check 6

    lvl = document.getElementById("gamePlay").value

    //Just making things visible or not.
    dirHint.style.visibility = "visible";
    ansrKey.style.visibility = "visible";
    setUP.style.display = "none";
    gameCon.style.visibility = "visible";
    movImg.style.visibility = "visible";
    hitTxt.style.visibility = "visible";
    Rslts.style.visibility = "hidden";
    gameField.style.visibility = "visible";
    btnField.style.visibility = "visible";

    //played around with switch statement to show/hide buttons
    switch(choiceGame) {
      case choiceGame:
        btnField.innerHTML=`
        <button id="hintButton" onclick = "showHint()">Quote Hint</button>
        <button id="nextButton" onclick = "nextMovie()"style="visibility:hidden;">Next Movie</button> `;
      break;

      case !choiceGame:
        gameField.innerHTML=`
        <input type="text" id="guessInput" placeholder="Enter Your Guess">
        button id="submit-button onclick="submitAnswer()">Submit</button>`;
        btnSub = document.getElementById(`submit-button`);
        btnField.innerHTML= `
        <button id="hintButton" onclick="showHint()">Quote Hint</button>
        <button id="nextButton" onclick="nextMovie()" style="visibility:hidden;">Next Movie"</button>`
        btnNext=document.getElementById(`nextButton`);
      break;
    
      default:
        popUpMesg=`
        <h1>Something has gone wrong!</h1>
        <br>
        <buttton class="btn" onclick="location.reload()">Refresh</button>
        `
        OpenPopup(false);
      break;

    }

    switch (lvl){

      case "1":
        hint=false;
        hintR=true;
        loadMovie()
      break;

      case "2":
        hint=true;
        hintR=false;
        loadMovie()
      break;

      case "3":
        hint=false;
        hintR=false;
        loadMovie()

      break;

      default:
        popUpMesg=`
        <h1>Something has gone wrong!</h1>
        <br>
        <button onclick="location.reload()">Refresh</button>
        `
        OpenPopup(false);
      break;

    }
  }

  //This retrieves the data for the movie
  function loadMovie (){
    //check 7
    if (dbug){
      console.log(`At loadMovie()`);
    }
    //END check 7

    holder=[];
    btnHint=document.getElementById("hintButton");

    movieData.forEach(crntMov => {
      holder.push(crntMov.name)
    });

    rdmNum = Math.floor(Math.random() * movieData.length);

    if(movieNum.length<1){
      subEnter=true;
      movieNum.push(movieData[rdmNum].id)
      displayMovie()
    }  

    else if(movieNum.length >= endGame){
      popUpMesg = `
      <h1>You have reached the end!</h1>
      <p>You got ${getRight} correct and ${getWrong} incorrect.</p>
      <br>
      <p>Your overall score is ${Math.round(score)}</p>
      <button id="roundbtn" class = "btn" onclick = "location.reload()">Play Again</button>
      `
      OpenPopup(false)
    }

    else if(repeatCheck()!=true){
      subEnter = true;
      movieNum.push(movieData[rdmNum].id)
      displayMovie()
    }  

    else{
      loadMovie();
    }
  }

  //function to show the movie image
  function displayMovie (){
    //check 8
    if (dbug){
      console.log(`At displayMovie()`);
    }
    //END check 8

    if (!hint){
      btnHint.style.visibility="hidden";
    }
    else{
      btnHint.style.visibility="visable";
    }

    movImg.src = movieData[rdmNum].imageUrl
    movImg.alt = "Movie Image";
    movImg.style.display = "block";

    dirHint.innerText=`Director: ${movieData[rdmNum].directorHint}`
    hitTxt.innerText=movieData[rdmNum].hintQuote;

    ansrKey.style.display="block";

    if(choice){
      subEnter=false;
      fillinTheBlanks();
    }
    //event listener to make the enter key continue the game...mostly because I found myself hitting enter to try to continue the game and was getting annoyed
    // document.addEventListener(`keypress`, (event) =>{
    //   let keyCode=event.key;
    //   if(keyCode=="enter" || keyCode=="Enter" && subEnter){
    //     btnSub.click();
    //   }
    // });
  }

document.addEventListener(`keypress`, (event) =>{
      let keyCode=event.key;
      if(keyCode=="enter" || keyCode=="Enter" && subEnter){
        btnSub.click();
      }
    });

//Hitting "/" on keyboard will turn on/off certain console msgs
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

closePopup.onclick = function() {
  overlay.style.display = 'none';
  popUP.style.display = 'none';
}

function OpenPopup (xpopup){
  overlay.style.display = 'block';
  if (xpopup){
    closePopup.style.visibility = "visible";
  }
  else {
    closePopup.style.visibility = "hidden";
  }

  popUpContent.innerHTML = popUpMesg;

}

function ClosePopup (){
  overlay.style.display = 'none';

}

console.log(`dbug is ${dbug} by default`);