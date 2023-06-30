// Fetch movie info from json
fetch('http://localhost:3000/movieData')
  .then(response => response.json())
  .then(data => {
    movieData = data;
    loadMovie();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });