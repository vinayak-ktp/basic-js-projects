let display = document.querySelector("#time-disp");
let elapsedTime = 0;
let timer = null;

function startTimer() {
    if(timer == null) {    
        timer = setInterval(updateTime, 10);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    display.textContent = `00:00:00:00`;
}

function updateTime() {
    elapsedTime += 11;
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let mili = Math.floor(elapsedTime / 10 % 100);

    hours = String(hours).padStart(2, 0);
    minutes = String(minutes).padStart(2, 0);
    seconds = String(seconds).padStart(2, 0);
    mili = String(mili).padStart(2, 0);

    display.textContent = `${hours}:${minutes}:${seconds}:${mili}`;
}