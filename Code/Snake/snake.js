//first finished and working version: 30d/6m/'25 19:51 (w/ bugs i think)
// © - 2025 by miren.3 on discord
'use strict';
const sqsize = 25;
const canvas = document.getElementById("canvas");
setSize();
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const sq = canvas.getContext("2d");
let snakeBlocks = [];
let food = [];
let blockNum = 1;
let score = 0;
let allowRepeatedMove = false;
let foodExists = false;
let copy0Before, copy0After, lastMove, nextMove, text, intervalId, timeoutId;
let start = true;
let lost = false;
let time = 25;

//initialize snake body
function makeSnake(x, y, amm) {
    if (amm === 1) {
        snakeBlocks.push(new snakeAndFood(x, y));
        snakeBlocks[snakeBlocks.length - 1].showSnake();
    } else {
        for (let i = 0; i < amm; i++) {
            snakeBlocks.push(new snakeAndFood(x, -i * sqsize + y));
            snakeBlocks[i].showSnake();
        }
    }
}

//info snake body and food 
class snakeAndFood {
    constructor(x, y) {
        this.pos = { x: x, y: y };
        this.size = sqsize * 5 / 6;
    }

    showSnake() {
        if (blockNum === 1) {
            sq.fillStyle = "darkgreen";
            blockNum++;
        } else {
            sq.fillStyle = "lightgreen";
        }

        sq.beginPath();
        sq.roundRect(this.pos.x, this.pos.y, this.size, this.size, 5);
        sq.fill();
    }

    showFood() {
        sq.fillStyle = "red";
        sq.beginPath();
        sq.roundRect(this.pos.x, this.pos.y, this.size, this.size, 8);
        sq.fill();
    }
}

//updates each snake body position and then clears and draws them again, does the same for food
function updateAndDraw() {
    for (let i = snakeBlocks.length - 1; i >= 0; i--) {
        //swap out [0] block pos so the [1] block goes to the right pos and then revert the [0] position
        if (i === 1) snakeBlocks[0].pos = copy0Before; else snakeBlocks[0].pos = copy0After;

        if (i !== 0) {
            snakeBlocks[i].pos.x = snakeBlocks[i - 1].pos.x;
            snakeBlocks[i].pos.y = snakeBlocks[i - 1].pos.y;
        } else {
            snakeBlocks[i].pos.x = copy0After.x;
            snakeBlocks[i].pos.y = copy0After.y;
            break;
        }
    }

    blockNum = 1;
    sq.clearRect(0, 0, canvas.width, canvas.height);

    if (foodExists) food[0].showFood();

    for (let i = 0; i < snakeBlocks.length; i++) {
        snakeBlocks[i].showSnake();
    }
}

//first move "function", activated by keypresses
window.addEventListener("keydown", function (event) {
    if (isInBounds()) {
        changeAToB(event.key);

        //to not let it go in the oppossite direction
        const opposite = (
            (nextMove === "ArrowUp" && lastMove === "ArrowDown") ||
            (nextMove === "ArrowLeft" && lastMove === "ArrowRight") ||
            (nextMove === "ArrowRight" && lastMove === "ArrowLeft") ||
            (nextMove === "ArrowDown" && lastMove === "ArrowUp")
        );

        if (!opposite && nextMove !== lastMove) {
            allowRepeatedMove = false;
            setTimeout(() => {
                allowRepeatedMove = true;
            }, 200)

            copy0Before = { x: snakeBlocks[0].pos.x, y: snakeBlocks[0].pos.y };
            if (start && nextMove === "ArrowUp") {
                nextMove = "ArrowDown";
                start = false;
            }

            switch (nextMove) {
                case "ArrowUp":
                    if (lastMove !== "ArrowDown") {
                        snakeBlocks[0].pos.y -= sqsize;
                        lastMove = "ArrowUp";
                    }
                    break;
                case "ArrowDown":
                    if (lastMove !== "ArrowUp") {
                        snakeBlocks[0].pos.y += sqsize;
                        lastMove = "ArrowDown";
                    }
                    break;
                case "ArrowLeft":
                    if (lastMove !== "ArrowRight") {
                        snakeBlocks[0].pos.x -= sqsize;
                        lastMove = "ArrowLeft";
                    }
                    break;
                case "ArrowRight":
                    if (lastMove !== "ArrowLeft") {
                        snakeBlocks[0].pos.x += sqsize;
                        lastMove = "ArrowRight";
                    }
            }

            copy0After = { x: snakeBlocks[0].pos.x, y: snakeBlocks[0].pos.y };

            if (Math.random() < 0.15) makeFood();

            updateAndDraw();
            start = false;
        }
    } else {
        if (lost === false) lostGame("Wyszedles poza granice. Ty ćmoku");
    }
});

