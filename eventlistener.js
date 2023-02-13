let gameMode

//funktion för att ladda om sidan
function reloadGame() {
    location.reload()
  };

//Resetknappar i win, lose samt för header
resetButtonForWinOrLoseModalScreen.forEach(button => {
    button.addEventListener('click', (event) => {
      reloadGame()
      overlayScreenToggle()
    })
  })

  headerButtonList.resetGame.addEventListener("click", reloadGame);

  // Gå till scoreboard efter lose eller win
goToScoreboardButton.forEach(button => {
    button.addEventListener('click', () => {
      if (!document.querySelector('#win-modal').classList.contains('hidden')) {
        modalPanels.endWin.classList.add('hidden')
        goToScoreboard()
      }
      if (!document.querySelector('#lose-modal').classList.contains('hidden')) {
        modalPanels.endLose.classList.add('hidden')
        goToScoreboard()
      }
    });
  })

  // FUNKTION - Namn-input kopplat till "Redo att spela!"-knapp
nameInputButton.addEventListener("click", () => {

    // Kollar om inputfältet är tomt eller ej
    let isNameProvided = (nameInput.value !== '' && difficultySelected === true)

    if (isNameProvided === true && difficultySelected === true) { 
        namePlaceholder.innerText = " " + nameInput.value;
        p1name = nameInput.value;
        nameInput.remove();
        modalPanels.enterName.className = "hidden";
        let overlay = document.querySelector(".overlay");
        overlay.classList.add("hidden");
        gameMode = 'singleplayer'
    } else if (isNameProvided === false) {
        errorMessage('textinput')
    }else if (difficultySelected === false) {
      errorMessage('difficultyButton')
    }
  }
);

// SCOREBOARD ->
closeScoreboardButton.addEventListener('click', () => {
    // Singleplayer
    scoreboard.classList.add('hidden')
    gameboard.classList.remove('hidden')
    bodyElem.style.background = '#bae1ff'
    // clearTableHeader(gameMode)
    clearScoreboard(gameMode)
})

closeScoreboardButtonPVP.addEventListener('click', () => {
    scoreboardPVP.classList.add('hidden')
    gameboard.classList.remove('hidden')
    bodyElem.style.background = '#bae1ff'
    // clearTableHeader(gameMode)
    clearScoreboard(gameMode)
})

showScoreboardButton.addEventListener('click', () => {
    if (gameMode === 'singleplayer') {
        scoreboard.classList.remove('hidden')
        gameboard.classList.add('hidden')
    } else if (gameMode === 'pvp') {
        scoreboardPVP.classList.remove('hidden')
        gameboard.classList.add('hidden')
    }
})

// Denna koillar till om man trycker på en stäng av knapp
closeButtonsForModals.forEach(element => {
    element.addEventListener('click', () => {
                // När man trycker på stäng av knappen för om spelet modalen
                if(element == modalCloseButtons.aboutModal) {
                    overlayAddHidden()
                    modalPanels.about.classList.add('hidden')
                }
        
                else if (element == modalCloseButtons.changePlayerModal) {
                    overlayAddHidden()
                    modalPanels.changePlayer.classList.add('hidden')
                }
            })
        })


// Denna kollar till om man trycker på en specifik knapp
headerButtons.forEach(element => {
    element.addEventListener('click', () => {
        // Om spelet
        if(element == headerButtonList.aboutGame) {
            overlayScreenToggle()
            modalPanels.about.classList.toggle('hidden')

            // Byta spelläge
        } else if (element == headerButtonList.changeGameMode) {
            overlayScreenToggle()
            modalPanels.gameMode.classList.toggle('hidden')

            // Byta spelare
        } else if (element == headerButtonList.changePlayer) {
            overlayScreenToggle()
            modalPanels.changePlayer.classList.toggle('hidden')
        }
    })
    
})

// Förhindrande av att namninskrivning i början räknas som gissningar i spelet.
overlayNameInput.addEventListener('keydown', (event) => {
    event.stopPropagation()
})

// FUNKTION - Namn-input
nameInput.addEventListener("keyup", (event) => {
    appendPlayerName(event)
  });
  
  function appendPlayerName(event) {
        // Kollar om inputfältet är tomt eller ej
        let isNameProvided = (nameInput.value !== '')
      
        if ((event.code === "Enter") && (nameInput.value !== '')) {
        namePlaceholder.innerText = " " + nameInput.value;
        p1name = nameInput.value;
        nameInput.remove();
        modalPanels.enterName.className = "hidden";
        let overlay = document.querySelector(".overlay");
        overlay.classList.add("hidden");
        gameMode = 'singleplayer'
      } else if (isNameProvided === false) {
        errorMessage('textinput')
    } else if (difficultySelected === false) {
      errorMessage('difficultyButton')
    }
  }

  // SCOREBOARD > SINGLEPLAYER > KNAPP > VINST
listAllWinsButton.addEventListener('click' , (event) => {
    sortWinsListByAmountTries()
})

