let cards = [1, 2, 3, 4, 5, 6];
let num_cards = 6;

// while (cards.length < num_cards) {
//   let randomNumber = Math.floor(Math.random() * 5) + 1;
//   if (!cards.includes(randomNumber)) {
//     cards.push(randomNumber);
//   }
// }

cards = [...cards, ...cards];

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modalText");
const playAgain = document.querySelector(".playAgain");

const stars = document.querySelector(".stars");
const moves = document.querySelector(".moves");
let timer = document.querySelector(".timer");
const restart = document.querySelector(".restart");
const deck = document.querySelector(".deck");

let interval;
let second = 1;
let minute = 0;
let timeStart = false;

let cards_select = [];
let matches = 0;
let movesCount = moves.textContent;
let starsCount = 3;
let movesWait = false;

let processingClick = false;

function newGame() {
  resetTimer();
  deck.innerHTML = "";
  timer.style.display = "none";
  timeStart = false;
  timer.textContent = minute + " minutes " + second + " seconds";
  shuffle(cards);
  cards_select = [];
  matches = 0;
  moves.textContent = 0;
  movesCount = moves.textContent;

  for (let i = 0; i < cards.length; i++) {
    deck.insertAdjacentHTML(
      "afterbegin",
      '<div class = " card "><img class="hidden" src = "./assets/img/' +
        cards[i] +
        '.png " name="' +
        cards[i] +
        '"></img></div>'
    );
  }

  handleCanvasProcessing();
}

playAgain.addEventListener("click", function () {
  location.reload();
});

restart.addEventListener("click", function () {
  newGame();
});

function flipCard(card) {
  card.classList.add("open", "show");

  var img = card.querySelector("img");
  img.classList.remove("hidden");
}

function hiddenCard(card) {
  card.classList.remove("open", "show");

  var img = card.querySelector("img");
  img.classList.add("hidden");
}

function cardMatch() {
  cards_select[0].classList.remove("open", "show");
  cards_select[0].classList.add("match");
  cards_select[1].classList.remove("open", "show");
  cards_select[1].classList.add("match");
  cards_select = [];
  matches++;
}

function cardMisMatch() {
  setTimeout(function () {
    hiddenCard(cards_select[0]);
    hiddenCard(cards_select[1]);

    cards_select = [];
    movesWait = true;
  }, 500);
}

function addMove(card) {
  if (!card.classList.contains("match")) {
    movesCount++;
    moves.innerText = movesCount;
  }
}

if (!movesWait) {
  deck.addEventListener("click", function (e) {
    if (!processingClick) {
      processingClick = true;

      let card = e.target;

      if (e.target !== e.currentTarget && card.classList.contains("card")) {
        if (!timeStart) {
          startTimer();
          timeStart = true;
          timer.style.display = "inline-block";
        }
        if (!card.classList.contains("open")) {
          if (cards_select.length < 2) {
            flipCard(card);

            if (!cards_select.includes(card)) {
              cards_select.push(card);
            }
          }
          if (cards_select.length === 2) {
            if (cards_select[0] === cards_select[1]) {
              return;
            }
            addMove(card);
            if (
              cards_select[0].querySelector("img").name ===
              cards_select[1].querySelector("img").name
            ) {
              cardMatch();
            } else {
              cardMisMatch();
            }
          }
          endGame();
        }
      }

      setTimeout(function () {
        processingClick = false;
      }, 100);
    }
  });
}

function calculateScore() {
  let score = parseInt(10000 / parseInt(movesCount) + (minute * 60 + second));
  return score;
}

function endGame() {
  if (matches === num_cards) {
    modal.style.display = "flex";

    modalText.innerHTML =
      "<h2>Congratulations!<br /> You made it</h2> <br> Time taken: <br>" +
      minute +
      "minutes " +
      second +
      "seconds <br> Moves Taken: " +
      movesCount +
      " <br> Score: " +
      calculateScore() +
      " <br> You can do better!";
  }
}

function resetTimer() {
  clearInterval(interval);
  second = 0;
  minute = 0;
}

function startTimer() {
  interval = setInterval(function () {
    second++;
    timer.textContent = minute + " minutes " + second + " seconds ";
    if (second === 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

newGame();
