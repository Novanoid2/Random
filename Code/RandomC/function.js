/*let name = function(){
    console.log("func");
}
console.log(name);
name();


let ask = (q, y, n) => (confirm(q) ? y() : n());

ask(
    "test?",
    () => console.log("yes"),
    () => console.log("no")
);



function pow(x, n) {
    let result = 1;
    for (let i = 0; i < n; i++) result *= x;
    return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n <= 0) {
    alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
} else {
    alert(pow(x, n))
}


let user = {
    name: "john",
    surname: "smith",

}
user.name = "Pete";
delete user.name;
//////////////////////////
function isEmpty(obj) {
    for (let key in obj) {
        return true;
    }
    return false;
}
//////////////////////////
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
let sum = 0;
for (let key in salaries) {
    sum += salaries[key];
    console.log(+sum);
}
///////////////////////////////////
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

function multiplyNumeric(obj) {
    for (let key in obj) {
        typeof obj[key] === "number" ? obj[key] *= 2 : null;
    }
}

let calculator = {
    read() {
        this.a = 5;
        this.b = 3;
    },
    sum(){
       return (this.a + this.b);
    },
    mul(){
        return (this.a * this.b);
    }
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());
*/
/*
function Calculator() {
    this.read = function () {
        this.a = 5;
        this.b = 3;
    },
        this.sum = function () {
            return this.a + this.b;
        },
        this.mul = function () {
            return this.a * this.b
        }
}

let calculator = new Calculator();
calculator.read();

console.log("Sum=" + calculator.sum());
console.log("Mul=" + calculator.mul());
*/
/*
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function () {
       //let a = prompt("add number", "1");
       //this.value += a;
       let a = 5;
       this.value += a;
    }
}

let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

console.log(accumulator.value);
*/
/*
let arr = [{ info: { x: 5, y: 5 } }]
let arrC = structuredClone(arr)
console.lo  g(arr, arrC);
arrC[0].info.x = 10;
console.log(arr, arrC);
*/
const a = [
    { "results": "4,23,32,33,44,9,12" },
{ "results": "2,14,37,44,50,7,11" },
{ "results": "18,28,35,36,41,6,11" },

];
console.log(a);