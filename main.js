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
let rdmA;
let crntMovie=[];
let rdmB;
let btnNext;
let guessInput;

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
    console.log(`At HowManyTime()`);
    //END check 2

      //Making the setup area visible while hiding the game area
      gameCon.style.display = "none";
      setUP.style.display = "block";

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

    choiceGame = document.getElementById("gamePlay").value

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
    gameCon.style.display = "block";
    movImg.style.visibility = "visible";
    hitTxt.style.visibility = "visible";
    Rslts.style.visibility = "hidden";
    gameField.style.visibility = "visible";
    btnField.style.visibility = "visible";

    switch(choiceGame) {
      case "true":
        btnField.innerHTML=`
        <button id="hintButton" onclick = "showHint()">Quote Hint</button>
        <button id="nextButton" onclick = "nextMovie()"style="visibility:hidden;">Next Movie</button> `;
        btnNext=document.getElementById(`nextButton`);
      break;

      case "false":
        gameField.innerHTML=`
        <input type="text" id="guessInput" placeholder="Enter Your Guess">
        <button id="submit-button" class="btn" onclick="submitAnswer()">Submit</button>`;
        btnSub = document.getElementById(`submit-button`);
        guessInput = document.getElementById(`guessInput`)
        btnField.innerHTML= `
        <button id="hintButton" onclick="showHint()">Quote Hint</button>
        <button id="nextButton" onclick="nextMovie()" style="visibility:hidden;">Next Movie</button>`
        btnNext=document.getElementById(`nextButton`);
      break;
    
      default:
        popUpMesg=`
        <h1>Something has gone wrong! 3</h1>
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

  function repeatCheck(){
    //check repeat
    if (dbug){
      console.log(`At repeatcheck()`);
    }
    //END repeat
    for (i=0; i<movieNum.length; i++){
      if (movieNum[i] == crntMovie.id){
        return true;
      }
  }
  return false;
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

    crntMovie=movieData[rdmNum];

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
      btnHint.style.visibility="visible";
    }

    if(!hintR){
      hitTxt.style.visibility="hidden";
      dirHint.style.visibility="hidden";
    }

    btnHint.addEventListener("mouseover", hintHover);
    btnHint.addEventListener("mouseout", hintOff);

    movImg.src = movieData[rdmNum].imageUrl
    movImg.alt = "Movie Image";
    movImg.style.display = "block";

    dirHint.innerText=`Director: ${movieData[rdmNum].directorHint}`
    hitTxt.innerText=movieData[rdmNum].hintQuote;

    ansrKey.style.display="block";
    
    if(choiceGame == "true"){
      console.log("testblhjf'ggn ")
      subEnter=false;
      fillinTheBlanks();
    }
  }

  function hintHover(){
    btnHint.innerText="Are you sure?";
  }

  function hintOff(){
    btnHint.innerText="Quote Hint";
  }

  function fillinTheBlanks(){
    //fillin check 1
    if(dbug){
      console.log(`fillintheblanks()`)
    }

    gameField.innerHTML= ``;
    rdmA=Math.floor(Math.random() * 3) + 1;
    //fillin check 2
    if(dbug){
      console.log(`fillintheblanks()2`)
    }
    //takes random name out of holder so repeats dont happen
    takeNameOut(crntMovie.name);

    for(i=1; i<4; i++){
      if(i==rdmA){
        gameField.innerHTML +=`
        <button id="${i}" class="btn" onclick="mChoiceCheck(${i})">${crntMovie.name}</button>`
      }
      else{
        gameField.innerHTML += `
        <button id="${i}" class="btn" onclick="mChoiceCheck(${i})">${pickMovie()}</button>`
      }
    }
  }

  function takeNameOut(mName){
    //takeoutname check
    if(dbug){
      console.log(`takeNameOut()`)
    }

    for(k=0; k<holder.length; k++){
      if(mName.toLowerCase()==holder[k].toLowerCase()){
        holder.splice(k, 1);
      }
    }
  }

  function pickMovie(){
    //pickmovie check
    if(dbug){
      console.log(`pickMovie()`)
    }

    let rdmB=Math.floor(Math.random() * holder.length);
    
    let returnName=holder[rdmB]
    holder.splice(rdmB, 1);
    return returnName;
  }

  function mChoiceCheck(i){
    if(i==rdmA){
      displayResult("Correct!", false);
    }
    else {
      displayResult("Incorrect!", true);
    }
  }

  function displayResult(msg, isError){
    //displayResults check
    if(dbug){
      console.log(`displayResult()`)
    }
    Rslts.style.visibility="visible"
    Rslts.textContent=msg;
    if(isError){
      getWrong=getWrong+1
      Rslts.style.color="red";
      gameField.style.display="none";
      btnNext.style.visibility="visible";
    }
    else{
      getRight=getRight+1
      score=score+points;
      Rslts.style.color="green";
      gameField.style.display="none";
      btnNext.style.visibility="visible";
    }
  }

  function showHint(){
    btnHint.style.visibility="hidden";
    hitTxt.style.visibility="visible";
    dirHint.style.visibility="visible";
  }

  function nextMovie(){
    gameField.style.display="block";
    Rslts.style.visibility="hidden";
    btnNext.style.visibility="hidden"
    
    if(choiceGame == "false"){
      document.getElementById("guessInput").value=null
    }

    loadMovie();
  }

function submitAnswer(){
  //check submitanswer
  if(dbug){
    console.log(`submitAnswer()`)
  }
  subEnter = false;
  gameField.style.display="none";

  let AnswerPool = crntMovie.answerPool;
  let getItRight = false;

  AnswerPool.forEach(answerPool =>{
    if(guessInput.value.toLowerCase() == answerPool.toLowerCase()){
      getItRight = true;
    }
  })

  if(getItRight==true){
    displayResult("Congratulations, You guessed it correct!", false);
  }
  else{
    displayResult("Sorry that's incorrect, try again.", true);
  }
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