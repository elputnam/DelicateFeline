let swarm = [];
let num;
let tileCount;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  num = height*.5;
  frameRate(10);
  tileCount = height*0.07;
  background(0, 100, 20);
  for (let i = 0; i < num; i++) {
    swarm.push(new Pixel());
  }
}

function draw() {
  //background(0);

  //grid
  push();
  translate(random(-width), random(-height));
  grid();
  pop();
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.001);
  rotateZ(frameCount * 0.001);
  // let big = map(mouseX, 0, width, 1, 0.1);
  // scale(big);
   scale(0.7);
  //scale(random(0.7));
  //if (frameCount%20==0){
  for(let i=0; i < swarm.length; i++){
    swarm[i].run();
  }
  //}
}

function grid(){
  for (let gridY = 0; gridY <tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      let posX = (width / tileCount) * gridX;
      let posY = (height / tileCount) * gridY;
      noStroke();
      rect(posX, posY, width/tileCount, height/tileCount);
      let toggle = floor(random(1, 5));
      if (toggle == 1){
        stroke(0);
        fill(0, 100, random(100), random(100));
      } else {
        fill(0);
      }
    }
  }
}

class Pixel{
  constructor(){
    // this.loc = createVector(0, 0, 0);
    this.angle = createVector();
    this.vel = createVector(0, 0, 0);
    this.amp = createVector(random(20, width/2), random(20, height/2), random(20, height/2));
    this.rad = random(height*0.1);
    this.ts = random(5);
    this.color = random(150,200);
    this.sat = random(100);
    this.lum = random(100);
    this.alpha = 100;
  }

  run(){
    this.update();
    this.display();
  }
  
  update(){
    // this.a = p5.Vector.random3D();
    // this.a.mult(random(3));
    // this.vel.add(this.a);
    // this.vel.limit(this.ts);
    // this.loc.add(this.vel);
    this.accel = createVector(random(-0.01, 0.01), random(-0.01, 0.01), random(-0.01, 0.01));
    this.vel.add(this.accel);
    this.angle.add(this.vel);
  }
  
  display(){
    let x = sin(this.angle.x) * this.amp.x;
    let y = sin(this.angle.y) * this.amp.y;
    let z = sin(this.angle.z) * this.amp.z;
    push();
    fill(this.color, this.sat, this.lum);
    // noStroke();
    strokeWeight(5);
    // translate(this.loc);
    translate(x, y, z);
    box(this.rad);
    pop();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}