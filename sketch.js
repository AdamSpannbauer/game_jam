const canvasW = 512;
const canvasH = 512;

let targetList;


function setup() {
  createCanvas(canvasW, canvasH);
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
    this.orderId = null;
    this.isHit = false;
  }

  isOverlapping(x, y, radius) {
    const d = dist(x, y, this.x, this.y);
    if (d < radius + this.radius) {
      this.isHit = true;
    }
  }

  draw() {
    if (!this.isHit) {
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
      target.isOverlapping(x, y, radius)
    }
  }
}