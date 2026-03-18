// © - 2025 by miren.3 on discord
// future update maybe: add func to make the d1... divs, np: line 66 += makeDivs(num);
let color = "#0038ff";
let balls = document.getElementById("row");
let ballsarray = [];
var ballspos = [];
var blueballs = [];
var linearr = [];
let size = "45";
let last, del, allBlueBalls;
let num = 1;
const canvas = document.getElementById("canvas");
const line = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.documentElement.style.setProperty(`--size`, `${size}px`);

//makes the circles
function makeCircles(amm, htmldiv, id) {
    for (let i = 0; i < amm; i++) {
        const ball = document.createElement("span");
        ball.id = `${id}${(i + 1)}`;
        ball.className = "dot";
        document.getElementById(htmldiv).appendChild(ball);
        ballsarray.push(ball);

    }
}

//calls the function to make the circles
makeCircles(16, "row", "");
makeCircles(balls.childElementCount / 2, "row2", "r2");
makeCircles(balls.childElementCount / 4, "row3", "r3");
makeCircles(balls.childElementCount / 8, "row4", "r4");
makeCircles(balls.childElementCount / 16, "last", "r5");

//notes the position of each ball
let query = document.querySelectorAll(".dot");
for (let dot of query) { //nowe
    let pos = dot.getBoundingClientRect();
    let x = pos.left + pos.width / 2 + window.scrollX;
    let y = pos.top + pos.width / 2 + window.scrollY;
    ballspos.push({ x, y });
}

//sets property for each bal (row i think)
for (let i = 0; i < 15; i++) {
    document.documentElement.style.setProperty(`--left${i + 1}`, `${ballspos[(i + 16)].x - 22}px`);
}

document.documentElement.style.setProperty(`--top2`, `${ballspos[16].y - 23}px`);
document.documentElement.style.setProperty(`--top3`, `${ballspos[24].y - 23}px`);
document.documentElement.style.setProperty(`--top4`, `${ballspos[28].y - 23}px`);
document.documentElement.style.setProperty(`--top5`, `${ballspos[30].y - 23}px`);

/////////////////////////////////////////
//kinda inefficient but it works ¯\_(ツ)_/¯
//uhh basically this is a bad algorithm to make sure there is at least one ball active in every group of 2 balls
for (let i = 0; i < balls.childElementCount; i++) {
    let allowMake;
    const blueball = document.createElement("span");
    if (i === 0) {
        if (num === 1) {
            if (Math.random() < 0.5) {
                blueball.id = `b${(i + 1)}`;
                blueball.className = "bluedot";
                document.getElementById(`d${i + 1}`).appendChild(blueball);
                blueballs.push(blueball);
                //znowu nowe xd
                document.getElementById(`d${i + 1}`).style = `left: ${ballspos[i].x - (size / 2)}px; top: ${ballspos[i].y - (size / 2)}px; background-color: ${color};`;
                last = "add";
                allowMake = false;
            } else {
                last = "nothing";
                allowMake = true;
            }

            num = 2;

        } else if (num === 2) {
            if (allowMake === true) {
                blueball.id = `b${(i + 1)}`;
                blueball.className = "bluedot";
                document.getElementById(`d${i + 1}`).appendChild(blueball);
                blueballs.push(blueball);
                //znowu nowe xd
                document.getElementById(`d${i + 1}`).style = `left: ${ballspos[i].x - (size / 2)}px; top: ${ballspos[i].y - (size / 2)}px; background-color:  ${color};`;
                last = "add";
            } else {
                last = "nothing";
            }

            num = 1;
        }

    } else {
        if (num === 1) {
            if (Math.random() < 0.5) {
                blueball.id = `b${(i + 1)}`;
                blueball.className = "bluedot";
                document.getElementById(`d${i + 1}`).appendChild(blueball);
                blueballs.push(blueball);
                document.getElementById(`d${i + 1}`).style = `left: ${ballspos[i].x - (size / 2)}px; top: ${ballspos[i].y - (size / 2)}px; background-color:  ${color};`;
                last = "add";
                allowMake = false;
            } else {
                last = "nothing";
                allowMake = true;
            }

            num = 2;

        } else if (num === 2) {
            if (allowMake === true) {
                if (last !== "add") {
                    blueball.id = `b${(i + 1)}`;
                    blueball.className = "bluedot";
                    document.getElementById(`d${i + 1}`).appendChild(blueball);
                    blueballs.push(blueball);
                    document.getElementById(`d${i + 1}`).style = `left: ${ballspos[i].x - (size / 2)}px; top: ${ballspos[i].y - (size / 2)}px; background-color:  ${color};`;
                    last = "add";
                } else {
                    last = "nothing";
                }

            } else {
                if (last !== "nothing") {
                    last = "nothing";
                } else {
                    blueball.id = `b${(i + 1)}`;
                    blueball.className = "bluedot";
                    document.getElementById(`d${i + 1}`).appendChild(blueball);
                    blueballs.push(blueball);
                    document.getElementById(`d${i + 1}`).style = `left: ${ballspos[i].x - (size / 2)}px; top: ${ballspos[i].y - (size / 2)}px; background-color: ${color};`;
                    last = "add";
                }
            }

            num = 1;
        }
    }
}
/////////////////////////////////////////////

