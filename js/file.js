const container = document.querySelector("#container");
const dino = document.querySelector("#dino");
const block = document.querySelector("#block");
const road = document.querySelector("#road");
const cloud = document.querySelector("#cloud");
const score = document.querySelector("#score");
const gameOver = document.querySelector("#gameOver");

let interval = null;
let playerScore = 0;

function updateScore() {
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`;
}

function startGame(event) {
    if (event.code === "Space") {
        gameOver.style.display = "none";
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
        cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";

        playerScore = 0;
        interval = setInterval(updateScore, 200);
    }
}

function jumpDino(event) {
    if (event.key === "ArrowUp" && !dino.classList.contains("dinoActive")) {
        dino.classList.add("dinoActive");
        setTimeout(() => {
            dino.classList.remove("dinoActive");
        }, 500);
    }
}

function checkCollision() {
    const dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
    const blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));

    if (dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        clearInterval(interval);
        playerScore = 0;
    }
}

window.addEventListener("keydown", startGame);
window.addEventListener("keydown", jumpDino);
setInterval(checkCollision, 10);