// SCOREBOARD > PVP > KNAPP > VINST
listAllWinsButtonPVP.addEventListener('click' , (event) => {
    sortWinsListByAmountTries()
})

// SCOREBOARD -> TA BORT DATA -> INPUTFÄLT
playerNameInput.addEventListener('keydown', event => {
    event.stopPropagation()
    if (event.key == 'Enter') {
        let user = playerNameInput.value
        modalPanels.removeSpecificPlayerData.classList.toggle('hidden')
        removeUserStatsFromLocalStorage(user)
        updateStats()
        // clearScoreboard()
        // clearScoreboardOfRemovedPlayer()
        overlayScreenToggle()
}})

// SCOREBOARD -> TA BORT DATA -> "Radera data!"-knapp (för att ta bort speldata)
playerNameInputButton.addEventListener('click', () => {
    let user = playerNameInput.value
    removeUserStatsFromLocalStorage(user)
    // clearScoreboardOfRemovedPlayer()
    updateStats()
    // testFunction()
    modalPanels.removeSpecificPlayerData.classList.toggle('hidden')
    overlayScreenToggle()
})


// INSIDE GAME: Ta bort data-knapp för singleplayer (knappen i headern, inte den som tar bort)
removePlayerDataButton.addEventListener('click', () => {
    overlayScreenToggle()
    modalPanels.removeSpecificPlayerData.classList.toggle('hidden')
    overlay.classList.remove('hidden')
})

removePlayerDataButtonPVP.addEventListener('click', () => {
    overlayScreenToggle()
    modalPanels.removeSpecificPlayerData.classList.toggle('hidden')
    overlay.classList.remove('hidden')
})

// SCOREBOARD -> KRYSSKNAPP
modalCloseButtons.removeSpecificPlayerDataModal.addEventListener('click', () => {
    modalPanels.removeSpecificPlayerData.classList.toggle('hidden')
    overlayScreenToggle()
})

// SCOREBOARD -> KNAPP FÖR SENASTE (sortera enligt senaste)
let scoreboardButtonLatest = document.querySelector('#latest-score-button')
scoreboardButtonLatest.addEventListener('click', (event) => {
    scoreboardSortChronologically()
})

headerButtonList.showScoreboard.addEventListener('click', (event) => {
    // generateTableHeader(gameMode)
    updateStats()
})


///////////////// PVP ___________________________________________________

// PVP -> GAMEMODE OVERLAY -> PVP-KNAPPEN (för att välja spelläge PVP)
pvpButton.addEventListener('click', (event) => {
    pvpDiv.style.visibility = 'visible' 
})

// PVP -> GAMEMODE OVERLAY -> VANLIGT-knappen (för att välja spelläge singleplayer)
vanligtButton.addEventListener('click', (event) => {
    reloadGame()
})

// PVP -> GAMEMODE OVERLAY -> 
pvpStartButton.addEventListener('click', (event) => {
})

// PVP -> GAMEMODE OVERLAY -> INPUTFÄLT FÖR SPELARE 1 (gissare)
pvpInputfieldPlayer1.addEventListener("keydown", (event) => {
    // Förhindrar input utanför namninputs-modalen
    event.stopPropagation()
})

// PVP -> SCOREBOARD -> "SENASTE"-KNAPP
let scoreboardPVPButtonLatest = document.querySelector('#latest-score-button-pvp')
scoreboardPVPButtonLatest.addEventListener('click', (event) => {
    scoreboardSortChronologically()
})

// FUNKTION - PVP - Spelare 2
pvpInputfieldPlayer2.addEventListener("keydown", (event) => {
    
    event.stopPropagation()

    if (event.key === 'Enter') {
        p1name = pvpInputfieldPlayer1.value
        p2name = pvpInputfieldPlayer2.value
        pvpDiv.style.visibility = 'hidden'
        secretWordDiv.style.visibility = 'visible'
        gameMode = 'pvp'
        // generateTableHeader('pvp')
    }
})

pvpStartButton.addEventListener('click', (event) => {
    p1name = pvpInputfieldPlayer1.value
    p2name = pvpInputfieldPlayer2.value
    pvpDiv.style.visibility = 'hidden'
	secretWordDiv.style.visibility = 'visible'
    gameMode = 'pvp'
    // generateTableHeader('pvp')
})


let pvpSecretWord

// FUNKTION - PVP - Hemligt ord
pvpSecretWordInput.addEventListener("keydown", (event) => {
    // Förhindrar input utanför namninputs-modalen
    event.stopPropagation()
    if ((event.code === "Enter") && (pvpSecretWordInput.value !== '')) {
        pvpSecretWord = pvpSecretWordInput.value.toString()
        pvpSecretWordInput.innerText = pvpSecretWord
        p2name = pvpInputfieldPlayer2.value
		secretWord = pvpSecretWord.toLowerCase();
        appendSecretWordToDashes()
        overlayScreenToggle()
		gameModeModal.classList.add('hidden')
        clearScoreboard()
    }
})