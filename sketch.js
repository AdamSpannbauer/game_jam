let canvasW = 512;
let canvasH = 512;

let gameStarted = false;
let gameOver = false;
let startButtonTarget;

let targetList;
let player;
let timer;

let easyBestScore = Infinity;
let mediumBestScore = Infinity;
let hardBestScore = Infinity;
let difficulty;
let numberOfTargets;

const precision = 3;

function resetGame() {

  if (difficulty === 'Easy') {
    numberOfTargets = 10;
  } else if (difficulty === 'Medium') {
    numberOfTargets = 15;
  } else if (difficulty === 'Hard') {
    numberOfTargets = 20;
  }

  targetList = new TargetList(numberOfTargets);
  timer = new Timer();
}


function setup() {
  if (windowWidth < canvasW) {
    canvasW = windowWidth;
  }
  if (windowHeight < canvasH) {
    canvasH = windowHeight;
  }

  createCanvas(canvasW, canvasH);
  player = new Player(10);
  startButtonEasy = new Target(width / 4, height / 2, 50, 200);
  startButtonMedium = new Target(width / 2, height / 2, 50, 200);
  startButtonHard = new Target(width - width / 4, height / 2, 50, 200);
}


function draw() {
  background(10);

  if (gameStarted) {
    targetList.draw();
    timer.draw();
    if (targetList.gameOver) {
      gameOver = true
      gameStarted = false;
      startButtonEasy = new Target(width / 4, height / 2, 50, 200);
      startButtonMedium = new Target(width / 2, height / 2, 50, 200);
      startButtonHard = new Target(width - width / 4, height / 2, 50, 200);
      if (timer.elapsed < easyBestScore && difficulty === 'Easy') {
        easyBestScore = timer.elapsed
      }
      if (timer.elapsed < mediumBestScore && difficulty === 'Medium') {
        mediumBestScore = timer.elapsed
      }
      if (timer.elapsed < hardBestScore && difficulty === 'Hard') {
        hardBestScore = timer.elapsed
      }
    }
  } else {
    textSize(20);
    textAlign(CENTER);
    text(
      'Choose difficulty.\nClick circles in order (• -> o -> O) of size to win.',
      width / 2,
      80
    );

    if (easyBestScore < Infinity) {
      text(
        ` Easy: ${easyBestScore.toFixed(precision)}`,
        width / 2,
        380
      )
    }
    if (mediumBestScore < Infinity) {
      text(
        `Medium: ${mediumBestScore.toFixed(precision)}`,
        width / 2,
        420
      )
    }
    if (hardBestScore < Infinity) {
      text(
        `Hard: ${hardBestScore.toFixed(precision)}`,
        width / 2,
        460
      )
    }
    startButtonEasy.draw();
    startButtonMedium.draw();
    startButtonHard.draw();
    fill(200, 100, 30);
    noStroke();
    text(
      'Easy',
      width / 4,
      height / 2
    );
    text(
      'Medium',
      width / 2,
      height / 2
    );
    text(
      'Hard',
      width - width / 4,
      height / 2
    );

  }

  player.draw();
}


function mouseClicked() {
  if (gameStarted) {
    targetList.checkHit(player.x, player.y, player.radius);
  } else {
    startButtonEasy.isOverlapping(player.x, player.y, player.radius);
    startButtonMedium.isOverlapping(player.x, player.y, player.radius);
    startButtonHard.isOverlapping(player.x, player.y, player.radius);

    if (startButtonEasy.isHit) {
      difficulty = 'Easy';
    } else if (startButtonMedium.isHit) {
      difficulty = 'Medium';
    } else if (startButtonHard.isHit) {
      difficulty = 'Hard';
    }

    if (startButtonEasy.isHit || startButtonMedium.isHit || startButtonHard.isHit) {
      gameStarted = true;
      resetGame();
    }
  }
}

function touchStarted() {
  mouseClicked();
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
    noStroke();
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

    return this.isHit;
  }

  draw() {
    if (!this.isHit) {
      fill(this.color);
      stroke(0);
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  }
}


class TargetList {
  constructor(n) {
    this.minRadius = 10;
    this.maxRadius = 40;
    this.targets = [];

    for (let i = 0; i < n; i++) {
      const r = map(i, 0, n - 1, this.maxRadius, this.minRadius);

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
    const smallestTarget = this.targets[this.targets.length - 1]
    const isHit = smallestTarget.isOverlapping(x, y, radius);
    if (isHit) {
      this.targets.pop();
    }
  }

  get gameOver() {
    return this.targets.length == 0;
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
