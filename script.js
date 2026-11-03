const additionQuestions = [
  { q: '1 + 2', answers: [3, 2, 4, 1], correct: 3 },
  { q: '2 + 5', answers: [6, 8, 7, 9], correct: 7 },
  { q: '4 + 6', answers: [11, 9, 10, 8], correct: 10 },
  { q: '5 + 7', answers: [12, 13, 10, 11], correct: 12 },
  { q: '8 + 9', answers: [16, 17, 18, 15], correct: 17 },
  { q: '10 + 13', answers: [22, 23, 24, 21], correct: 23 },
  { q: '12 + 15', answers: [26, 28, 25, 27], correct: 27 },
  { q: '15 + 18', answers: [33, 31, 32, 30], correct: 33 },
  { q: '20 + 17', answers: [36, 37, 38, 35], correct: 37 },
  { q: '25 + 24', answers: [49, 48, 50, 47], correct: 49 }
];

const subtractionQuestions = [
  { q: '3 - 2', answers: [1, 2, 0, 3], correct: 1 },
  { q: '7 - 5', answers: [1, 2, 3, 4], correct: 2 },
  { q: '9 - 4', answers: [6, 4, 5, 7], correct: 5 },
  { q: '15 - 8', answers: [6, 7, 8, 5], correct: 7 },
  { q: '20 - 9', answers: [11, 12, 10, 9], correct: 11 },
  { q: '25 - 13', answers: [14, 12, 13, 11], correct: 12 },
  { q: '30 - 15', answers: [14, 15, 16, 13], correct: 15 },
  { q: '40 - 19', answers: [22, 21, 20, 23], correct: 21 },
  { q: '50 - 22', answers: [27, 28, 29, 26], correct: 28 },
  { q: '60 - 31', answers: [29, 30, 28, 27], correct: 29 }
];

let currentMode = null;
let currentIndex = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const progressEl = document.getElementById('progress');
const messageEl = document.getElementById('message');
const grimaceEl = document.getElementById('grimace');

function startGame(mode) {
  currentMode = mode;
  const saved = localStorage.getItem(mode + 'Index');
  currentIndex = saved ? parseInt(saved) : 0;
  show('game-screen');
  hide('start-menu');
  hide('exit-screen');
  showQuestion();
  updateProgress();
}

function showQuestion() {
  const list = currentMode === 'plus' ? additionQuestions : subtractionQuestions;
  if (currentIndex >= list.length) {
    questionEl.textContent = 'Du har klarat alla frågor!';
    answersEl.innerHTML = '';
    return;
  }
  const q = list[currentIndex];
  questionEl.textContent = q.q;
  answersEl.innerHTML = '';
  messageEl.textContent = '';
  grimaceEl.classList.remove('happy');

  q.answers.forEach((ans) => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.addEventListener('click', () => checkAnswer(ans));
    answersEl.appendChild(btn);
  });
}

function checkAnswer(answer) {
  const list = currentMode === 'plus' ? additionQuestions : subtractionQuestions;
  const q = list[currentIndex];
  if (answer === q.correct) {
    messageEl.textContent = 'Rätt!';
    grimaceEl.classList.add('happy');
    currentIndex++;
    localStorage.setItem(currentMode + 'Index', currentIndex);
    updateProgress();
    setTimeout(showQuestion, 1000);
  } else {
    messageEl.textContent = 'Försök igen!';
  }
}

function updateProgress() {
  progressEl.textContent = `Du har klarat ${currentIndex} frågor!`;
}

function show(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hide(id) {
  document.getElementById(id).classList.add('hidden');
}

function showStartMenu() {
  hide('game-screen');
  hide('exit-screen');
  show('start-menu');
}

// Event listeners

document.getElementById('plus-btn').addEventListener('click', () => startGame('plus'));
document.getElementById('minus-btn').addEventListener('click', () => startGame('minus'));
document.getElementById('back-btn').addEventListener('click', showStartMenu);
document.getElementById('exit-back-btn').addEventListener('click', showStartMenu);
document.getElementById('exit-btn').addEventListener('click', () => {
  hide('start-menu');
  show('exit-screen');
});
