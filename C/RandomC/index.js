let fill;
let number;

function buttonPressed(){
    fill = window.prompt('Uhhhh test fajny nie wiem', "Wpisz coś tu.");
    document.getElementById("info").value = fill;
}
function button2Pressed(){
    console.log(number);
    alert("Zaraz wygenerujesz randomowa liczbę");
    number = Math.trunc((Math.random() * (Math.random()*10)));
    document.getElementById("info").value = number;
}
/*let numb = 0;
let log = 1;
let button;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    background("white");
    console.log("test2")
}
console.log("test1")
function draw(){
    console.log("test3")
   if(log = 1){
    console.log(numb)
    log = 0;
   }
  text(numb, 100,100);


}
function mouseClicked(){
    console.log("test69")
    window.prompt("Are you sure?")
   a = random(min,max);
   numb = Math.trunc(a);
   log = 1;
}   
/*var balls = [];
function setup(){
   createCanvas(windowWidth, windowHeight);
}
function1 draw(){
    background
    for(let i = 0; i < balls.length; i++){
        balls[i].show();
    //    balls.collide();
        balls[i].edges();
    }
}
class b{
    constructor(x,y,v){
        this.p = createVector(random(-3,3), random(-3,3));
        this.vel = v;
        this.s = random(20,60);
    }
    show(){
        ellipse(mouseX, mouseY, this.s);
    }
    edges(){
        this.p.add(this.vel);
        if(
            this.p.x + this.s >= windowWidth ||  this.p.x - this.s <= 0){
                this.vel.x *= -1;
            }
        if(
            this.p.y + this.s >= windowHeight ||  this.p.y - this.s <= 0){
                this.vel.y *= -1;
            }
    }
}
function mouseClicked(){
    v = createVector(random(-3,3), random(-3,3));
    v = v.normalize();
    if(this.vel.x <= 0.4 && this.vel.x >= -0.4){
        this.vel.x *= random(2,3);
    }
    if(this.vel.y <= 0.4 && this.vel.y >= -0.4){
        this.vel.y *= random(2,3);
    }
    balls.push(new b(mouseX,mouseY,v));
}
    */