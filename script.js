let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;
let lapCounter = 1;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = "Start";
        startStopBtn.style.backgroundColor = "#28a745";
    } else {
        timer = setInterval(updateTime, 1000);
        startStopBtn.textContent = "Pause";
        startStopBtn.style.backgroundColor = "#ffc107";
    }
    isRunning = !isRunning;
}

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    display.textContent = formatTime(hours, minutes, seconds);
}

function formatTime(h, m, s) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0; minutes = 0; hours = 0;
    display.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    startStopBtn.style.backgroundColor = "#28a745";
    lapsList.innerHTML = "";
    lapCounter = 1;
}

function recordLap() {
    if (!isRunning) return;
    const lapTime = formatTime(hours, minutes, seconds);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapCounter++;
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);