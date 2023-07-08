//Variables list
let movieData = []

//List of Elements
const imageContainer = document.getElementById("image-container");
const movieImage = document.getElementById("movie-image");
const directorElement = document.getElementById("direct-hint");
const hintText = document.getElementById("hint-text");
const answerKey = document.getElementById("answer-key");
const resultElement = document.getElementById("result");
const gamecontainer = document.getElementById("game-container");
const gamefield = document.getElementById("game-field")
const btnfield = document.getElementById("btn-field");

//Functions

//Fetch movie data from json
console.log("Start of fetch");
fetch('http://localhost:3000/movieData')
  .then(response => response.json())
  .then(data => {
    movieData = data;
    data = data.movieData
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });