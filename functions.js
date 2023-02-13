let errorMessageText = {
  empty: '',
  inputError: 'Var god ange ditt namn!',
  difficultyError: 'Var god ange en svårighetsgrad!'
}

function errorMessage(action) {
  if (action === 'textinput') {errorMessageDOM.innerText = errorMessageText.inputError} 
  else if (action === 'difficultyButton') {errorMessageDOM.innerText = errorMessageText.difficultyError}
}


//Skickar in hemliga ordet
function appendSecretWordToDashes() {
  const svar = document.getElementById('correctLetters');
  svar.innerHTML = secretWord.replace(/./g, '<span class="dashes">_</span>');
  }


// FUNKTION - generera fram spelarnamn samt resultat
let playerResult = {};
function generatePlayerResult() {
  playerResult.player = p1name;
  playerResult.score = `${mistakes} of ${maxWrong}`;
  return playerResult;
}

function toggleText(JSelement, second, first) {
  
  if (JSelement.innerText == second) {
    return JSelement.innerText = first
  }
  else if (JSelement.innerText == first) {
    return JSelement.innerText = second
  }

}

let p2name


function generateTableForPlayerResult (name, word, faultyguesses, winlose) {

  let scoreTableBody = document.getElementById('table-body')

  // Skapar en ny tabellrad, som newTableData-varianterna nedan ska appendas till
  let newScoreTableRow = document.createElement('tr')
  newScoreTableRow.className = 'score-table-row'
  scoreTableBody.append(newScoreTableRow)

  // Lägger till ett namnfält till tabellraden
  let newTableDataName = document.createElement('td')
  newTableDataName.className = 'score-table-data score-table-data-name'
  newTableDataName.innerText = `${name}`
  newScoreTableRow.append(newTableDataName)

  // Lägger till ett ordfält till tabellraden
  let newTableDataWord = document.createElement('td')
  newTableDataWord.className = 'score-table-data score-table-data-word'
  newTableDataWord.innerText = `${word}`
  newScoreTableRow.append(newTableDataWord)

  // Lägger till antal felgissnigar i ett fält till tabellraden 
  let newTableDataFaultyGuesses = document.createElement('td')
  newTableDataFaultyGuesses.className = 'score-table-data score-table-data-faultyguesses'
  newTableDataFaultyGuesses.innerText = `${faultyguesses}`
  newScoreTableRow.append(newTableDataFaultyGuesses)

  // Lägger till fält för vinst eller förlust till tabellraden
  let newTableDataWinLose = document.createElement('td')
  newTableDataWinLose.className = 'score-table-data score-table-data-winlose'
  newTableDataWinLose.innerText = `${winlose}`
  newScoreTableRow.append(newTableDataWinLose)
}


function generateTableForPlayerResultPVP (name1, name2, word, faultyguesses, winlose) {
  let scoreTableBodyPVP = document.getElementById('table-body-pvp')

  // Skapar en ny tabellrad, som newTableData-varianterna nedan ska appendas till
  let newScoreTableRowPVP = document.createElement('tr')
  newScoreTableRowPVP.className = 'score-table-row'
  scoreTableBodyPVP.append(newScoreTableRowPVP)

  // Lägger till player1-namn till tabellraden
  let newTableDataNameOnePVP = document.createElement('td')
  newTableDataNameOnePVP.className = 'score-table-data score-table-data-name'
  newTableDataNameOnePVP.innerText = `${name1}`
  newScoreTableRowPVP.append(newTableDataNameOnePVP)

  // Lägger till player2-namn till tabellraden
  let newTableDataNameTwoPVP = document.createElement('td')
  newTableDataNameTwoPVP.className = 'score-table-data score-table-data-name'
  newTableDataNameTwoPVP.innerText = `${name2}`
  newScoreTableRowPVP.append(newTableDataNameTwoPVP)

  // Lägger till ett ordfält till tabellraden
  let newTableDataWordPVP = document.createElement('td')
  newTableDataWordPVP.className = 'score-table-data score-table-data-word'
  newTableDataWordPVP.innerText = `${word}`
  newScoreTableRowPVP.append(newTableDataWordPVP)

  // Lägger till antal felgissnigar i ett fält till tabellraden 
  let newTableDataFaultyGuessesPVP = document.createElement('td')
  newTableDataFaultyGuessesPVP.className = 'score-table-data score-table-data-faultyguesses'
  newTableDataFaultyGuessesPVP.innerText = `${faultyguesses}`
  newScoreTableRowPVP.append(newTableDataFaultyGuessesPVP)

  // Lägger till fält för vinst eller förlust till tabellraden
  let newTableDataWinLosePVP = document.createElement('td')
  newTableDataWinLosePVP.className = 'score-table-data score-table-data-winlose'
  newTableDataWinLosePVP.innerText = `${winlose}`
  newScoreTableRowPVP.append(newTableDataWinLosePVP)
}


// --------- DATA FÖR NEDANSTÅENDE FUNKTIONER ------------
const LS_KEY = 'hangman-score-old'

let LS_KEY_SINGLEPLAYER = 'hangman-score'
let LS_KEY_PVP = 'hangman-score-pvp'

