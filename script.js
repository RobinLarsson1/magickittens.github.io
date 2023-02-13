


//funktion för att printa bokstäver
document.onkeydown = function(event) {
    // console.log(gameMode)

    if (scoreboard.classList.contains('hidden') && scoreboardPVP.classList.contains('hidden')) {
    //Tangentbordet
    let key = event.key.toLowerCase();
  
    let singleLetter = secretWord.split("");
  
    //Kolla om gissningen är rätt
    let isCorrectGuess = singleLetter.includes(key);
  
    //Kollar om man redan gissat 
    let isGuessed = guessedLetters.includes(key);
  
    //Kollar om det man gissat är disabled key
    let isDisabled = disabledKeys.includes(key);
  
    //Kollar om en ny och korrekt key är pressed, samt om man har slut på gissningar
    let isValidGuess = isCorrectGuess ||(!isCorrectGuess && !isGuessed && mistakes < maxWrong && !isDisabled)
  
    //Skickar in fel bokstav, samt uppdaterar antal felgissningar

    if (overlay.classList.contains('hidden') === true) {
        gameStart()
     } else {
        console.log('Du måste stänga av overlayen för modalerna för att kunna spela eller fortsätta kunna spela.');
     }
  
    
    // Förhindrar input utanför namninputs-modalen
    let nameOverlayIsHidden = modalPanels.enterName.className.includes("hidden");
    // console.log(event.key);
  
    function gameStart () {
      function updateIncorrectGuess() {
        wrongLetters.innerText += key + ', '
        guessedLetters.push(key);
        mistakes++
        document.getElementById('mistakes').innerText = mistakes;
        hangManPicture.innerHTML = hangManPicture.innerHTML + hangMan[wrongGuesses];
        wrongGuesses++
        return wrongGuesses;
      }
  
      //Skickar in korrekt gissning iställer för understräcken
      function updateCorrectGuess() {
        singleLetter.forEach((char, index) => {
            if (char === key) {
                dashes[index].innerText = char;
            }
        });
      } 
  
      //Kollar om ordet är gissat eller inte, loopas varje gång
      function isWordComplete(singleLetter, dashes) {
        for (let i = 0; i < singleLetter.length; i++) {
          if (dashes[i].innerText !== singleLetter[i]) {
            return false;
          }
        }
          
      return true;
      }
  
        //kallar på rätt funktion beroende på vilken gissning som anges
        if (isCorrectGuess) {
            updateCorrectGuess()
        } else if (isValidGuess) {
            updateIncorrectGuess()
        }
  
      //Kolla om spelet är förlorat
      let gameIsOver = mistakes >= maxWrong;
      if (gameIsOver && (gameMode == 'singleplayer')) {
        gameResultModalOverlay(false, answer);
        addStatToCurrentStats(false);
        renderStats()
      } else if (gameIsOver && (gameMode == 'pvp')) {
        addStatToCurrentStats(false)
        renderStats()
      }
    
      //Kolla om spelet är vunnet 
      let isGameWon = isWordComplete(singleLetter, dashes)
      if (isGameWon && (gameMode == 'singleplayer')) {
        // generateTableHeader('singleplayer')
        gameResultModalOverlay(true, null, mistakes);
        addStatToCurrentStats( true )
        renderStats()
      } else if (isGameWon && (gameMode == 'pvp')) {
        gameResultModalOverlay(true, null, mistakes)
        addStatToCurrentStats( true )
        renderStats()
      }

}}}

function gameEnd() {
  
}