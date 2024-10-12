let time = document.querySelector("#time");

function updateTime() {
    let date = new Date();

    let hour = date.getHours().toString().padStart(2, 0);
    let min = date.getMinutes().toString().padStart(2, 0);
    let sec = date.getSeconds().toString().padStart(2, 0);

    time.textContent = `${hour}:${min}:${sec}`
}

updateTime();
setInterval(updateTime, 1000);