// © - 2025 by novanoid2 on discord
const sqsize = 15; //square size, smaller > more squares > longer calculating times because my method is a bit inneficient
const canvas = document.getElementById("canvas");
let wh, t_id, lastSq, canvGlobal;
setSizes();
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const sq = canvas.getContext("2d");
const row = canvas.width / sqsize;
let pos = { x: 0, y: 0 };
let arrPos = 1;
let sqArr = [];
let shown = false;
let mouse = "up";
let started = false;

class Sqs {
    constructor(x, y, color) {
        this.info = { x: x, y: y, color: color };
        this.size = sqsize;
    }
    makeSq(color) {
        sq.fillStyle = color;
        sq.fillRect(this.info.x, this.info.y, this.size, this.size);
        sq.strokeStyle = "white";
        sq.lineWidth = 0.2;
        sq.strokeRect(this.info.x, this.info.y, this.size, this.size);
        sq.closePath();
    }
}

//make the squares, couldve used for() but i chose while() lol
while (pos.y < canvas.height) {
    while (pos.x < canvas.width) {
        sqArr[arrPos] = new Sqs(pos.x, pos.y, "black");
        sqArr[arrPos].makeSq();
        arrPos++;
        pos.x += sqsize;
    }
    pos.y += sqsize;
    pos.x = 0;
}

function start() {
    if (!started) {
        started = true;
        let num = 0;
        let check;
        let toBlack = [];
        let toWhite = [];
        //let newGrid = [];
        for (let i = 1; i < sqArr.length; i++) {//numbers of squares to check
            /* future: stop using this method and use a 2d array (const neighbors = [x,-y], [-x,y],...) and put it in 2 for loops (x and y)
            or something so it can check each neighbor for each i;  (thanks chat); (just optimise this -_-)
            */
            // newGrid[i] = structuredClone(sqArr[i]);
            if (sqArr[i].info.x === 0) {//left
                check = [{ 1: i - row, 2: i - (row - 1), 3: i + 1, 4: i + row, 5: i + (row + 1) }];
            } else if (sqArr[i].info.x === wh - sqsize) {//right
                check = [{ 1: i - (row + 1), 2: i - row, 3: i - 1, 4: i + (row - 1), 5: i + row }];
            } else {//middle
                check = [{ 1: i - (row + 1), 2: i - row, 3: i - (row - 1), 4: i - 1, 5: i + 1, 6: i + (row - 1), 7: i + row, 8: i + (row + 1) }];
            }

            //increments j (check values) and check color of each one
            //i really hope i wont have to reunderstand this later...
            for (let j = 0; j < Object.keys(check[0]).length; j++) {
                if (sqArr[check[0][Object.keys(check[0])[j]]]?.info.color === "white") num++;
            }

            //saves info to make it alive/dead
            if ((sqArr[i].info.color === "white" && (num === 3 || num === 2)) || (sqArr[i].info.color === "black" && num === 3)) {
                toWhite.push(i);
                //newGrid[i].info.color = "white"
            } else {
                toBlack.push(i);
            }

            num = 0;
        }
        //changes color to make them "alive or dead";
        for (let i = 0; i < toWhite.length; i++) {
            sqArr[toWhite[i]].info.color = "white";
        }
        for (let i = 0; i < toBlack.length; i++) {
            sqArr[toBlack[i]].info.color = "black";
        }

        reloadCanvas();
        //checks to repeat
        if (toWhite.length === 0) {
            clearTimeout(t_id);
            started = false;
        } else {
            t_id = setTimeout(() => { started = false; start(); }, 200);
        };
    }
}

//changes text color of update log
function toggleUpdate() {
    if (shown) {
        for (let i = 0; i < document.getElementById("rows").childElementCount; i++) {
            document.getElementById(`row${i + 1}`).style = "color: black";
        }
        shown = false;
        document.getElementById("poly").style.cssText += "transform: rotate(0deg);"
    } else {
        for (let i = 0; i < document.getElementById("rows").childElementCount; i++) {
            document.getElementById(`row${i + 1}`).style = "color: white";
        }
        shown = true;
        document.getElementById("poly").style.cssText += "transform: rotate(180deg);"
        alignPolyToButton();
    }
}

