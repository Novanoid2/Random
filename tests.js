
let sum = 0;
let arr = [
    1,
    2,
    3,
    4,
    5,
    6,
    7
]
function first(){
for(let i = 0; i < arr.length; i++){
   sum += arr[i];
}
console.log(sum);
}
////////////////////////////////////////////////////////////////////
let arr2 = [];
let num = 1;
let last; // Keep track of the last operation ("add" or "nothing")

function second(){
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
      num = 1;
    }
  }
}

//console.log(arr2);
for(let i = 0; i < arr2.length; i++){
  if(arr2[i] === "add" && arr2[i+2] === "add" && arr2[i+1] === 1 && arr2[i+3] === 2){
     console.log(`2 "adds" detected, @: ${i} and ${i+2}`);
  }
  if(arr2[i] === "nothing" && arr2[i+2] === "nothing" && arr2[i+1] === 1 && arr2[i+3] === 2){
    console.log(`2 "nothings" detected, @: ${i} and ${i+2}`);
 }
}
}
second();