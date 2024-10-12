let display = document.querySelector("input");

function append(input) {
    if(display.value === "ERROR") correct();
    display.value += input;
    display.scrollLeft = display.scrollWidth;
}

function correct() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value).toFixed(4);
    }
    catch(error) {
        console.error(error);
        display.value = "ERROR"
    }
}