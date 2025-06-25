let canvas = document.getElementById("canvas");
const sq = canvas.getContext("2d");
let snakeBlocks = [];
let blockNum = 1;
let sqsize = 5;
let allowMove = true;
let copy0Before, copy0After, allowRepeatedMove, lastMove;
let nextMove = "ArrowDown";

'use strict';
//now to fix update for the first block
//78: copy the specs of the 1 block, let it update and then paste them infront of array?
// i -> i + 1; i - 1 -> i
//for nextMove system ↓
//setinterval(200){settimeout(700) nextmovearr[0]  = lastMove};

function makeSnake() {
    for (let i = 0; i < 4; i++) {
        let newBlock = new snake(canvas.width / 2, i * sqsize + canvas.height / 2, i + 1);
        snakeBlocks.push(newBlock);
        newBlock.show();
    }
}

class snake {
    constructor(x, y, id) {
        this.pos = { x: x, y: y, id: id };
        this.size = sqsize;
    }
    show() {
        if (blockNum === 1) {
            sq.fillStyle = "darkgreen"
            blockNum++;
        } else {
            sq.fillStyle = "lightgreen";
        }
        sq.fillRect(this.pos.x, this.pos.y, this.size * 0.81, this.size * 3 / 4);
    }
}

function updatePos(from, to) {
    console.log("-------------update-------------")
    for (let i = 0; i < snakeBlocks.length - 1; i++) {
        i == 0 ? snakeBlocks[0].pos = copy0Before : snakeBlocks[0].pos = copy0After;
        snakeBlocks[i + 1].pos.x = snakeBlocks[i].pos.x;
        snakeBlocks[i + 1].pos.y = snakeBlocks[i].pos.y;
    }
    /*//from.id = to.id;
    from.x = to.x;
    from.y = to.y;*/
    sq.clearRect(0, 0, canvas.width, canvas.height);
    blockNum = 1;
    console.log(snakeBlocks);
    debugger;
    for (let i = 0; i < snakeBlocks.length; i++) {
        console.log(snakeBlocks[i].pos.x + "x" + snakeBlocks[i].pos.y + "y");
        let newBlock = snakeBlocks[i];
        newBlock.show();
    }

}

window.addEventListener("keydown", function (key) {
    /*if(key.key !== nextMove[0]) {
    setTimeout(() => {
    nextMove = [];
    nextMove.push(key.key);
}, 100);
}*/
    if (snakeBlocks[0].pos.x < canvas.width - sqsize && snakeBlocks[0].pos.x > 0 && snakeBlocks[0].pos.y < canvas.height - sqsize && snakeBlocks[0].pos.y > 0/* && allowMove*/) {
        nextMove = key.key;
        console.log(nextMove, lastMove);
        debugger;
        if (/ArrowUp|ArrowDown|ArrowLeft|ArrowRight/.test(nextMove) && nextMove !== lastMove) {
            console.log(snakeBlocks[0].pos.x + "x" + snakeBlocks[0].pos.y + "y");
            allowRepeatedMove = false;
            setTimeout(() => {
                allowRepeatedMove = true;
            }, 900)
            copy0Before = snakeBlocks[0].pos;
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
                    break;
                default:
                    console.log("'error' at move func; line 74; nie ma {key.key}" + ` lub = ${key.key} =? lub odwrotny lastMove (${allowMove})`);
            }
            console.log(snakeBlocks[0].pos.x + "x" + snakeBlocks[0].pos.y + "y");
            copy0After = snakeBlocks[0].pos;
            console.log(copy0Before, copy0After);
            updatePos();
        }
        /*allowMove =  false;
        setTimeout(() => {
            allowMove = true;
        }, 800);*/
    }

});


setInterval(() => {
    lastMove !== "ArrowUp" && lastMove !== "ArrowDown" && lastMove !== "ArrowLeft" && lastMove !== "ArrowRight" ? lastMove = "ArrowDown" : console.log('everything good');
    if (allowRepeatedMove) {
        if (snakeBlocks[0].pos.x < canvas.width - sqsize && snakeBlocks[0].pos.x > 0 && snakeBlocks[0].pos.y < canvas.height - sqsize && snakeBlocks[0].pos.y > 0) {
            console.log(snakeBlocks[0].pos.x + "x" + snakeBlocks[0].pos.y + "y");
            copy0Before = snakeBlocks[0].pos;
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
                    break;
                default:
                    console.log("error at repeated move func; lastMove = " + `${lastMove}`);
            }
            console.log(snakeBlocks[0].pos.x + "x" + snakeBlocks[0].pos.y + "y");
            copy0After = snakeBlocks[0].pos;
            console.log(copy0Before, copy0After);
            updatePos();
        } else {
            snakeBlocks = [];
            alert("przegrales, boohoo");
            restart();
        }
    }
}, 900);

makeSnake();

function restart() {
    location.reload();
}