// © - 2024 & 2025 by novanoid2 on discord
let allowAddOp = false;
let allowSilnia = true;
let lastOp, liczbasilnia, s, liczbaPodPierw, lastIsKomma, hasE, mathfloor_q, hasKomma, forceOp;
var liczbaZPrz = document.getElementById("z");
var liczbaBezPrz = document.getElementById("bez");
var visible = document.getElementById("visible_output");
var calc = document.getElementById("calc_output");
liczbaZPrz.checked = true;
//moze dodac ( i ) pozniej

//appends number to the input 
function addnumb(value) {
  if (!forceOp) {
    visible.value += value;
    allowAddOp = true;
    lastIsKomma = false;
    lastOp = "number";
  }

  if (visible.value.charAt(0) === "(") visible.value = visible.value.slice(3); //this removes the "(e)"
}

//appends action symbol to the input
function action(operation) {
  if (allowAddOp || forceOp) {
    if (visible.value.charAt(0) === "(") visible.value = visible.value.slice(3); //this removes the "(e)"

    //list of things to check before actually adding the symbol
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
      while (visible.value.includes("e")) {
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

//listens to key inputs and calls function accordingly
window.addEventListener('keydown', function keyPress(key) {
  const numbers = /^[0-9]$/;
  const ops = /^[+\-*/!^]+$/;

  if (numbers.test(key.key)) {
    if (key.key === "0") {
      if (visible.value !== "") addnumb("0"); //prevents adding 0 when the input is empty

    } else addnumb(key.key);

  } else if (ops.test(key.key)) {

    if (key.key !== "!") {
      action(key.key);
    } else silnia(); //factorial is a special case in my code
  }

  //other inputs
  if (key.code === "Enter") showresult();
  else if (key.code === "Backspace") backspace();
  else if (key.key === "." || key.key === ",") action(".");
}
);

//removes last character
function backspace() {
  visible.value = visible.value.slice(0, -1);
  calc.value = calc.value.slice(0, -1);

  if (lastIsKomma) {
    lastIsKomma = false;
    hasKomma = false;
  }
}

//clears everything
function clearAll() {
  visible.value = "";
  calc.value = "";
  visible.placeholder = "...";
  allowAddOp = forceOp = hasKomma = lastIsKomma = hasE = false;
  allowSilnia = true;
  s = "";
}

//calculates and shows result
function showresult() {
  //safety check but useless since this is only local
  //if (/[^0-9+\-*/().^!√e]+/.test(visible.value)) {
  if (allowAddOp || forceOp) {
    calc.value = visible.value;
    //check if it should replace to be able to calculate in calc.value
    while (calc.value.includes("^")) {
      calc.value = calc.value.replace("^", "**");
    }

    //if (calc.value.includes("!")) {
    if (/[0-9]+\!/.test(calc.value)) {
      calc.value = calc.value.replace(/[0-9]+\!/, s);
    }
    //}

    while (calc.value.includes("√(")) {
      calc.value = calc.value.replace("√(", "Math.sqrt(");
    }

    //calc.value does its thing (also checks if it should round off)
    if (mathfloor_q && calc.value !== "") {
      calc.value = Math.round(eval(calc.value));
      visible.value = calc.value;
    }

    if (!mathfloor_q && calc.value !== "") {
      calc.value = eval(calc.value);
      visible.value = calc.value;
    }

    //removes unnecessary zeros and e at the end
    if (/[0-9]+\.0{5,}[1-9]{1,}/.test(visible.value)) {
      if (!/e\+[0-9]+/.test(visible.value)) {
        while (visible.value.includes(".")) {
          visible.value = visible.value.slice(0, -1);
        }
      }
    }

    //adds e to show its a big number + updates variable
    if (hasE) {
      let visValCopy = visible.value;
      clearAll();
      hasE = true;
      visible.value = "(e)" + visValCopy;

      if (visible.value === "") hasE = false;
    }

    lastOp = "";
    forceOp = false;
    allowAddOp = allowSilnia = true;
  }
}
//}

function pierw() {
  //checks if prompt is valid and adds to visible.value
  if (!allowAddOp && !lastIsKomma && lastOp !== "pierw" && lastOp !== "siln") {
    liczbaPodPierw = window.prompt("Wpisz liczbe ktora ma być pod pierwiastkiem", "");

    if (/^[0-9+\-*/]+$/.test(liczbaPodPierw)) {
      visible.value += "√(" + liczbaPodPierw + ")";
      forceOp = true;
      lastOp = "pierw";
    } else {
      console.log("Pierwiastek error - Niepoprawna liczba...", `"${liczbaPodPierw}"`);
    }
  }
}

function silnia() {
  //check if prompt is valid and stores in variable, later replaces
  if (!allowAddOp && !lastIsKomma && lastOp !== "siln" && lastOp !== "pierw" && allowSilnia) {
    liczbasilnia = window.prompt("Wpisz liczbe żeby dodać do silni");

    if (liczbasilnia / liczbasilnia === 1 && liczbasilnia < 22 && !liczbasilnia.includes(".")) {
      visible.placeholder = "";
      let i = 1;
      s = 1;
      while (i <= liczbasilnia) s *= i++;
      visible.value += liczbasilnia + "!";
      forceOp = true;
      lastOp = "siln";
      allowSilnia = false;
    } else {
      console.log("Silnia error - To nie liczba lub za duża (wieksza niż 21)", `"${liczbasilnia}"`);
    }
  }
}

//a small guide that tells you what is expected next
setInterval(() => {
  if (visible.value === "") {
    document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby, pierwiastku lub silnia";
    lastOp = "";
    hasE = false;
    allowAddOp = false;
    s = "";
  } else if (lastIsKomma) {
    document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby";
  } else if (forceOp) {
    document.getElementById("oczekiwanie").innerHTML = "oczekuje +, -, /, * lub ^";
  } else if (allowAddOp) {
    document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby lub +, -, /, * lub ^";
  } else {
    document.getElementById("oczekiwanie").innerHTML = "oczekuje liczby, pierwiastku lub silnia";
  }
}, 300);

/* eh just some debug code i left in  
setInterval(() => {
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