//let vars go here
let movieData = [];
let rdmNum;
let movieId;
let dbug = true;
let Endgame = 0;
let points = 0;
let popupmesg = "";
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
const ansrKey = document.getElementById("answer-key");
const setUP = document.getElementById("SetUpPage");
const gameCon = document.getElementById("game-container");
const movImg = document.getElementById("movie-image");
const hitTxt = document.getElementById("hint-text");
const Rslts = document.getElementById("result");
const gameField = document.getElementById("GameFeild");
const btnField = document.getElementById("BtnFeild");
const closePopup = document.getElementById("popUpClose");
const overlay = document.getElementById("overlay");
const popUP = document.getElementById("popup");
const popupContent = document.getElementById("popupcontent");

//!!!DEBUG!!! data line(s) go here
  console.log(`-----At fetch db-----` + '\n' + " ");
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
    //!!!!DEBUG!!!!
        console.log(`-----At HowManyTime()-----` + '\n' + " ");
      //END DEBUG

      //Making the setup areia visible while hiding the game area
      gameCon.style.visibility = "hidden";
      setUP.style.visibility = "visible";

      //creating an input feild with button so players can input how many rounds they want to play
      setUP.innerHTML = `
      <h1>How many rounds do you wana play?</h1> 
      <br>
      <p>Min is 1 and max is ${movieData.length}!</p>
      <input type="text" id="amount-of-rounds" placeholder="1 - ${movieData.length}">
      <button id="roundbtn" class = "btn" onclick = "checkRoundNum()">Enter</button>
      `
  }

  function checkRoundNum() {
    //!!!!DEBUG!!!!
    if (dbug){
    console.log(`-----At checkRoundNum()-----` + '\n' + 
    `I saw that input "amount-of-rounds" is sending ${document.getElementById("amount-of-rounds").value}`);
    }
    //END DEBUG

    Endgame = document.getElementById("amount-of-rounds").value;

    if (isNaN(Endgame)) {
      popupmesg = `
      <h1>${Endgame} is <i>NOT</i> a number!</h1> 
      <p>Please enter a number 1 to ${movieData.length}</p>
      <br>
      <button id="roundbtn" class = "btn" onclick = "ClosePopup(), HowManyTime()">Retry</button>
      `
      OpenPopup(false)
      return;
    }

    else if (Endgame<1 || Endgame>movieData.length) {
      popupmesg = `
      <h1>${Endgame} is <i>NOT</i> a valid number!</h1>
      <p>Please enter a number 1 to ${movieData.length}</p>
      <br>
      <button id="roundbtn" class = "btn" onclick = "ClosePopup(), HowManyTime()">Retry</button>
      `
      OpenPopup(false)
      return;
    }

    else {
      Choice();
    }

  }
1
  function Choice(){
    //!!!!DEBUG!!!!
    if (dbug){
      console.log(`-----At Choice()-----` + '\n' + " ");
    }
    //END DEBUG

    points = 100/Endgame;

    if (dbug){
      console.log(`Questions are worth ${points} each.  There will be ${Endgame} question(s).`);
    }

    setUP.innerHTML = `
    <p>Questions are worth ${Math.round(points)} each.  There will be ${Endgame} question(s).</p>
    <h1>Choose your Style</h1>
    <select id="game-play" multiple>
    <option value = true selected>Multiple Choice</option>
    <option value = false>Type it in</option>
    </select>
    <br>
    <button id="roundbtn" class="btn" onclick="Diff()">Next</button>
    `
    //END DEBUG

  }

  function Diff() {
    //!!!!DEBUG!!!!
    if (dbug){
      console.log(`-----At Diff()-----` + '\n' + " ");
    }
    //END DEBUG

    choice = document.getElementById("game-play").value

    setUP.innerHTML = `
    <h1>Choose your Difficulty</h1>
    <select id="game-play" multiple>
    <option value=1 selected>Easy</option>
    <option value=2>Medium</option>
    <option value=3>Hard</option>
    </select>
    <br>
    <button id="roundbtn" class="btn" onclick="SetUp()">Next</button>
    `

  }

  function SetUp (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At SetUp()-----` + '\n' + " ");
    }
    //END debug

    lvl = document.getElementById("game-play").value

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

    switch(choiceGame) {
      case choiceGame:
        btnField.innerHTML=`
        <button id="hint-button" onclick = "showHint()">Quote Hint</button>
        <button id="next-button" onclick = "nextMovie()"style="visibility:hidden;">Next Movie</button> 
        `;
      break;

      case !choiceGame:
        gameField.innerHTML=`
        <input type="text" id="guess-input" placeholder="Enter Your Guess">
        button id="submit-button onclick="submitAnswer()">Submit</button>
        `;
        btnSub = document.getElementById(`submit-button`);
        btnField.innerHTML= `
        <button id="hint-button" onclick="showHint()">Quote Hint</button>
        <button id="next-button" onclick="nextMovie()" style="visibility:hidden;">Next Movie"</button>
        `
        btnNext=document.getElementById(`next-button`);
      break;
    
      default:
        popupmesg=`
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
        popupmesg=`
        <h1>Something has gone wrong!</h1>
        <br>
        <button onclick="location.reload()">Refresh</button>
        `
        OpenPopup(false);
      break;

    }
  }

  //here we are going to get the data for our movie
  function loadMovie (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At loadMovie()-----` + '\n' + " ");
    }
    //END debug

    holder=[];
    btnHint=document.getElementById("hint-button");

    movieData.forEach(crntMov => {
      holder.push(crntMov.name)
    });

    rdmNum = Math.floor(Math.random() * movieData.length);

    if(movieNum.length<1){
      subEnter=true;
      movieNum.push(movieData[rdmNum].id)
      displayMovie()
    }  

    else if(movieNum.length >= Endgame){
      popupmesg = `
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

  //This function will show all movie data
  function displayMovie (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At displayMovie()-----` + '\n' + " ");
    }
    //END debug

    if (!hint){
      btnHint.style.visibility="hidden";
    }
    else{
      btnHint.style.visibility="visable";
    }

    //Displaying movie image
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

    document.addEventListener(`keypress`, (event) =>{
      let keyCode=event.key;
      if(keyCode=="enter" || keyCode=="Enter" && subEnter){
        btnSub.click();
      }
    });
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

  popupContent.innerHTML = popupmesg;

}

function ClosePopup (){
  overlay.style.display = 'none';

}

console.log(`!!!dbug is ${dbug} by default!!!`);