let LS_LIST_CHOICE = []
let stringFromLocalStorage = []
stringFromLocalStorage = localStorage.getItem(LS_LIST_CHOICE)
let results = stringFromLocalStorage
let objectFromLocalStorage = JSON.parse(stringFromLocalStorage)

// Placeholder-objekt ( ska fyllas i mha funktionerna nedan )
let currentResult = {}
let currentResultPVP = {}
let result
// -------------------------------------------------------


// FUNKTION för att koppla ihop spelare med ett inkrementellt ökande nummer________________________________________
// Används för att kunna sortera scoreboard efter senaste spelare
let LS_KEY_COUNTER = 'hangman-player#'
// let LS_KEY_COUNTER_PVP = 'hangman-PVP-player#'
function ascendingPlayerNumber() {
    let counterFromLocalStorage = localStorage.getItem(LS_KEY_COUNTER)
    if (!counterFromLocalStorage) { counterFromLocalStorage = 0 }
    counterFromLocalStorage++
    let stringToTransfer = JSON.parse(counterFromLocalStorage)
    localStorage.setItem(LS_KEY_COUNTER, stringToTransfer)
    return counterFromLocalStorage
}


// FUNKTION för vinstfältet till funktionen generateTableForPlayerResult__________________________________________
function returnWinOrLose() {
  if (mistakes == maxWrong) {
    return 'Förlust'
  } else if (mistakes < maxWrong) {
    return 'Vinst!'
  }
}

// FUNKTION för att avgöra vilka resultat som ska returneras beroende på spelläge_________________________________
function currentResultForWhatGameMode (gameMode) {
  if (gameMode == 'singleplayer') {
      return currentResult = {
          name1: p1name,
          // name2: p2name,
          word: secretWord,
          tries: mistakes,
          winlose: returnWinOrLose(),
          count: ascendingPlayerNumber()
      }
  } else if (gameMode == 'pvp') {
      return currentResult = {
          name1: p1name,
          name2: p2name,
          word: secretWord,
          tries: mistakes,
          winlose: returnWinOrLose(),
          count: ascendingPlayerNumber()
      }
  }
}

// FUNKTION för att välja ut vilken lista i LS som ska användas ________________________________________________
function saveToWhichLS_LIST(gameMode) {
  if (gameMode == 'singleplayer') { return LS_LIST_CHOICE = LS_KEY_SINGLEPLAYER }
  else if (gameMode == 'pvp') { return LS_LIST_CHOICE = LS_KEY_PVP }
}

// FUNKTION för att plocka ut nuvarande stats___________________________________________________________________
function currentStats() {
  // Kontroll för spelläge, singleplayer eller pvp?
  saveToWhichLS_LIST(gameMode)
  
  let currentStringFromLocalStorage = localStorage.getItem(LS_LIST_CHOICE) // Hämtar LS som JSON-sträng
  if (!currentStringFromLocalStorage) { currentStringFromLocalStorage = '[]' } // Om LS är tomt, tilldela en tom array

  currentArrayFromLocalStorage = JSON.parse(currentStringFromLocalStorage) // Gör om JSON-sträng till JS-array

  return currentArrayFromLocalStorage
}


let chronologicalCount = 0
let storedChronological
let currentArrayFromLocalStorage 

// FUNKTION för att lägga till nya stats i LS__________________________________________________________________
function addStatToCurrentStats( result ) {
  // Kontroll för spelläge, singleplayer eller pvp?
  saveToWhichLS_LIST(gameMode)
  ascendingPlayerNumber()

  let stringFromLocalStorage = localStorage.getItem(LS_LIST_CHOICE) // Hämtar LS som JSON-sträng
  if ( !stringFromLocalStorage ) { stringFromLocalStorage = '[]' }
  let arrayFromLocalStorage = JSON.parse( stringFromLocalStorage ) // Gör om JSON-sträng till JS-array
  arrayFromLocalStorage.push( currentResultForWhatGameMode(gameMode) )
  
  let stringToSave = JSON.stringify(arrayFromLocalStorage) // gör om JS-arrayen till JSON-string igen
  localStorage.setItem(LS_LIST_CHOICE, stringToSave) // skickar tillbaka den nya JSON-stringen till LS
}


// FUNKTION för att rensa spelare från scoreboard______________________________________________________________
function removeUserStatsFromLocalStorage(user) {
  // Kontroll för spelläge, singleplayer eller pvp?
  saveToWhichLS_LIST(gameMode)
   
  // gameMode = 'singleplayer'
  let stringFromLocalStorage = localStorage.getItem(LS_LIST_CHOICE) // Hämtar LS som JSON-sträng
  let objectFromLocalStorage = JSON.parse(stringFromLocalStorage)
 
  let newArray = []

  let newScoreTableRow = document.querySelector('.score-table-row')

  try {
    if (objectFromLocalStorage[0].name1 != undefined) {
      objectFromLocalStorage.forEach(object => {
        if (object.name1 != user) {
         newArray.push(object) 
         newScoreTableRow.remove()
        clearScoreboard()
        }
      })}
  } catch {
    console.log('Spelarnamnet finns ej!');
  }


    let stringToSave = JSON.stringify(newArray)
    localStorage.setItem(LS_LIST_CHOICE, stringToSave)

}

