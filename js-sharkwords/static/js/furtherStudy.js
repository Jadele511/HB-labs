const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const WORDS = [
  "strawberry",
  "orange",
  "apple",
  "banana",
  "pineapple",
  "kiwi",
  "peach",
  "pecan",
  "eggplant",
  "durian",
  "peanut",
  "chocolate",
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  // Replace this with your code
  for (const letter of word) {
    const wordContainer = document.querySelector("#word-container");
    const div = document.createElement("div");
    div.classList.add("letter-box");
    div.classList.add(letter);
    wordContainer.append(div);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  // Replace this with your code
  for (const letter of ALPHABET) {
    const letterButton = document.querySelector("#letter-buttons");
    const button = document.createElement("button");
    button.classList.add(letter);
    button.innerHTML = letter;
    letterButton.append(button);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  // Replace this with your code
  buttonEl.setAttribute('disabled', true);
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  // Replace this with your code
  return document.querySelector(`div.${letter}`) !== null;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  // Replace this with your code
  document.querySelector(`div.${letter}`).innerHTML = letter
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  // Replace this with your code

  numWrong += 1
  document.querySelector('#shark-img img').setAttribute('src', `/static/images/guess${numWrong}.png`)

  if (numWrong === 5) {
    const buttons = document.querySelectorAll('buttons');
    for (const btn of buttons) {
      btn.setAttribute('disabled', true);
    }
    document.querySelector('#play-again').style.display = '';
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = "/sharkwords";
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  const word = "hello";

  createDivsForChars(word);
  generateLetterButtons();

  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const clickedBtn = evt.target;
      disableLetterButton(clickedBtn);

      const letter = clickedBtn.innerHTML;

      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
      } else {
        handleWrongGuess(letter);
      }
    });
  });

  document.querySelector("#play-again").addEventListener("click", () => {
    resetGame();
  });
})();