//second move "function", the repeated version
setInterval(() => {
    if (allowRepeatedMove) {
        if (isInBounds()) {
            copy0Before = { x: snakeBlocks[0].pos.x, y: snakeBlocks[0].pos.y };
            switch (lastMove) {
                case "ArrowUp":
                    snakeBlocks[0].pos.y -= sqsize;
                    break;
                case "ArrowDown":
                    snakeBlocks[0].pos.y += sqsize;
                    break;
                case "ArrowRight":
                    snakeBlocks[0].pos.x += sqsize;
                    break;
                case "ArrowLeft":
                    snakeBlocks[0].pos.x -= sqsize;
            }

            copy0After = { x: snakeBlocks[0].pos.x, y: snakeBlocks[0].pos.y };
            makeFood();
            updateAndDraw();
        } else {
            if (lost === false) lostGame("Wyszedles poza granice...");
        }
    }
}, 500);

//makes food, duuuhhh...
//known bug: sometimes the food can spawn inside the snake body
function makeFood() {
    if (!foodExists) {
        let x = Math.floor(Math.random() * (canvas.width - sqsize));
        let y = Math.floor(Math.random() * (canvas.height - sqsize));
        let xCopy = x;
        let yCopy = y;

        //calculates difference and adds/subtracts it from the original x pos
        if (x % sqsize !== 0) {
            x = x.toString();
            //removes first 1/2 numbers (otherwise output is always 25)
            //extra comment here: if sqsize is one digit then you need to add this extra: if(x.length === 2){...}
            //and if sqsize is 3 digits long then remove the first if (same goes for the y)
            if (x.length == 3) {
                x = x.slice(1);
            } else if (x.length == 4) {
                x = x.slice(2);
            }

            xCopy += sqsize - (+x);
        }

        if (y % sqsize !== 0) {
            y = y.toString();

            if (y.length == 3) {
                y = y.slice(1);
            } else if (y.length == 4) {
                y = y.slice(2);
            }

            yCopy += sqsize - (+y);
        }

        food[0] = (new snakeAndFood(xCopy, yCopy));
        foodExists = true;
        time = 25;

        //food disappears after some time
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        }

        setText();
        let timeoutTime = time * 1000;
        timeoutId = setTimeout(() => {
            food = [];
            foodExists = false;
            time = 25;
            document.getElementById("text").removeChild(text);
        }, timeoutTime);
    }
}

//make and update the time text for when the food disappears
function setText() {
    if (document.getElementById("text").childElementCount === 1) document.getElementById("text").removeChild(text);
    text = document.createElement("p");
    text.style = "font-size: 1.5em; color: rgb(131, 96, 255); text-align-last: center; transform: translate(0, -200%);";
    text.textContent = `${time} sekund aż jedzenie zniknie.`;
    time--;
    document.getElementById("text").appendChild(text);

    intervalId = setInterval(() => {
        if (time >= 0 && food.length > 0 && foodExists === true) {
            text.textContent = `${time} sekund aż jedzenie zniknie.`;
            time--;
        } else {
            document.getElementById("text").removeChild(text);
            time = 25;
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        }
    }, 1000);
}

//detects when snake eats the food
setInterval(() => {
    if (food.length !== 0 && lost === false) {
        if (food[0].pos.x === snakeBlocks[0].pos.x && food[0].pos.y === snakeBlocks[0].pos.y) {
            food = [];
            foodExists = false;
            extendSnake(snakeBlocks[snakeBlocks.length - 2].pos.x);
        }
    }
}, 1);

//adds blocks to the end of snake after eating food (apples - yum)
//should i just put this in the interval thing?
function extendSnake(last2PosX) {
    let newPos = { x: snakeBlocks[snakeBlocks.length - 1].pos.x, y: snakeBlocks[snakeBlocks.length - 1].pos.y };

    if (last2PosX - snakeBlocks[snakeBlocks.length - 1].pos.x > 0) {
        makeSnake(newPos.x - sqsize, newPos.y, 1);
    } else {
        makeSnake(newPos.x + sqsize, newPos.y, 1);
    }

    score++;
    food = [];
}