function eraseEveryInstanceOutsideLS(user) {
  const stringFromLocalStorage = localStorage.getItem(LS_LIST_CHOICE)
  const objectFromLocalStorage = JSON.parse(stringFromLocalStorage)
  let newScoreTableRow = document.querySelector('.score-table-row')

  objectFromLocalStorage.forEach(element => {
    if ((user == element.name1) == true) {
      return newScoreTableRow.remove()
    }
  });

}


// FUNKTION för att rensa scoreboard för player removal_______________________________________________________
function clearScoreboardOfRemovedPlayer() {
  let stringFromLocalStorage = localStorage.getItem(LS_LIST_CHOICE) // Hämtar LS som JSON-sträng
  let objectFromLocalStorage = JSON.parse(stringFromLocalStorage)
  let newScoreTableRow = document.querySelector('.score-table-row')

  while (objectFromLocalStorage.length >= 0) {
    newScoreTableRow.remove()
    --objectFromLocalStorage
  }
}

// FUNKTION för att rensa scoreboard__________________________________________________________________________
function clearScoreboard() {
  saveToWhichLS_LIST(gameMode)
  
  let stringFromLocalStorage = localStorage.getItem(LS_LIST_CHOICE) // Hämtar LS som JSON-sträng
  if (!stringFromLocalStorage) {stringFromLocalStorage = '[]'}

  let currentArrayFromLocalStorage = JSON.parse(stringFromLocalStorage)
  let newScoreTableRow = document.querySelector('.score-table-row')
  
  if (newScoreTableRow != null) {
  for (let i = 0; i < currentArrayFromLocalStorage.length; i++) {
      newScoreTableRow.remove()
  }}
}

// FUNKTION för att rendera det som finns i LS till sidan till tabeller______________________________________
function renderStats() {
  currentResultForWhatGameMode(gameMode)
  currentStats()

  if (gameMode == 'singleplayer') {
      currentArrayFromLocalStorage.forEach(element => {
          generateTableForPlayerResult((element.name1), (element.word), (element.tries), (element.winlose))
      }) 
  } else if (gameMode == 'pvp') {
      currentArrayFromLocalStorage.forEach(element => {
          generateTableForPlayerResultPVP((element.name1), (element.name2), (element.word), (element.tries), (element.winlose))
      }) 
  }
}

// FUNKTION för att uppdatera stats______________________________________________________________________
function updateStats() {
  clearScoreboard()
  renderStats()
}

// FUNKTION för att sortera scoreboard efter senaste spelare______________________________________________
let toggleCountForChronological = 0
const scoreboardSortChronologically = () => {
  // for (let i = 0; i < 1; i++) {
      // if (toggleCountForChronological == 0) {
          const saveSortResult = JSON.parse(localStorage.getItem(LS_LIST_CHOICE)).sort(function(a, b) {
            // toggleText(scoreboardButtonLatest, 'Senaste nederst', 'Senaste överst')
            clearScoreboard()  
            return parseFloat(a.count) - parseFloat(b.count);
          })
          const saveNewString = JSON.stringify(saveSortResult)
          
          localStorage.setItem(LS_LIST_CHOICE, saveNewString)
          updateStats()
          
      //     ++toggleCountForChronological
      // // } else if (toggleCountForChronological == 1) {
      //   --toggleCountForChronological
      //   const saveSortResult = JSON.parse(localStorage.getItem(LS_LIST_CHOICE)).sort(function(a, b) {
      //     // toggleText(scoreboardButtonLatest, 'Senaste nederst', 'Senaste överst')
      //       clearScoreboard()  
      //         return parseFloat(b.count) - parseFloat(a.count);
      //     })

      //     const saveNewString = JSON.stringify(saveSortResult)
      //     localStorage.setItem(LS_LIST_CHOICE, saveNewString)
      //     // }       
        // }
        // updateStats()
}


// FUNKTION för att sortera scoreboard efter antal felgissningar______________________________________________
let toggleCountForTries = 0
const sortWinsListByAmountTries = () => {
  for (let i = 0; i < 5; i++) {
      if (toggleCountForTries == 0) {
          const saveSortResult = JSON.parse(localStorage.getItem(LS_LIST_CHOICE)).sort(function(a, b) {
            clearScoreboard()
            return parseFloat(a.tries) - parseFloat(b.tries);
          })
          const saveNewString = JSON.stringify(saveSortResult)
          
          localStorage.setItem(LS_LIST_CHOICE, saveNewString)
          updateStats()
          
          ++toggleCountForTries
        } else if (toggleCountForTries == 1) {
          --toggleCountForTries
          const saveSortResult = JSON.parse(localStorage.getItem(LS_LIST_CHOICE)).sort(function(a, b) {
            clearScoreboard()
              return parseFloat(b.tries) - parseFloat(a.tries);
          })

          const saveNewString = JSON.stringify(saveSortResult)
          localStorage.setItem(LS_LIST_CHOICE, saveNewString)
          updateStats()
      }       
  }
}
