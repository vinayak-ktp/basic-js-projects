let level = 0;
let highscore = 0;
let computer = [];
let user = [];

let buttons = document.querySelectorAll(".box");
let scoreDisplay = document.querySelector("#highscore");
let colors = ["green", "red", "yellow", "blue"];

let title = document.querySelector("h1");
document.addEventListener("keydown", startGame);

buttons.forEach(button => {
    let color = button.getAttribute("id");
    button.style.backgroundColor = `${color}`;

    button.addEventListener("click", () => {
        makeSound(color);
        addAnimation(button);
        user.push(color);
        checkAnswer(user.length - 1);
    });
});

function makeSound(color) { 
    let audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}

function addAnimation(button) {
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

function checkAnswer(idx) {
    if(user[idx] !== computer[idx]) {
        gameOver();
    }
    else if(idx === computer.length -1) {
        setTimeout(generateSequence, 1000);
    }
}

function gameOver() {
    document.querySelector("#container").style.display = "none";
    let sound = new Audio('./sounds/wrong.mp3');
    sound.play();
    level = 0;
    title.textContent = "Game Over, Press any key to start over!";
    computer = [];
    user = [];
    document.addEventListener("keydown", startGame);
}

function generateSequence() {
    user = [];
    title.textContent = `level ${++level}`;
    let colorIdx = Math.floor(Math.random() * 4);
    let color = colors[colorIdx];
    computer.push(color);

    let button = document.querySelector(`#${color}`);
    makeSound(color);
    addAnimation(button);

    if(level-1 > highscore) {
        highscore = level-1;
        scoreDisplay.textContent = `High Score: ${highscore}`;
    }
}

function startGame() {
    generateSequence();
    document.querySelector("#container").style.display = "grid";
    document.removeEventListener("keydown", startGame);
}