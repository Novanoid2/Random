let allowAddOp = mathfloor_q = hasKomma = forceOp = false;
let allowSilnia = true;
let lastOp, liczbasilnia, s, liczbaPodPierw, lastIsKomma, hasE;
var liczbaZPrz = document.getElementById("z");
var liczbaBezPrz = document.getElementById("bez");
var visible = document.getElementById("visible_output");
var calc = document.getElementById("calc_output");
liczbaZPrz.checked = true;
// moze dodac ( i ) pozniej

function addnumb(value) {
  if(!forceOp){
  visible.value += value;
  allowAddOp = true;
  lastIsKomma = false;
  lastOp = "number";
  }
  if(visible.value.includes("*")) visible.value = visible.value.slice(1);
}

function action(operation) {
  if (allowAddOp || forceOp ) {
    if(visible.value.includes("*")) visible.value = visible.value.slice(1);
    if (operation === ".") {
      if (!hasKomma && lastOp !== "siln" && lastOp !== "pierw" && !hasE) {
        visible.value += operation;
        allowAddOp = false;
        forceOp = false;
        hasKomma = true;
        lastIsKomma = true;
        lastOp = ".";
      }
    } else {
        while(visible.value.includes("e")){
          visible.value = visible.value.replace(/e\+[0-9]+/, "");
          hasE = true;
        }
      visible.value += operation;
      allowAddOp = false;
      forceOp = false;
      hasKomma = false;
      lastIsKomma = false;
      lastOp = operation;
  }
}
} 
window.addEventListener('keydown', keyPress);
function keyPress(key) {
  const numbers = /[0-9]/;
  const ops = /^[+\-*/!^]+$/;
  if (numbers.test(key.key)) {
    if(key.key === "0"){
      if(visible.value !== ""){
        addnumb("0");
      }
    } else {
    addnumb(key.key);
    }
  }
  if (ops.test(key.key)) {
    if(key.key !== "!"){
      action(key.key);
    } else {
      silnia();
    }
  }
  if(key.keyCode === 13){
    showresult();
  }
  if(key.keyCode === 8){
    backspace();
  }
  if(key.key === "." || key.key === ","){
    action(".");
  }
}
function backspace() {
  visible.value = visible.value.slice(0, -1);
  calc.value = calc.value.slice(0, -1);
  if(lastIsKomma){
    lastIsKomma = false;
    hasKomma = false;
  }
}

function clearAll() {
  visible.value = "";
  calc.value = "";
  visible.placeholder = "...";
  allowAddOp = forceOp = hasKomma = lastIsKomma = hasE = false;
  allowSilnia = true;
}

function showresult() {
  if (allowAddOp || forceOp) {
    calc.value = visible.value;
    if(calc.value.includes("^")){
      calc.value = calc.value.replace("^","**");
    }
    if(calc.value.includes("!")){
      if(/[0-9]+\!/.test(calc.value)){
        calc.value = calc.value.replace(/[0-9]+\!/, s);
      }
      }
    if(calc.value.includes("·")){
      calc.value = calc.value.replace("·","*");
    }
    if(calc.value.includes("√(")){
      calc.value = calc.value.replace("√(","Math.sqrt(");
    }
    if (mathfloor_q && calc.value !== "") {
      calc.value = Math.floor(eval(calc.value));
      visible.value = calc.value;
    }
     if(!mathfloor_q && calc.value !== ""){
      calc.value = eval(calc.value);
      visible.value = calc.value;
    }
    if(/[0-9]+\.0{6,}[1-9]?/.test(visible.value)){
      if(!/e\+[0-9]+/.test(visible.value)){
      visible.value = visible.value.slice(0,-7);
      }
    }
    if(hasE){
      let visValCopy = visible.value;
      clearAll();
      hasE = true;
      visible.value = "*" + visValCopy;
      if(visible.value === ""){
        hasE = false;
      }
    }
    lastOp = "";
    forceOp = false; 
    allowAddOp = allowSilnia = true;
  }
}
function pierw() {
  if (!allowAddOp && !lastIsKomma && lastOp !== "pierw" && lastOp !== "siln") {
    liczbaPodPierw = window.prompt("Wpisz liczbe ktora ma być pod pierwiastkiem", "");
    if (liczbasilnia / liczbasilnia === 1 && /^[0-9+\-*/]+$/.test(liczbaPodPierw)) {
      visible.value += "√(" + liczbaPodPierw + ")";
      forceOp = true;
      lastOp = "pierw";
    } else {
      console.log("Pierwiastek error - Niepoprawna liczba...");
      visible.placeholder = "ehhhhh, nie";
    }
  }
}
function silnia() {
  if (!allowAddOp && !lastIsKomma && lastOp !== "siln" && lastOp !== "pierw" && allowSilnia) {
    liczbasilnia = window.prompt("Wpisz liczbe żeby dodać do silni");
    if (liczbasilnia / liczbasilnia === 1 && liczbasilnia < 22 && !liczbasilnia.includes(".")) {
      visible.placeholder = "";
      let i = 1;
      s = 1;
      while (i <= liczbasilnia) s *= i++;
      visible.value +=  liczbasilnia + "!";
      forceOp = true;
      lastOp = "siln";
      allowSilnia = false;
    } else {
      console.log("Silnia error - To nie liczba lub za duża (wieksza niż 21)");
      visible.placeholder = "ehhhhh, nie";
    }
  }
}

function zprz() {
  mathfloor_q = false;
  liczbaBezPrz.checked = false;
  liczbaZPrz.checked = true;
}
function bezprz() {
  mathfloor_q = true;
  liczbaZPrz.checked = false;
  liczbaBezPrz.checked = true;
}
  setInterval(() => {
    if(visible.value === ""){
      document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby, (pierwiastku lub silnia)";
      lastOp = "";
      hasE = false;
      allowAddOp = false;
    } else if(lastIsKomma){
      document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby";
    } else if (forceOp) {
      document.getElementById("oczekiwanie").innerHTML = "oczekuje +, -, /, * lub ^";
    } else if (allowAddOp) {
      document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby lub +, -, /, * lub ^";
    } else {
      document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby, (pierwiastku lub silnia)";
    }
  }, 300);

/*  setInterval(() => {
    if (s === undefined) s = "/";
    console.log(
      "Has e?:"+hasE,
      "\r\nnumb has komma?: "+hasKomma,
      "\r\nlast is komma?: "+ lastIsKomma,
      "\r\nliczbasilnia: "+liczbasilnia,
      "\r\ns = " + s,
      "| s.length = " + s.toString().length,
      "\r\nallowAddOp: "+allowAddOp,
      "\r\nround off: "+mathfloor_q,
      "\r\nlastOp: "+lastOp,
      "\r\nliczba pod pierw: "+liczbaPodPierw,
      "\r\n'"+visible.value+"'",
     "'"+ calc.value+"'",
    );
  }, 1300);*/