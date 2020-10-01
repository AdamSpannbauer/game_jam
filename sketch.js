const canvas_w = 512;
const canvas_h = 512;

let targetList;


function setup() {
  createCanvas(canvas_w, canvas_h);
  targetList = new TargetList(10);
}


function draw() {
  background(10);
  targetList.draw();
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


class TargetList {
  constructor(n) {
    this.minRadius = 10;
    this.maxRadius = 40;
    this.targets = []
    for (let i = 0; i < n; i++) {
      const r = map(i, 0, n - 1, this.minRadius, this.maxRadius)

      const target = new Target(
        random() * width,
        random() * height,
        r,
        random(100, 255)
      );
      this.targets.push(target)
    }
  }

  draw() {
    for (let target of this.targets) {
      target.draw();
    }
  }

  checkHit(x, y, radius) {
    for (let target of this.targets) {
      target.is_overlapping(x, y, radius)
    }
  }
}