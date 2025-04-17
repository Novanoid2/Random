let started = false;
let color = "#0038ff";
let balls = document.getElementById("row");
let ballsarray = [];
var ballspos = [];
var blueballs = [];
var linearr = [];
let size = "45";
let allow, last;
let num = 1;
const canvas = document.getElementById("canvas");
const line = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.documentElement.style.setProperty(`--size`,`${size}px`);
document.documentElement.style.setProperty('--color', `${color}`);

for (let i = 0; i < 16; i++) {
    const ball = document.createElement("span");
    ball.id = (i + 1);
    ball.className = "dot";
    document.getElementById("row").appendChild(ball);
    ballsarray.push(ball);
}
for (let i = 0; i < balls.childElementCount / 2; i++) {
    const ball = document.createElement("span");
    ball.id = (`r2${(i + 1)}`);
    ball.className = "dot";
    document.getElementById("row2").appendChild(ball);
    ballsarray.push(ball);
}
for (let i = 0; i < balls.childElementCount / 4; i++) {
    const ball = document.createElement("span");
    ball.id = (`r3${(i + 1)}`);
    ball.className = "dot";
    document.getElementById("row3").appendChild(ball);
    ballsarray.push(ball);
}
for (let i = 0; i < balls.childElementCount / 8; i++) {
    const ball = document.createElement("span");
    ball.id = (`r4${(i + 1)}`);
    ball.className = "dot";
    document.getElementById("row4").appendChild(ball);
    ballsarray.push(ball);
}

ballsarray.push("last one");

let query = document.querySelectorAll(".dot");
for (let dot of query) { //nowe
    let pos = dot.getBoundingClientRect();
    let x = pos.left + pos.width / 2 + window.scrollX;
    let y = pos.top + pos.width / 2 + window.scrollY;
    ballspos.push({ x, y });
}
/////////////////////////////////////////
//kinda inefficient but it works ¯\_(ツ)_/¯
for (let i = 0; i < balls.childElementCount; i++) {
    let allow;
    const blueball = document.createElement("span");
    if (i === 0) {
        if (num === 1) {
            if (Math.random() < 0.5) {
                blueball.id = `b${(i + 1)}`;
                blueball.className = "bluedot";
                document.getElementById("bluedots").appendChild(blueball);
                blueballs.push(blueball);
                //znowu nowe xd
                document.getElementById(`b${i + 1}`).style.cssText = `left: ${ballspos[i].x - (size / 2)}px`;
                last = "add";
                allow = false;
            } else {
                last = "nothing";
                allow = true;
            }
            num = 2;
        } else if (num === 2) {
            if (allow === true) {
                blueball.id = `b${(i + 1)}`;
                blueball.className = "bluedot";
                document.getElementById("bluedots").appendChild(blueball);
                blueballs.push(blueball);
                //znowu nowe xd
                document.getElementById(`b${i + 1}`).style.cssText = `left: ${ballspos[i].x - (size / 2)}px`;
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
                document.getElementById("bluedots").appendChild(blueball);
                blueballs.push(blueball);
                document.getElementById(`b${i + 1}`).style.cssText = `left: ${ballspos[i].x - (size / 2)}px`;
                last = "add";
                allow = false;
            } else {
                last = "nothing";
                allow = true;
            }
            num = 2;
        } else if (num === 2) {
            if (allow === true) {
                if (last !== "add") {
                    blueball.id = `b${(i + 1)}`;
                    blueball.className = "bluedot";
                    document.getElementById("bluedots").appendChild(blueball);
                    blueballs.push(blueball);
                    document.getElementById(`b${i + 1}`).style.cssText = `left: ${ballspos[i].x - (size / 2)}px`;
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
                    document.getElementById("bluedots").appendChild(blueball);
                    blueballs.push(blueball);
                    document.getElementById(`b${i + 1}`).style.cssText = `left: ${ballspos[i].x - (size / 2)}px`;
                    last = "add";
                }
            }
            num = 1;
        }
    }
}
/////////////////////////////////////////////

for (let i = 0, j = 0; i < ballspos.length; i++) {
    (i % 2 === 0 && i !== 0) ? j++ : j;
    line.beginPath();
    line.moveTo(ballspos[i].x, ballspos[i].y);
    if (j + 16 < 31) line.lineTo(ballspos[j + 16].x, ballspos[j + 16].y);
    line.lineWidth = 5;
    line.stroke();
    linearr.push(line);
}
