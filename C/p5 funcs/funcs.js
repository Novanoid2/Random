let factButton, randomButton, reverseButton,biggestButton, outputMode;
let constantUpdate = false;
let rannum = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background("gray");
  makeButtons();
}

function draw() {
  //console.log(outputMode);
  if (outputMode !== undefined){
    sendData();
} else if(outputMode == randomNumber){
  randomNumber();
}
}

function makeButtons() {
  factButton = createButton("Silnia");
  factButton.position(95, 140);
  factButton.mouseClicked(factorial);
  randomButton = createButton("Wygeneruj liczbę");
  randomButton.position(270, 140);
  randomButton.mouseClicked(randomNumber);
  reverseButton = createButton("Odwrócony tekst");
  reverseButton.position(50, 170);
  reverseButton.mouseClicked(reverseText);
  //biggestButton = createButton("Znajdż najwiekszą liczbe");
  //biggestButton.position(20, 200);.
  //biggestButton.mouseClicked(biggestnumber);
  celsfahrButton = createButton("Celsiusz → Fahrenheit");
  celsfahrButton.position(25, 200);
  celsfahrButton.mouseClicked(celsFahrFuncMode);
  fahrcelsButton = createButton("Fahrenheit → Celsiusz");
  fahrcelsButton.position(25, 230);
  fahrcelsButton.mouseClicked(fahrCelsFuncMode);
}

function sendData() {
  background("grey");
  textSize(23);
  if (
    outputMode !== randomNumber &&
    document.getElementById("datainfo").value !== ""
  ) {
    text(outputMode(document.getElementById("datainfo").value), 150, 326);
  }
  /*if (outputMode == largestNumber && document.getElementById("datainfo").value !== ""
  ) {
    if()
      str.split(" ");
  }*/
}

function factorial(numb) {
  outputMode = factorial;
  if (Number.isNaN(numb) == false) {
    if (numb == 0) return 1;
    return numb * factorial(numb - 1);
  }
}
function randomNumber(min, max) {
  outputMode = randomNumber;
  if (
    document.getElementById("min1").value !== "" &&
    document.getElementById("max2").value !== ""
  ) {
    background("grey");
    textSize(23);
    let min = Number(document.getElementById("min1").value);
    let max = Number(document.getElementById("max2").value);
    text(Math.floor(Math.random() * (max - min + 1)) + min, 150, 361);
    outputMode = undefined;
  }
}
function reverseText(str) {
  outputMode = reverseText;
  return str.split("").reverse().join("");
}
/*function largestNumber(arr) {
  return Math.max(...arr);
}*/

/*function biggestnumber() {
  outputMode = largestNumber;
}
*/

function celsFahrFuncMode(){
  outputMode = celsFahrFuncMode;
    if (Number.isNaN(document.getElementById("datainfo").value) === false) {
       return Math.floor(document.getElementById("datainfo").value * 9/5 + 32);
}
}

function fahrCelsFuncMode(){
  outputMode = fahrCelsFuncMode;
  if (Number.isNaN(document.getElementById("datainfo").value) === false) {
    return Math.floor((document.getElementById("datainfo").value - 32) * 5/9);
}
}