//makes the lines which the balls "follow"
for (let i = 0, j = 0; i < ballspos.length; i++) {
    (i % 2 === 0 && i !== 0) ? j++ : j;
    line.strokeStyle = "white";
    line.beginPath();
    line.moveTo(ballspos[i].x, ballspos[i].y);
    if (j + 16 < 31) line.lineTo(ballspos[j + 16].x, ballspos[j + 16].y);
    line.lineWidth = 5;
    line.stroke();
    linearr.push(line);
}

//adds the animation to move the balls using css
for (let i = 1; i < balls.childElementCount + 1; i += 2) {
    if (document.getElementById(`d${i}`).innerHTML.trim() === "") {
        document.getElementById(`d${i + 1}`).style.animation = `test${i + 1} 8s ease 0.7s`;
    } else {
        document.getElementById(`d${i}`).style.animation = `test${i} 8s ease 0.7s`;
    }
}

let active = true;
let query2 = document.querySelectorAll(".bluedot");

//i have no fucking clue what this is supposed to do
setInterval(() => {
    if (!blueballs[8] || blueballs[8].y === undefined) {
        blueballs[8] = { x: 0, y: 0 };
    }

    if (blueballs[8].y <= 218) {
        if (active === true) {
            blueballs.splice(blueballs.length - 1, 1);
            active = false;
        } else {
            blueballs.splice(8, 8);
            for (let dot of query2) { //nowe
                let pos = dot.getBoundingClientRect();
                let y = pos.top + pos.width / 2 + window.scrollY;
                blueballs.push({ y });
            }
        }

    } else {
        del === undefined ? del = true : del;
    }
}, 300);

setInterval(() => {
    if (del === true) {
        del = false;

        if (Math.random() < 0.5) {
            document.getElementById(`d1`).style = "";
            document.getElementById(`d2`).style = "";
        } else {
            document.getElementById(`d3`).style = "";
            document.getElementById(`d4`).style = "";
        }

        if (Math.random() > 0.5) {
            document.getElementById(`d5`).style = "";
            document.getElementById(`d6`).style = "";
        } else {
            document.getElementById(`d7`).style = "";
            document.getElementById(`d8`).style = "";
        }

        if (Math.random() < 0.5) {
            document.getElementById(`d9`).style = "";
            document.getElementById(`d10`).style = "";
        } else {
            document.getElementById(`d11`).style = "";
            document.getElementById(`d12`).style = "";
        }

        if (Math.random() > 0.5) {
            document.getElementById(`d13`).style = "";
            document.getElementById(`d14`).style = "";
        } else {
            document.getElementById(`d15`).style = "";
            document.getElementById(`d16`).style = "";
        }

        setTimeout(() => {
            if (Math.random() < 0.5) {
                document.getElementById(`d1`).style = "";
                document.getElementById(`d2`).style = "";
                document.getElementById(`d3`).style = "";
                document.getElementById(`d4`).style = "";
            } else {
                document.getElementById(`d5`).style = "";
                document.getElementById(`d6`).style = "";
                document.getElementById(`d7`).style = "";
                document.getElementById(`d8`).style = "";
            }

            if (Math.random() > 0.5) {
                document.getElementById(`d9`).style = "";
                document.getElementById(`d10`).style = "";
                document.getElementById(`d11`).style = "";
                document.getElementById(`d12`).style = "";
            } else {
                document.getElementById(`d13`).style = "";
                document.getElementById(`d14`).style = "";
                document.getElementById(`d15`).style = "";
                document.getElementById(`d16`).style = "";
            }

        }, 2000);

        setTimeout(() => {
            if (Math.random() < 0.5) {
                for (let i = 1; i < 9; i++) {
                    document.getElementById(`d${i}`).style = "";
                }

            } else {
                for (let i = 9; i < 17; i++) {
                    document.getElementById(`d${i}`).style = "";
                }
            }

        }, 4000);

        setTimeout(() => {
            document.getElementById(`r51`).style = `background-color: ${color};`;
            for (let i = 1; i < balls.childElementCount + 1; i++) {
                document.getElementById(`d${i}`).style = "";
            }
            //setTimeout(() => {
            //    location.reload();
            //},500)
        }, 5900);
    }
}, 1);

window.addEventListener("resize", () => {location.reload()});