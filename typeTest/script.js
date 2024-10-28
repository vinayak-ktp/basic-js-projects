const top100Words = [
    "found", "he", "think", "after", "still", "their", "by", "large", "small", "again",
    "those", "had", "house", "was", "going", "about", "light", "write", "we", "from",
    "which", "asked", "often", "be", "never", "they", "water", "first", "years", "sound",
    "or", "could", "where", "for", "great", "with", "study", "one", "right", "group",
    "other", "under", "little", "this", "there", "when", "life", "three", "early", "learn",
    "something", "point", "all", "among", "what", "before", "to", "young", "words", "as",
    "brother", "your", "were", "at", "change", "place", "who", "call", "five", "over",
    "her", "said", "line", "these", "sister", "that", "not", "has", "can", "some",
    "people", "could", "course", "she", "feel", "long", "them", "program", "now", "possible",
    "more", "time", "home", "also", "back", "then", "give", "out", "thin", "even"
];

const text_display = document.querySelector("h1");
const time_display = document.querySelector("#timer");

let text, colored_text, idx, textLength, timeLeft;
let totalKeyStrokes = 0, correctKeyStrokes = 0;

let timer = null;
let startTime = null;
let testComplete = false;

initialize();

document.addEventListener("keydown", event => {
    let keyPressed = event.key.toLowerCase();
    if(keyPressed === "tab") {
        event.preventDefault();
        initialize();
        return;
    }
    
    if(timer === null) {
        timer = setInterval(() => {
            timeLeft--;
            time_display.textContent = `${timeLeft}`;
            if(timeLeft <= 0) {
                clearInterval(timer);
                displayResult();
            }
        }, 1000);
    }
    
    if(startTime === null) startTime = Date.now();
    totalKeyStrokes++;
    
    try {
        const button = document.querySelector(`#${keyPressed}`);
        button.classList.add("active");
    }
    catch(error) {}
    
    checkAndUpdate(keyPressed);
});

document.addEventListener("keyup", event => {
    let keyPressed = event.key;
    try {
        const button = document.querySelector(`#${keyPressed}`);
        button.classList.remove("active");
    }
    catch(error) {}
});

function checkAndUpdate(keyPressed) {
    if(keyPressed === text[idx]) {
        correctKeyStrokes++;
        colored_text += text[idx++];
        const uncolored_text = text.slice(idx);
        text_display.innerHTML = `<span>${colored_text}</span>${uncolored_text}`;
    }
    if(idx === textLength) {
        displayResult();
        testComplete = true;
    }
}

function displayResult() {
    if(testComplete) return;
    const endTime = Date.now();
    const interval = (endTime - startTime)/1000;
    
    const wpm = ((idx / 5) / interval) * 60;
    const accuracy = (correctKeyStrokes/totalKeyStrokes) * 100;
    
    text_display.innerHTML = `Your typing speed : <result>${Math.round(wpm)}</result>WPM <br>`;
    text_display.innerHTML += `Your Accuracy: <result>${Math.round(accuracy)}</result>% <br><br>`;
    text_display.innerHTML += `<n style="font-size: 25px;">Press <result>Tab</result> to restart</n>`;

    time_display.style.display = "none";
    text = "";
}

function setNull() {
    text = "";
    clearInterval(timer);
    timer = null;
    timeLeft = 15;
    startTime = null;
    colored_text = "";
    idx = 0;
    testComplete = false;
    totalKeyStrokes = 0;
    correctKeyStrokes = 0;
}

function initialize() {
    setNull();
    time_display.textContent = `${timeLeft}`;
    time_display.style.display = "block";

    for(let i=0; i<20; i++) {
        let randIdx = Math.floor(Math.random() * 100);
        let word = top100Words[randIdx];
        text += `${word} `;
    }

    textLength = text.length - 1;
    text_display.textContent = `${text}`;
}