//detect collision between the snake body
setInterval(() => {
    for (let i = 1; i < snakeBlocks.length; i++) {
        if (lost === false && snakeBlocks[0].pos.x === snakeBlocks[i].pos.x && snakeBlocks[0].pos.y === snakeBlocks[i].pos.y) {
            lostGame("Kolizja z ciałem snake-a")
        }
    }
}, 100);

//make & put text on screen when lost
//add codde to make blocks delete themselves from end to start when you die (setinterval)
function lostGame(reason) {
    let inside = isInBounds();
    let speed = 600;
    lost = true;
    nextMove = lastMove = null;
    food = [];
    foodExists = false;

    if (snakeBlocks.length < 35) {
        for (let i = 1; i < snakeBlocks.length; i++) {
            speed -= 15;
        }
    } else {
        speed = 2;
    }

    let message = document.createElement("h2");
    message.textContent = `Przegrales: ${reason}`;
    message.style = `position: absolute; left: 50%; top: ${canvas.top}; transform: translate(-50%, 20%);
    color: rgb(106, 82, 195); font-family: Garamond; z-index: 2; font-size: 2em`;
    document.body.appendChild(message);
    let scoreMessage = document.createElement("p");
    scoreMessage.textContent = `Ilość punktów: ${score}`;
    scoreMessage.style = `position: absolute; left: 50%; top: ${canvas.top}; transform: translate(-50%, 160%);
    color: rgb(106, 82, 195); font-family: Garamond; z-index: 2; font-size: 1.5em`;
    document.body.appendChild(scoreMessage);
    document.getElementById("restart").style = "color: red; border: turquoise solid 2px; font-size: 2.5em";

    setInterval(() => {
        snakeBlocks.pop();
        sq.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snakeBlocks.length; i++) {
            if (inside) {
                if (i === 0) blockNum = 1;
            } else {
                if (i === 1) blockNum = 1;
            }

            snakeBlocks[i].showSnake();
        }
    }, speed);
}

//only real purpose is to change [wasd] to arrow text to let it continue working
function changeAToB(key) {
    if (/^[wasd]$/i.test(key)) {
        if (key === 'a') nextMove = "ArrowLeft";
        if (key === 'w') nextMove = "ArrowUp";
        if (key === 's') nextMove = "ArrowDown";
        if (key === 'd') nextMove = "ArrowRight";
    } else if (/ArrowUp|ArrowDown|ArrowLeft|ArrowRight/.test(key)) {
        nextMove = key;
    } else {
        nextMove = lastMove;
    }
}

//check if snake is head still in bounds to let it move again in move "functions"
function isInBounds() {
    if (lost === false && snakeBlocks[0].pos.x <= canvas.width - sqsize && snakeBlocks[0].pos.x >= 0
        && snakeBlocks[0].pos.y < canvas.height && snakeBlocks[0].pos.y >= 0)
        return true;
    else
        return false;
}

//for some reason these two behave differently, idk why + too lazy to fix it cuz it works x3
//detects if snake head goes past border and ends game if yes
setInterval(() => {
    if (lost === false) {
        if (snakeBlocks[0].pos.x < 0 || snakeBlocks[0].pos.y > canvas.height - sqsize ||
            snakeBlocks[0].pos.x > canvas.width - sqsize || snakeBlocks[0].pos.y < 0) {
            lostGame("Wyszedles poza granice");
        }
    }
}, 100);

//calculates & sets the size for the game canvas in the absolute beginning
function setSize() {
    let w = Math.floor((window.innerWidth / 100 * 87));
    let h = Math.floor((window.innerHeight / 100 * 79));
    while (w % sqsize !== 0) w++;
    while (h % sqsize !== 0) h++;
    if (window.innerHeight < 670) {
        h = window.innerHeight / 2;
        document.documentElement.style.setProperty(`--t`, `25%`);
    } else document.documentElement.style.setProperty(`--t`, `15%`);
    document.documentElement.style.setProperty(`--w`, `${w}px`);
    document.documentElement.style.setProperty(`--h`, `${h}px`);
}

//calculate starting pos to be dividable by 25 (necessary for border allignement)
let snakeW = Math.floor(canvas.width / 2);
let snakeH = Math.floor(canvas.height / 2);
while (snakeW % sqsize !== 0) snakeW++;
while (snakeH % sqsize !== 0) snakeH++;

makeSnake(snakeW, snakeH, 5);

window.addEventListener('resize', () => { location.reload(); });