const canvasW = 512;
const canvasH = 512;

let gameStarted = false;
let gameOver = false;
let startButtonTarget;

let targetList;
let player;
let timer;
let bestScore = Infinity;

const precision = 3;

function resetGame() {
  targetList = new TargetList(10);
  timer = new Timer();
}


function setup() {
  createCanvas(canvasW, canvasH);
  player = new Player(10);
  startButtonTarget = new Target(width / 2, height / 2, 100, 200);
}


function draw() {
  background(10);

  if (gameStarted) {
    targetList.draw();
    timer.draw();
    if (targetList.gameOver) {
      gameOver = true
      gameStarted = false;
      startButtonTarget = new Target(width / 2, height / 2, 100, 200);
      if (timer.elapsed < bestScore) {
        bestScore = timer.elapsed
      }
    }
  } else {
    textSize(20);
    textAlign(CENTER);
    text(
      'Click circle to start.\nClick circles in order (• -> o -> O) of size to win.',
      width / 2,
      80
    );

    if (bestScore < Infinity) {
      text(
        `Best: ${bestScore.toFixed(precision)}`,
        width / 2,
        420
      )
    }
    startButtonTarget.draw();
  }

  player.draw();
}


function mouseClicked() {
  if (gameStarted) {
    targetList.checkHit(player.x, player.y, player.radius);
  } else {
    startButtonTarget.isOverlapping(player.x, player.y, player.radius);

    if (startButtonTarget.isHit) {
      gameStarted = true;
      resetGame();
    }
  }
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

  get gameOver() {
    for (const target of this.targets) {
      if (!target.isHit) {
        return false;
      }
    }
    return true
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
    textAlign(LEFT)
    stroke(200, 100, 30)
    fill(200, 100, 30)
    text(this.elapsed.toFixed(precision), 10, 20)
  }

}
