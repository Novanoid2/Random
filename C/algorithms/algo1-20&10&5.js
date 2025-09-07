let canv = document.getElementById("canvas");
canv.width = canv.clientWidth;
canv.height = canv.clientHeight;
let alg = canv.getContext("2d");
const bars = [];
let barsWidth = 10;
let x = canv.width - barsWidth;
let rectHeight = 500; //500 is default but you can change it.
document.getElementById("v").textContent += `; 1-20&10&5`

//make and show all the rectangles
for (let i = 0; i < (canv.width / barsWidth) - 5; i++) {
    let height = Math.floor(Math.random() * rectHeight);
    height < 15 ? height += 15 : height; //fail-safe
    let rgb = getRandomNum(255);
    bars.push({ pos: { x: x, y: canv.height }, h: height, r: rgb });
    let show = () => {
        alg.fillStyle = `rgb(${bars[i].r}, ${bars[i].r}, ${bars[i].r})`;
        alg.beginPath();
        alg.rect(bars[i].pos.x, bars[i].pos.y, barsWidth, -bars[i].h);
        alg.fill();
    }
    show();
    x -= barsWidth;
}

//type of "comb sort"
async function startSorting() {
    let interval;
    document.getElementById("b").disabled = true;
    document.getElementById("b").textContent = `Myśleć myśleć...`;
    let num = 0;
    let completed = 0;
    interval = setInterval(() => {
        //checks 20 bars to the left
        if (num < bars.length - 20) { //secure that num + 10 has a value
            if (bars[num].h < bars[num + 20].h) {//compares h values
                //reapply h & r values from num + 10 to num so it "moves" to the left
                const h0 = bars[num].h;
                const r0 = bars[num].r;
                bars[num].h = bars[num + 20].h;
                bars[num].r = bars[num + 20].r;
                bars[num + 20].h = h0;
                bars[num + 20].r = r0;
            }
        }

        //checks 10 bars to the left
        if (num < bars.length - 10) { //secure that num + 10 has a value
            if (bars[num].h < bars[num + 10].h) {//compares h values
                //reapply h & r values from num + 10 to num so it "moves" to the left
                const h0 = bars[num].h;
                const r0 = bars[num].r;
                bars[num].h = bars[num + 10].h;
                bars[num].r = bars[num + 10].r;
                bars[num + 10].h = h0;
                bars[num + 10].r = r0;
            }
        }

        //checks 5 bars to the left
        if (num < bars.length - 5) { //secure that num + 5 has a value
            if (bars[num].h < bars[num + 5].h) {//compares h values
                //reapply h & r values from num + 5 to num so it "moves" to the left
                const h0 = bars[num].h;
                const r0 = bars[num].r;
                bars[num].h = bars[num + 5].h;
                bars[num].r = bars[num + 5].r;
                bars[num + 5].h = h0;
                bars[num + 5].r = r0;
            }
        }

        //checks 1 bar to the left
        if (num < bars.length - 1) { //secure that num + 1 has a value
            if (bars[num].h < bars[num + 1].h) {//compares h values
                //reapply h & r values from num + 1 to num so it "moves" to the left
                const h0 = bars[num].h;
                const r0 = bars[num].r;
                bars[num].h = bars[num + 1].h;
                bars[num].r = bars[num + 1].r;
                bars[num + 1].h = h0;
                bars[num + 1].r = r0;
            } else completed++;
            num++;

        } else {
            if (completed === bars.length - 1) {//basically checks if all of them are in the correct order
                clearInterval(interval);
                document.getElementById("b").textContent = `Koniec`;
            }
            num = 0;
            completed = 0;
        }

        //redraws the rects
        alg.clearRect(0, 0, canv.width, canv.height);
        for (let i = 0; i < bars.length; i++) {
            alg.fillStyle = `rgb(${bars[i].r}, ${bars[i].r}, ${bars[i].r})`;
            alg.beginPath();
            alg.rect(bars[i].pos.x, bars[i].pos.y, barsWidth, -bars[i].h);
            alg.fill();
        }
    }, 1);
}

//generates a random number for the gray-scale colors ig?
function getRandomNum(max) {
    let a = Math.floor(Math.random() * max);
    while (a < 35) a += 5;
    255 - a >= 180 ? a *= 1.5 : a;
    return a;
}

window.addEventListener('resize', () => { location.reload(); });