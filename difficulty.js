

//Regler för knapparna
const easyWords = wordArray.filter(secretWord => secretWord.length > 11);
const mediumWords = wordArray.filter(secretWord => 7 <= secretWord.length && secretWord.length <= 11);
const hardWords = wordArray.filter(secretWord => secretWord.length < 7);




// sparar svårighetsgraden för att använda vid reload-funktion
let currentDifficulty

//funktion för svårighetsgrad
let difficultySelected = false;

function setDifficulty(difficulty) {
    if (difficulty === 'easy') {
        secretWord = easyWords[Math.floor(Math.random() * easyWords.length)].toLowerCase();
        currentDifficulty = 'easy'
    } else if (difficulty === 'medium') {
        secretWord = mediumWords[Math.floor(Math.random() * mediumWords.length)].toLowerCase();
        currentDifficulty = 'medium'
    } else if (difficulty === 'hard') {
        secretWord = hardWords[Math.floor(Math.random() * hardWords.length)].toLowerCase();
        currentDifficulty = 'hard'
    }
    appendSecretWordToDashes()
    console.log(secretWord);
}

//Lyssnar efter klick på knapparna
difficultyEasy.addEventListener('click', function() {
  setDifficulty('easy');
  difficultySelected = true;
    difficultySelected = true;
    let errorMessage = document.querySelector('.error-message')
    errorMessage.innerText = errorMessageText.empty
});

difficultyMedium.addEventListener('click', function() {
  setDifficulty('medium');
  difficultySelected = true;
    difficultySelected = true;
    let errorMessage = document.querySelector('.error-message')
    errorMessage.innerText = errorMessageText.empty
});

difficultyHard.addEventListener('click', function() {
  setDifficulty('hard');
  difficultySelected = true;
    difficultySelected = true;
    let errorMessage = document.querySelector('.error-message')
    errorMessage.innerText = errorMessageText.empty
});