function reloadCanvas(num) {
    if (/[1-9]+/.test(num)) {
        sq.clearRect(sqArr[num].info.x, sqArr[num].info.y, sqsize, sqsize);
        sqArr[num].makeSq(sqArr[num].info.color);
    } else {
        sq.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 1; i < sqArr.length; i++) {
            sqArr[i].makeSq(sqArr[i].info.color);
        }
    }
}

//dla laptopa
function setSizes() {
    const h1 = document.getElementById("h1");
    wh = Math.floor(window.innerHeight * 0.95);
    if (window.innerWidth < 1100) {
        wh = Math.floor((window.innerHeight / 100 * (window.innerWidth / 12)));
        h1.style.fontSize = "2.5em";
    }
    while (wh % sqsize !== 0) wh++;
    document.documentElement.style.setProperty(`--wh`, `${wh}px`);
    const canv = document.getElementById("canvas").getBoundingClientRect();
    canvGlobal = canv; //make canv a global value
    document.documentElement.style.setProperty(`--x1`, `${canv.right + 40 - canv.left}px`);
    document.documentElement.style.setProperty(`--x2`, `${canv.right + 65 - canv.left}px`);
    document.documentElement.style.setProperty(`--ul`, `${canv.right - canv.left - 2}px`);
    if (window.innerWidth <= canv.right + 520) {
        document.documentElement.style.setProperty(`--h1`, `${canv.right + canv.left * 2}px`);
        h1.innerHTML = h1.textContent.replaceAll(" ", '<br>');
    } else {
        document.documentElement.style.setProperty(`--h1`, `${canv.width + canv.left * 3}px`);
    }
}

function alignPolyToButton() {
    const btn = document.getElementById('hiddenButton');
    const poly = document.getElementById('poly');
    const rect = btn.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const offsetTop = (rect.top - bodyRect.top) + 18;
    const offsetLeft = (rect.left - bodyRect.left) + rect.width / 2 - 2;
    poly.style.left = `${offsetLeft}px`;
    poly.style.top = `${offsetTop}px`;
}

//sets sq color to white and recolors it, then reloads the canvas
canvas.addEventListener("click", (e) => {
    const x = e.x - canvGlobal.left;
    const y = e.y - canvGlobal.top;
    for (let i = 1; i < sqArr.length; i++) {
        if (x > sqArr[i].info.x && x <= sqArr[i].info.x + sqsize && y > sqArr[i].info.y && y <= sqArr[i].info.y + sqsize) {
            if (sqArr[i].info.color === "black") sqArr[i].info.color = "white"; else sqArr[i].info.color = "black";
            reloadCanvas();//dont add the i in here
        }

    }
});

//https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
canvas.addEventListener("mousedown", () => { mouse = "down"; });

canvas.addEventListener('mousemove', (e) => {
    if (mouse === "up") return;
    const x = e.x - canvGlobal.left;
    const y = e.y - canvGlobal.top;
    for (let i = 1; i < sqArr.length; i++) {
        if (x > sqArr[i].info.x && x <= sqArr[i].info.x + sqsize && y > sqArr[i].info.y && y <= sqArr[i].info.y + sqsize) {
            if (lastSq !== i) {
                if (sqArr[i].info.color === "black") sqArr[i].info.color = "white"; else sqArr[i].info.color = "black";
                lastSq = i;
                reloadCanvas(i);
            }
        }
    }
});

canvas.addEventListener("mouseup", () => { mouse = "up"; });

//uhhhh at start i think?
window.addEventListener('load', () => {
    alignPolyToButton();
    //setTimeout(alignPolyToButton, 50);
});

//reloads when window width changes so canvas.width also changes appropraitely (appropreiat,eorptjsiro thwroitn) idk how to spell it
window.addEventListener('resize', () => { location.reload(); });