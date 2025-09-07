let canv = document.getElementById("canvas");
canv.width = canv.clientWidth;
canv.height = canv.clientHeight;
let alg = canv.getContext("2d");
const bars = [];
let barsWidth = 10;
let x = canv.width - barsWidth;
let rectHeight = 500; //500 is default but you can change it.
document.getElementById("v").textContent += `; 1-while`

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
    while(true){





        //redraws the rects
        alg.clearRect(0, 0, canv.width, canv.height);
        for (let i = 0; i < bars.length; i++) {
            alg.fillStyle = `rgb(${bars[i].r}, ${bars[i].r}, ${bars[i].r})`;
            alg.beginPath();
            alg.rect(bars[i].pos.x, bars[i].pos.y, barsWidth, -bars[i].h);
            alg.fill();
        }
    }

}

//generates a random number for the gray-scale colors ig?
function getRandomNum(max) {
    let a = Math.floor(Math.random() * max);
    while (a < 35) a += 5;
    255 - a >= 180 ? a *= 1.5 : a;
    return a;
}

window.addEventListener('resize', () => { location.reload(); });