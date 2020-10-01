const canvas_w = 512;
const canvas_h = 512;

let target;


function setup() {
  createCanvas(canvas_w, canvas_h);
  target = new Target(width / 2, height / 2, 50, [200, 100, 30]);
}


function draw() {
  background(200);
  target.draw();
}


class Target {
	constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.order_id = null;
    this.is_hit = false;
  }

  is_overlapping(x, y, radius) {
    const d = dist(x, y, this.x, this.y);
    if (d < radius + this.radius) {
      this.is_hit = true;
    }
  }

  draw() {
    if (!this.is_hit) {
      fill(this.color);
      noStroke();
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  }
}
