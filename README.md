# flatiron-frontend-phase-1-project
My FlatIron Phase 1 Project
--Project title-- Guess the Movie

--Description-- 
A short game in which the user guesses movies from a given list. This is my first project I have ever worked on, and I mainly did it as an assignment for the Flatiron boot camp I am in. In the future I would like to add a leader board type scoreboard that records a persons username, score, time, and the date it was achieved. I am thinking something like the top 5 people according to speed/time. Some issues I faced were getting the overlay screen to work properly. Then I was having an issues with the transitions of the buttons. I also had a problem to where the movies popping up where not the ones being logged. When finding the fix for that one I felt a little dumb. The answer was a -1 because I set up my id's for my movie list to start at 1 instead of 0.

--Running the project-- 
Running the game is simple enough once you download the files just open the html in your browser, make sure to run the json server using my db.json file provided with:
  json-server --watch db.json
After this the game should work in your browser.

--Using the project-- 
Playing the game is relatively straight forward. The first screen will ask you how many movies you would like to guess, and then it will tell you how many points each movie is with out of a total 100%. Click the next button once you have selected that. You will only be able to enter a number 1 through the maximum amount of movies in the games database (initially set at 12, I might add more onto the game later). Note: if you enter an invalid number, or try to put a word in the field rather than a number an overlay should pop up to tell you that the entry is invalid and to try again. Next you will choose if you want to play the game by multiple choice or by typing the answer in. Note:by default the game will choose multiple choice and easy should you click enter without actually choosing an option.

    -multiple choice mode: You will be given three options to choose from for each movie, one will be correct and two will be incorrect. Once an answer is chosen the next movie will appear for you to guess from until you get to the end at which point a total score will be given to you via an overlay.(you can use the enter key to submit answers at this point instead of clicking on the button)

    -type it in mode: You will be given a submit box with each movie image in order to type in the answer you think. The rest of the game will play out the same as multiple choice mode does from there. (you can use the enter key to submit answers at this point instead of clicking on the button)

After choosing which mode to play you will be asked if you wish to play that mode in either easy, medium, or hard setting.
    -easy- will show the directors name and a quote from the movie.
    -medium- will have a button to make the given quote and director name for each movie image optional with a mouseover event to make sure you want to use it.
    -hard- there will be no option to see the director or quote from the movie
After picking the game mode and difficulty setting the game will commence. Once the game is completed a button will pop up to tell you your overall score.
Feel free to use your own data base by making your own db.json file or modifying the link in the fetch of the .js file in order to use your own database of movies.