const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/flappy-bird.png";
bg.src = "images/fb-game-background.png";
fg.src = "images/bottom-background.png";
pipeNorth.src = "images/flappybird-pipe.png";
pipeSouth.src = "images/flappybird-pipe.png";

// Variables
let gap = 85;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;
let highScore = 0; // Add highScore variable
let gameInterval;
let paused = false;

// Event listeners for buttons
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("pauseBtn").addEventListener("click", pauseGame);
document.getElementById("restartBtn").addEventListener("click", restartGame);
document.getElementById("leaveBtn").addEventListener("click", leaveGame);

// On key down
document.addEventListener("keydown", moveUp);

function moveUp() {
    if (!paused) {
        bY -= 25;
    }
}

// Pipe coordinates
let pipe = [];

function resetPipes() {
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: getRandomPipeY()
    };
}

function getRandomPipeY() {
    const maxPipeHeight = 0.65 * canvas.height; // Maximum pipe height is 65% of canvas height
    let pipeY;

    // Ensure pipe height is within limits
    do {
        pipeY = Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height;
    } while (Math.abs(pipeY) > maxPipeHeight);

    return pipeY;
}

function draw() {
    context.drawImage(bg, 0, 0);

    for (const element of pipe) {
        constant = pipeNorth.height + gap;
        context.drawImage(pipeNorth, element.x, element.y);
        context.drawImage(pipeSouth, element.x, element.y + constant);

        element.x--;

        if (element.x == 125) {
            pipe.push({
                x: canvas.width,
                y: getRandomPipeY()
            });
        }

        // Detect collision
        if (bX + bird.width >= element.x && bX <= element.x + pipeNorth.width && (bY <= element.y + pipeNorth.height || bY + bird.height >= element.y + constant) || bY + bird.height >= canvas.height - fg.height) {
            clearInterval(gameInterval);
            highScore = Math.max(score, highScore); // Update highScore
            alert("Game Over! Your score: " + score);
            return;
        }

        if (element.x == 5) {
            score++;
        }
    }

    context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(bird, bX, bY);

    bY += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 10, canvas.height - 20);
    context.fillText("High Score : " + highScore, 10, canvas.height - 50); // Display high score
}

function startGame() {
    if (!gameInterval) {
        gameInterval = setInterval(draw, 20);
    }
}

function pauseGame() {
    if (gameInterval) {
        if (paused) {
            gameInterval = setInterval(draw, 20);
        } else {
            clearInterval(gameInterval);
            gameInterval = null;
        }
        paused = !paused;
    }
}

function restartGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    bX = 10;
    bY = 150;
    score = 0;
    resetPipes();
    startGame();
}

function leaveGame() {
    window.location.href = "patient.html";
}
