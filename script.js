const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const bg = new Image();
bg.src = "background.jpg";

const hill = new Image();
hill.src = "hill.png";

const car = new Image();
car.src = "car.png";

// Game variables
let hillX = 0;
let carY = canvas.height - 150;
let jump = false;
let jumpHeight = 0;

// Listen for jump
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !jump) {
    jump = true;
    jumpHeight = 0;
  }
});
function update() {
  // Move background
  hillX -= 5;
  if (hillX <= -canvas.width) {
    hillX = 0;
  }

  // Handle jumping
  if (jump) {
    if (jumpHeight < 100) {
      carY -= 5;
      jumpHeight += 5;
    } else if (jumpHeight < 200) {
      carY += 5;
      jumpHeight += 5;
    } else {
      jump = false;
      jumpHeight = 0;
    }
  }

  draw();
  requestAnimationFrame(update);
}

function draw() {
  // Draw background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Draw scrolling hill
  ctx.drawImage(hill, hillX, canvas.height - 100, canvas.width, 100);
  ctx.drawImage(hill, hillX + canvas.width, canvas.height - 100, canvas.width, 100);

  // Draw car
  ctx.drawImage(car, 100, carY, 100, 50);
}

// Start game
bg.onload = () => {
  update();
};
