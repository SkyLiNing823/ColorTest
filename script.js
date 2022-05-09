const mins = document.getElementById("min");
const secs = document.getElementById("sec");
const startBtn = document.getElementById("startBtn");
const scoreNum = document.getElementById('scoreNum');
const remainMin = document.getElementById('remainMin');
const remainSec = document.getElementById('remainSec');
const board = document.getElementById('board');
let countdown;
let timeout;
let count = 2;

function createBlocks(num) {
    board.innerHTML = '';
    ansRow = Math.floor(Math.random() * num) + 1;
    ansCol = Math.floor(Math.random() * num) + 1;
    for (let i = 1; i < num + 1; i++) {
        for (let j = 1; j < num + 1; j++) {
            if (i == ansRow && j == ansCol)
                board.innerHTML += '<button class="pressBtn" id="ansBtn"></button>';
            else
                board.innerHTML += `<button class="pressBtn" id="${i}x${j}"></button>`;
        }
    }
    ansBtn = document.getElementById("ansBtn");
    pressBtn = document.getElementsByClassName("pressBtn");
    blockLength = 700 / count;
    R = Math.floor(Math.random() * 255);
    G = Math.floor(Math.random() * 255);
    B = Math.floor(Math.random() * 255);
    Array.from(pressBtn).forEach(function(pressBtn) { //for every pressBtn
        pressBtn.style.width = `${blockLength}px`;
        pressBtn.style.height = `${blockLength}px`;
        pressBtn.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    });
    randomNum = Math.floor(Math.random() * 10) + 8;
    ansBtn.style.backgroundColor = `rgb(${R-randomNum}, ${G-randomNum}, ${B-randomNum})`;
    ansBtn.addEventListener("click", function() {
        Score = parseInt(scoreNum.innerText);
        Score++;
        scoreNum.innerText = Score;
        if (count < 25)
            count++;
        board.innerHTML = "";
        createBlocks(count);
    })
}


startBtn.addEventListener("click", function() {
    Min = parseInt(mins.value);
    Sec = parseInt(secs.value);
    if (Min == 0 && Sec == 0)
        Min = 1;
    remainMin.innerText = Min;
    remainSec.innerText = Sec;
    scoreNum.innerText = "0";
    Score = 0;
    clearInterval(countdown);
    clearTimeout(timeout);

    timeout = setTimeout(function() {
        scoreNum.innerText = "0";
        remainSec.innerText = "0";
        alert(`時間到！您的分數為: ${Score}`);
        board.innerHTML = "";
    }, (Min * 60 + Sec) * 1000);

    countdown = setInterval(function() {
        if (Sec > 0) {
            Sec--;
            remainSec.innerText = Sec;
        } else if (Min > 0 && Sec == 0) {
            Min--;
            Sec = 59;
            remainMin.innerText = Min;
            remainSec.innerText = "59";
        }
    }, 1000);
    count = 2;
    board.innerHTML = "";
    createBlocks(count);
})