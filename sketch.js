const canvasW = 512;
const canvasH = 512;

let targetList;
let player;
let timer;

function setup() {
  createCanvas(canvasW, canvasH);
  targetList = new TargetList(10);
  player = new Player(10);
  timer = new Timer();
}


function draw() {
  background(10);
  targetList.draw();
  player.draw();
  timer.draw();
}


function mouseClicked() {
  targetList.checkHit(player.x, player.y, player.radius);
}


class Player {
  constructor(radius) {
    this.radius = radius;
  }

  get x() {
    return mouseX;
  }

  get y() {
    return mouseY;
  }

  draw() {
    fill(200, 100, 30);
    ellipse(mouseX, mouseY, this.radius * 2, this.radius * 2);
  }
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
      const r = map(i, 0, n - 1, this.minRadius, this.maxRadius);

      const target = new Target(
        random(r, width - r),
        random(r, height - r),
        r,
        random(100, 255)
      );
      this.targets.push(target);
    }
  }

  draw() {
    for (let target of this.targets) {
      target.draw();
    }
  }

  checkHit(x, y, radius) {
    for (let target of this.targets) {
      target.isOverlapping(x, y, radius);
    }
  }
}

class Timer {
  constructor() {
    this.start = Date.now()
  }

  get elapsed() {
    const millis = Date.now() - this.start
    return millis / 1000
  }

  draw() {
    textSize(20)
    text(this.elapsed.toFixed(2), 10, 20)
  }

}
