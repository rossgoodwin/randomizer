
var names = ["Will", "Matt G", "Matt R", "Maria", "Dalit", "Minju", "Louis", "Jingwen", "Melissa", "Ross", "Kat", "Pat", "Yining"];

var divs = [];

var canvas;
var w;

var button;

var angle;
var dangle = 0;

var sz = 0;
var total = 0;

function setup() {

  canvas = createCanvas(windowWidth,windowHeight);
  w = windowHeight-200;
  canvas.position(0,0);

  button = createButton("spin the wheel");
  button.id('spin');
  button.position(windowWidth/8 - button.elt.clientWidth/2, windowHeight/2 - button.elt.clientHeight/2);
  button.mousePressed(spin);

  total = names.length;
  sz = TWO_PI / total;
  
  angle = random(TWO_PI);

  var theta = 0;
  for (var i = 0; i < names.length; i++) {
    divs[i] = createDiv(names[i]);
    divs[i].style("color","#FFFFFF");
    divs[i].style("padding","10px");
    divs[i].style("display","inline-block");
    var cx = windowWidth/2;
    var cy = windowHeight/2;
    var r = w/2 + 50;
    var x = cx + r * cos(theta) - divs[i].elt.clientWidth/2;
    var y = cy + r * sin(theta) - divs[i].elt.clientHeight/2;
    console.log(x, y);
    divs[i].position(x,y);
    theta += sz;
  }



}

function draw() {
  if (angle < 0) {
    angle += TWO_PI;
  }

  background(0);
  strokeWeight(8);
  stroke(255);
  fill(190);
  translate(width/2, height/2);
  ellipse(0, 0, w, w);

  for (var i = 0; i < total; i++) {
    push();
    if (i % 2 == 0) fill(175);
    else fill(75);
    var testAngle = angle-sz/2;

    var begin = (i);
    var end = (i+1);
    
    var which = (i+1)%total;
    if ((testAngle >= begin*sz && testAngle < end*sz) || (testAngle < 0 && i == total-1)) {
      fill(0, 255, 0, 127);
      divs[which].style("background-color","#FFFFFF");
      divs[which].style("color","#000000");
    } else {
      divs[which].style("background-color","#000000");
      divs[(i+1) % total].style("color","#FFFFFF");
    }

    rotate(sz*i+sz/2);
    noStroke();
    arc(0, 0, w, w, 0, sz);
    pop();
  }
  for (var i = 0; i < total; i++) {
    push();
    strokeWeight(2);
    stroke(255, 100);
    rotate(sz*i+sz/2);
    line(0, 0, w/2, 0);
    pop();
  }
  rotate(angle);

  
  strokeWeight(8);
  stroke(255);
  line(-0.35*w, 0, 0.35*w, 0);
  
  fill(255);
  triangle(0.35*w, 0, 0.35*w - 24, -12, 0.35*w - 24, +12);
  rect(-0.35*w, -6, 12,12);
  ellipse(0,0,12,12);

  angle += dangle;
  dangle *= 0.99;
  if (dangle < 0.001) dangle = 0;
  if (angle > TWO_PI) {
    angle -= TWO_PI;
  }
}

function spin() {
  var force = random(0.4,0.4);
  dangle += force;
}