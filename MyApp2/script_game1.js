document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "patient.html";
});

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lettersContainer = document.getElementById('lettersContainer');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function displayLetters() {
    lettersContainer.innerHTML = '';
    const shuffledLetters = shuffle([...letters]);
    for (let i = 0; i < 10; i++) {
        const letter = document.createElement('span');
        letter.textContent = shuffledLetters[i];
        letter.style.margin = '0 5px';
        letter.style.fontSize = '24px';
        letter.style.cursor = 'pointer';
        letter.addEventListener('click', () => {
            document.getElementById('inputWord').value += shuffledLetters[i];
        });
        lettersContainer.appendChild(letter);
    }
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const inputWord = document.getElementById('inputWord').value;
    if (inputWord) {
        document.getElementById('result').textContent = `You formed the word: ${inputWord}`;
    } else {
        document.getElementById('result').textContent = 'Please form a word.';
    }
});

displayLetters();
