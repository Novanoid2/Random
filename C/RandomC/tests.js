let sum = 0;
let arr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
]
function first() {
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  console.log(sum);
}
////////////////////////////////////////////////////////////////////
let arr2 = [];
let num = 1;
let last; // Keep track of the last operation ("add" or "nothing")

function second() {
  for (let i = 0; i < 1000; i++) {
    let allow;
    if (i === 0) { // Only one cycle for the first iteration
      if (num === 1) {
        if (Math.random() < 0.5) {
          arr2.push("add");
          arr2.push(num);
          last = "add";
          allow = false;
        } else {
          arr2.push("nothing");
          arr2.push(num);
          last = "nothing";
          allow = true;
        }
        num = 2;
      } else if (num === 2) {
        if (allow === true) {
          arr2.push("add");
          arr2.push(num);
          last = "add";
        } else {
          arr2.push("nothing");
          arr2.push(num);
          last = "nothing";
        }
        num = 1;
      }
    } else {
      // For i >= 1, decide based on the current num
      if (num === 1) {
        if (Math.random() < 0.5) {
          arr2.push("add");
          arr2.push(num);
          last = "add";
          allow = false;
        } else {
          arr2.push("nothing");
          arr2.push(num);
          last = "nothing";
          allow = true;
        }
        num = 2;
      } else if (num === 2) {
        if (allow === true) {
          // Check lastOperation instead of arr2[i-1]
          if (last !== "add") {
            arr2.push("add");
            arr2.push(num);
            last = "add";
          } else {
            arr2.push("nothing");
            arr2.push(num);
            last = "nothing";
          }
        } else {
          if (last !== "nothing") {
            arr2.push("nothing");
            arr2.push(num);
            last = "nothing";
          } else {
            arr2.push("add");
            arr2.push(num);
            last = "add";
          }
        }
        num = 2;
      }
    }
  }

  //console.log(arr2);
  for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] === "add" && arr2[i + 2] === "add" && arr2[i + 1] === 1 && arr2[i + 3] === 2) {
      console.log(`2 "adds" detected, @: ${i} and ${i + 2}`);
    }
    if (arr2[i] === "nothing" && arr2[i + 2] === "nothing" && arr2[i + 1] === 1 && arr2[i + 3] === 2) {
      console.log(`2 "nothings" detected, @: ${i} and ${i + 2}`);
    }
  }
}

function third() {
  let i = 0;

  for (; i < 3;) {
    console.log(i++);
  }
}
function fourth() {
  let arr = ['<div id="b1"></div>',
    '<div id="b2"></div>',
    '<div id="b3"></div>',
    '<div id="b4"></div>',
    '<div id="b5"></div>',
    '<div id="b6"></div>',
    '<div id="b7"></div>',
    '<div id="b8"></div>',
    '<div id="b9"></div>',
    '<div id="b10"></div>',
    '<div id="b11"></div>',
    '<div id="b12"></div>',
    '<div id="b13"></div>',
    '<div id="b14"></div>',
    '<div id="b15"></div>',
    '<div id="b16"></div>'];
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace("b", "d");
  }
  console.log(arr);
}
function fifth() {
  let a = JSON.parse("\ud835\udddf\ud835\uddf2\u034e\ud835\uddee\u034e\ud835\uddf8\ud835\ude00\ud835\udfee\ud835\udff0");
  console.log(a);
}
function sixth() {
  for (let i = 1; i < 17; i += 2) {
    console.log(i);
  }
}
function seventh() {
  let on;
  let blueballs = [];
  blueballs.push("oriblueball1");
  blueballs.push("oriblueball2");
  blueballs.push("oriblueball3");
  blueballs.push("oriblueball4");
  blueballs.push("oriblueball5");
  blueballs.push("oriblueball6");
  blueballs.push("oriblueball7");
  blueballs.push("oriblueball8");
  blueballs.push("oritest");
  console.log(blueballs + "!");
  on = true;
  let a = 0;
  while (a < 5) {
    if (on === true) {
      blueballs.splice(blueballs.length - 1, 1);
      on = false;
      console.log(blueballs + "?");
    } else {
      console.log(2);
      blueballs.splice(8, 8);
      console.log(blueballs + "[]]");
      for (let i = 0; i < 8; i++) {
        blueballs.push("blueball" + `----${i + 101}`);
      }
    }
    a++;
    console.log(blueballs, a);
    if (a === 10) {
      break;
    }
  }
}
function eight() {
  let i = 0;
  console.log("test");
  while (i < 3) {
    setTimeout(() => {
      console.log("a");
    }, 4000)
    i++;
  }
}
function nine() {
  let check = (x) => x % 2 == 0 ? console.log('even') : console.log("odd");
  check(5);
}
/*let a = (x, y, $) => {
  x += (y / $ + y * $);
  y -= (x**2+$);
  x + y - $ >= 0 ? console.log(x + y || y - $) : console.log(x - y || y + $);
}*/

function ten(num) {
  let x = num;
  let sqsize = 25;

  if (x % sqsize !== 0) {
    let xCopy = x;
    x = x.toString();
    if (x.length == 3) {
      x = x.slice(1);
    } else if (x.length == 4) {
      x = x.slice(2);
    }
    let diff = sqsize - (+x);
    xCopy += diff;
    console.log(xCopy);
  } else {
    console.log(x % sqsize);
  }
}

function eleven() {
  let arr = [];
  let arr2 = [];
  for (let i = 0; i < 100; i++) {
    let a = Math.random();
    if (a < 0.1) {
      console.log(a + "---------------------");
      arr2.push(2);
    } else {
      console.log(a)
      arr.push(1);
    }

  }
  console.log("--" + +arr.length / +arr2.length + "--");
}

//first();
//second();
//third();
//fourth();
//fifth();
//sixth();
//seventh();
//eight();
//nine();
//a(2,4,-2)
//ten(736);
//eleven();

let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 10;

console.log(user[id]);

let nums = { 1: "a", 2: "b", 3: "c" };
for (let i = 1; i <= Object.keys(nums).length; i++) {
  console.log(nums[i]);
}
