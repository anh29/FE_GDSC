const questions = [
  { question: 'Bạn yêu GDSC không', answer: 'yes' },
  { question: 'Bạn là tv GDSC?', answer: 'no' },
  { question: 'Bạn thích đến đây', answer: 'yes' },
  { question: 'Bạn biết tôi chứ', answer: 'no' },
  { question: 'Bạn là SV bách khoa', answer: 'yes' },
  { question: 'Bạn học giỏi', answer: 'no' },
  { question: 'Bạn nhác làm', answer: 'no' },
  { question: 'Bạn là số 1', answer: 'no' },
  { question: 'Bạn có ny chưa', answer: 'no' },
];

let currentQuestionIndex = 0;
let gameCompleted = false;
let questionDisplayed = false;
let clickCount = 0;

function handleCardClick(card) {
  const questionModal = document.getElementById('questionModal');
  const questionText = document.getElementById('questionText');
  const completionMessage = document.getElementById('completionMessage');

  if (gameCompleted) {
    return alert('Đáp án đày rồi! Không đoán đúng nữa, thể đoán lai đi!');
  }

  clickCount++;
  if (!questionDisplayed && Math.random() < 0.5) {
    const question = questions[currentQuestionIndex / 2].question;
    questionText.textContent = question;
    questionModal.style.display = 'block';
    questionDisplayed = true;
  }

  currentQuestionIndex++;
}

function chooseAnswer(answer) {
  const questionModal = document.getElementById('questionModal');
  const completionMessage = document.getElementById('completionMessage');

  const correctAnswer =
    questions[Math.floor((currentQuestionIndex - 1) / 2)].answer;

  if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
    questionModal.style.visibility = 'hidden';
    alert('Đáp án đúng! Bạn đã đoán đúng ' + correctAnswer);
    if (currentQuestionIndex >= questions.length * 2) {
      gameCompleted = true;
    }
  } else {
    alert('Thất bại! Thử lại.');
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomQuestionIndex].question;
    const questionText = document.getElementById('questionText');
    questionText.textContent = randomQuestion;

    questionModal.style.display = 'block';
  }
}
