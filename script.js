const mins = document.getElementById("min");
const secs = document.getElementById("sec");
const startBtn = document.getElementById("startBtn");
const startIcon = document.getElementById("startIcon");
const pauseBtn = document.getElementById("pauseBtn");
const remainHP = document.getElementById("remainHP");
const heartIcon = document.getElementsByClassName("heartIcon");
const remainMin = document.getElementById('remainMin');
const remainSec = document.getElementById('remainSec');
const floorNum = document.getElementById('floorNum');
const scoreNum = document.getElementById('scoreNum');
const pauseIcon = document.getElementById('pauseIcon');
const board = document.getElementById('board');
const audio = document.createElement("audio");
audio.src = "resources/break.wav";
let countdown;
let timeout;
let hp = 5;
let floor = 1;
let count = 2;
let pause = false;

function clickansBtn() {
    Floor = parseInt(floorNum.innerText);
    Score = parseInt(scoreNum.innerText);
    Floor += 1;
    Score += count;
    if (Floor < 10)
        floorNum.innerText = "0" + Floor;
    else
        floorNum.innerText = Floor;
    if (Score < 10)
        scoreNum.innerText = "0" + Score;
    else
        scoreNum.innerText = Score;
    if (count < 20)
        count++;
    board.innerHTML = "";
    createBlocks(count);
}

function clickotherBtn() {
    audio.currentTime = 0;
    audio.play();
    hp -= 1;
    heartControll(hp);
    remainHP.innerText = "0" + hp;
    if (hp == 0) {
        startIcon.src = "./resources/start.png";
        clearInterval(countdown);
        clearTimeout(timeout);
        remainMin.innerText = "00";
        remainSec.innerText = "00";
        floorNum.innerText = "00";
        scoreNum.innerText = "00";
        alert(`您已用盡所有生命值！您已通過: ${Floor-1} 關，總共得到: ${Score} 分！`);
        board.innerHTML = "";
    }
}

function timeOut() {
    startIcon.src = "./resources/start.png";
    floorNum.innerText = "00";
    scoreNum.innerText = "00";
    alert(`時間到！您已通過: ${Floor-1} 關，總共得到: ${Score} 分！`);
    board.innerHTML = "";
}

function countDown() {
    if (Sec > 0) {
        Sec--;
        if (Sec < 10)
            remainSec.innerText = "0" + Sec;
        else
            remainSec.innerText = Sec;
    } else if (Min > 0 && Sec == 0) {
        Min--;
        Sec = 59;
        if (Min < 10)
            remainMin.innerText = "0" + Min;
        else
            remainMin.innerText = Min;
        remainSec.innerText = "59";
    }

}

function heartControll(hp) {
    for (let i = 0; i < 5; i++) {
        if (i < hp)
            heartIcon[i].src = "resources/fullHeart.png"
        else
            heartIcon[i].src = "resources/hollowHeart.png"
    }
}

function createBlocks(num) {
    board.innerHTML = '';
    ansRow = Math.floor(Math.random() * num) + 1;
    ansCol = Math.floor(Math.random() * num) + 1;
    for (let i = 1; i < num + 1; i++) {
        for (let j = 1; j < num + 1; j++) {
            if (i == ansRow && j == ansCol)
                board.innerHTML += '<button class="pressBtn" id="ansBtn"></button>';
            else
                board.innerHTML += `<button class="pressBtn otherBtn" id="${i}x${j}"></button>`;
        }
    }
    ansBtn = document.getElementById("ansBtn");
    pressBtn = document.getElementsByClassName("pressBtn");
    otherBtn = document.getElementsByClassName("otherBtn");
    blockLength = 650 / count;
    R = Math.floor(Math.random() * 160) + 50;
    G = Math.floor(Math.random() * 160) + 50;
    B = Math.floor(Math.random() * 160) + 50;
    mode = Math.floor(Math.random() * 8);
    Array.from(pressBtn).forEach(function(pressBtn) { //for every pressBtn
        pressBtn.style.width = `${blockLength}px`;
        pressBtn.style.height = `${blockLength}px`;
        pressBtn.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    });
    randomNum = Math.floor(Math.random() * 10) + 15;
    switch (mode) {
        case 0:
            ansBtn.style.backgroundColor = `rgb(${R-randomNum}, ${G-randomNum}, ${B-randomNum})`;
            break;
        case 1:
            ansBtn.style.backgroundColor = `rgb(${R-randomNum}, ${G}, ${B})`;
            break;
        case 2:
            ansBtn.style.backgroundColor = `rgb(${R}, ${G-randomNum}, ${B})`;
            break;
        case 3:
            ansBtn.style.backgroundColor = `rgb(${R}, ${G}, ${B-randomNum})`;
            break;
        case 4:
            ansBtn.style.backgroundColor = `rgb(${R+randomNum}, ${G}, ${B})`;
            break;
        case 5:
            ansBtn.style.backgroundColor = `rgb(${R}, ${G+randomNum}, ${B})`;
            break;
        case 6:
            ansBtn.style.backgroundColor = `rgb(${R}, ${G}, ${B+randomNum})`;
            break;
        case 7:
            ansBtn.style.backgroundColor = `rgb(${R+randomNum}, ${G+randomNum}, ${B+randomNum})`;
            break;
    }
    ansBtn.addEventListener("click", clickansBtn)
    for (let i = 0; i < otherBtn.length; i++) {
        otherBtn[i].addEventListener("click", clickotherBtn);
    }
}

startBtn.addEventListener("click", function() {
    startIcon.src = "./resources/reset.png";
    pauseIcon.src = "./resources/pause.png";
    pause = false;
    remainHP.innerText = "05";
    floorNum.innerText = "01";
    scoreNum.innerText = "00";
    Min = parseInt(mins.value);
    Sec = parseInt(secs.value);
    if (Min == 0 && Sec == 0)
        Min = 1;
    if (Min < 10)
        remainMin.innerText = "0" + Min;
    else
        remainMin.innerText = Min;
    if (Sec < 10)
        remainSec.innerText = "0" + Sec;
    else
        remainSec.innerText = Sec;
    hp = 5;
    Floor = 1;
    Score = 0;
    heartControll(hp);
    clearTimeout(timeout);
    clearInterval(countdown);
    timeout = setTimeout(timeOut, (Min * 60 + Sec) * 1000 + 50);
    countdown = setInterval(countDown, 1000);
    count = 2;
    board.innerHTML = "";
    createBlocks(count);
})

pauseBtn.addEventListener("click", function() {
    if (pause == false) {
        clearTimeout(timeout);
        clearInterval(countdown);
        ansBtn.removeEventListener("click", clickansBtn);
        for (let i = 0; i < otherBtn.length; i++) {
            otherBtn[i].removeEventListener("click", clickotherBtn);
        }
        pauseIcon.src = "resources/play.png";
        pause = true;
    } else {
        Min = parseInt(remainMin.innerText);
        Sec = parseInt(remainSec.innerText);
        console.log(remainMin.innerText);
        timeout = setTimeout(timeOut, (Min * 60 + Sec) * 1000 + 50);
        countdown = setInterval(countDown, 1000);
        ansBtn.addEventListener("click", clickansBtn)
        for (let i = 0; i < otherBtn.length; i++) {
            otherBtn[i].addEventListener("click", clickotherBtn);
        }
        pauseIcon.src = "resources/pause.png";
        pause = false;
    }
})