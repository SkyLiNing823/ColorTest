const mins = document.getElementById("min");
const secs = document.getElementById("sec");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const soundEffectBtn = document.getElementById("soundEffectBtn");
const BGMBtn = document.getElementById("BGMBtn");
const hintBtn = document.getElementById("hintBtn");
const remainHP = document.getElementById("remainHP");
const remainMin = document.getElementById("remainMin");
const remainSec = document.getElementById("remainSec");
const floorNum = document.getElementById("floorNum");
const scoreNum = document.getElementById("scoreNum");
const startIcon = document.getElementById("startIcon");
const pauseIcon = document.getElementById("pauseIcon");
const soundEffectIcon = document.getElementById("soundEffectIcon");
const BGMIcon = document.getElementById("BGMIcon");
const hintIcon = document.getElementById("hintIcon");
const heartIcon = document.getElementsByClassName("heartIcon");
const ruleBoard = document.getElementById("ruleBoard");
const scoreContent = document.getElementById("scoreContent");
const board = document.getElementById("board");
const soundEffect_ans = document.getElementById("soundEffect_ans");
const soundEffect_break = document.getElementById("soundEffect_break");
const soundEffect_hint = document.getElementById("soundEffect_hint");
const BGM = document.getElementById("BGM");
soundEffect_break.volume = 0.4;
soundEffect_hint.volume = 0.8;
BGM.volume = 0.2;
let ansRow;
let ansCol;
let countdown;
let timeout;
let hp = 5;
let floor = 1;
let count = 2;
let recordMin;
let recordSec;
let record = true;
let gameStart = false;
let hintUsed = false;
let pause = false;
let soundeffect = true;
let bgm = true;

ruleBoard.innerHTML =
    `
    <div id="ruleHead">
        <h1>Rules</h1>
            </div>
                <div id="ruleContent">
                    <div class="center">
                        <p>
                            <h3 class="center">~基本規則~</h3>
                        </p>
                        <p><b>設定好時限後，點擊<img class="ruleIcons" src="resources/start.png" width="20px" height="20px">即可開始遊戲</b></p>
                        <p>點擊<b>不同色</b>的方塊即可<b>得分並通往下一關</b>
                        </p>
                        <p>點擊<b>同色</b>的方塊將<b>失去1點生命</b>(每局5點)
                        </p>
                        <p><b>當剩餘時間或剩餘生命歸0，遊戲結束</b></p>
                        <p>
                            <p>
                                <h3 class="center">~按鈕解說~</h3>
                            </p>
                    </div>
                <div style="padding-left: 20px;">
                    <p><img class="ruleIcons" src="resources/start.png" width="20px" height="20px"> : 開始遊戲</p>
                    <p><img class="ruleIcons" src="resources/reset.png" width="20px" height="20px"> : 重置遊戲</p>
                    <p><img class="ruleIcons" src="resources/pause.png" width="20px" height="20px"><img class="ruleIcons" src="resources/play.png" width="20px" height="20px"> : 暫停/開始遊戲(分數將不會計入記分板)</p>
                    <p><img class="ruleIcons" src="resources/soundEffect_on.png" width="20px" height="20px"><img class="ruleIcons" src="resources/soundEffect_off.png" width="20px" height="20px"> : 開啟/關閉按鍵音效</p>
                    <p><img class="ruleIcons" src="resources/BGM_on.png" width="20px" height="20px"><img class="ruleIcons" src="resources/soundEffect_off.png" width="20px" height="20px"> : 開啟/關閉背景音樂</p>
                    <p><img class="ruleIcons" src="resources/hint.png" width="20px" height="20px"> : 將範圍縮至包含不同色方塊的九宮格</p>
                    <p>(需支付1點生命，生命剩餘1以及前2關無法使用)</p>
                </div>
            </div>
        <div id="ruleTail">
    </div>
    `

function clickansBtn() {
    if (soundeffect == true) {
        soundEffect_ans.currentTime = 0;
        soundEffect_ans.play();
    }
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
    if (soundeffect == true) {
        soundEffect_break.currentTime = 0;
        soundEffect_break.play();
    }
    hp--;
    heartControll(hp);
    remainHP.innerText = "0" + hp;
    if (hp == 1)
        hintIcon.src = "resources/hint_lock.png";
    else if (hp == 0) {
        startIcon.src = "resources/start.png";
        clearInterval(countdown);
        clearTimeout(timeout);
        remainMin.innerText = "00";
        remainSec.innerText = "00";
        floorNum.innerText = "00";
        scoreNum.innerText = "00";
        alert(`您已用盡所有生命值！您已通過: ${Floor-1} 關，總共得到: ${Score} 分！`);
        board.innerHTML = "";
        gameStart = false;
        if (record == true)
            recordAdd();
    }
}

