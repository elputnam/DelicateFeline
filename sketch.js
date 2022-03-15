let swarm = [];
let num;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  num = height*.5;
  // frameRate(15);
  background(0, 100, 20);
  for (let i = 0; i < num; i++) {
    swarm.push(new Pixel());
  }
}

function draw() {
  background(0, 100, 30);
  fill(100, 100, 100);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  // let big = map(mouseX, 0, width, 1, 0.1);
  // scale(big);
  scale(0.3);
  for(let i=0; i < swarm.length; i++){
    swarm[i].run();
  }
 
}

class Pixel{
  constructor(){
    this.loc = createVector(0, 0, 0);
    this.vel = createVector(0, 0, 0);
    this.rad = random(height*0.1);
    this.ts = random(5);
    this.color = random(150,200);
    this.sat = random(100);
    this.lum = random(100);
    this.alpha = random(100);
  }

  run(){
    this.update();
    this.display();
  }
  
  update(){
    this.a = p5.Vector.random3D();
    this.a.mult(random(3));
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
  }
  
  display(){
    push();
    fill(this.color, 100, 100, this.alpha);
    noStroke();
    // stroke(50);
    translate(this.loc);
    box(this.rad);
    pop();
  }
}