function timeOut() {
    startIcon.src = "resources/start.png";
    floorNum.innerText = "00";
    scoreNum.innerText = "00";
    alert(`時間到！您已通過: ${Floor-1} 關，總共得到: ${Score} 分！`);
    board.innerHTML = "";
    gameStart = false;
    if (record == true)
        recordAdd();
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
    board.innerHTML = "";
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
    if (num > 3) {
        if (hp > 1)
            hintIcon.src = "resources/hint.png";
    } else
        hintIcon.src = "resources/hint_lock.png";
    hintUsed = false;
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

function recordAdd() {
    scoreContent.innerHTML += `<p> > ${recordMin}m ${recordSec}s 內通過 ${Floor-1} 關 得到 ${Score} 分</p>`
}

startBtn.addEventListener("click", function() {
    record = true;
    gameStart = true;
    if (bgm == true)
        BGM.play();
    startIcon.src = "resources/reset.png";
    pauseIcon.src = "resources/pause.png";
    pause = false;
    remainHP.innerText = "05";
    floorNum.innerText = "01";
    scoreNum.innerText = "00";
    Min = parseInt(mins.value);
    Sec = parseInt(secs.value);
    recordMin = Min;
    recordSec = Sec;
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
    if (gameStart == true) {
        Min = parseInt(remainMin.innerText);
        Sec = parseInt(remainSec.innerText);
        if (pause == false) {
            clearTimeout(timeout);
            clearInterval(countdown);
            ansBtn.removeEventListener("click", clickansBtn);
            for (let i = 0; i < otherBtn.length; i++) {
                otherBtn[i].removeEventListener("click", clickotherBtn);
            }
            pauseIcon.src = "resources/play.png";
            pause = true;
            record = false;
        } else {
            timeout = setTimeout(timeOut, (Min * 60 + Sec) * 1000 + 50);
            countdown = setInterval(countDown, 1000);
            ansBtn.addEventListener("click", clickansBtn)
            for (let i = 0; i < otherBtn.length; i++) {
                otherBtn[i].addEventListener("click", clickotherBtn);
            }
            pauseIcon.src = "resources/pause.png";
            pause = false;
        }
    }
})

soundEffectBtn.addEventListener("click", function() {
    if (soundeffect == true) {
        soundEffectIcon.src = "resources/soundEffect_off.png";
        soundeffect = false;
    } else {
        soundEffectIcon.src = "resources/soundEffect_on.png";
        soundeffect = true;
    }
})

BGMBtn.addEventListener("click", function() {
    if (bgm == true) {
        BGM.pause();
        BGMIcon.src = "resources/BGM_off.png";
        bgm = false;
    } else {
        BGM.play();
        BGMIcon.src = "resources/BGM_on.png";
        bgm = true;
    }
})

hintBtn.addEventListener("click", function() {
    if (gameStart == true && hintUsed == false && count > 3) {
        if (hp > 1) {
            if (soundeffect == true) {
                soundEffect_hint.currentTime = 0;
                soundEffect_hint.play();
            }
            hintUsed = true;
            hintIcon.src = "resources/hint_lock.png";
            hp--;
            heartControll(hp);
            if (ansRow == 1) {
                rowStart = 1;
                rowEnd = 3;
            } else if (ansRow == count) {
                rowStart = count - 2;
                rowEnd = count;
            } else {
                rowStart = ansRow - 1;
                rowEnd = ansRow + 1;
            }
            if (ansCol == 1) {
                colStart = 1;
                colEnd = 3;
            } else if (ansCol == count) {
                colStart = count - 2;
                colEnd = count;
            } else {
                colStart = ansCol - 1;
                colEnd = ansCol + 1;
            }
            for (let i = 1; i <= count; i++) {
                for (let j = 1; j <= count; j++) {
                    if ((i < rowStart || i > rowEnd) || (j < colStart || j > colEnd)) {
                        document.getElementById(`${i}x${j}`).style.backgroundColor = "rgb(40, 40, 40)";
                        document.getElementById(`${i}x${j}`).style.border = "1px solid rgb(40, 40, 40)";
                    }
                }
            }
            if (hp == 1) {
                hintIcon.src = "resources/hint_lock.png";
            }
        }
    }
})