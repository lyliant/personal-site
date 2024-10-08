let canvas;
let hearts = []; // Array to hold heart positions

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", -1); // Make sure canvas is behind content
  noLoop(); // Prevent draw from looping initially
  background(255); // Set a white background for contrast
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Clear the canvas with a transparent background
  clear(); // Clear the canvas before drawing hearts

  // Draw all hearts stored in the array
  for (let i = 0; i < hearts.length; i++) {
    drawHeart(hearts[i].x, hearts[i].y);
  }
}

function mouseMoved() {
  // Add a new heart position to the array when the mouse is moved
  hearts.push({ x: mouseX, y: mouseY });
  hearts.push({ x: mouseX - 50, y: mouseY + 75 }); // Add the offset heart

  // Redraw the hearts
  redraw(); // Redraw only when the mouse moves
}

function drawHeart(_x, _y) {
  strokeWeight(1); // Adjust stroke weight for visibility
  stroke(0, 50); // Set stroke color to black with low opacity

  // Generate pastel colors with low opacity
  fill(random(180, 255), random(200, 255), random(230, 255), 100); // Pastel colors with 100 alpha for transparency

  // Draw heart shape
  beginShape();
  vertex(_x, _y);
  bezierVertex(_x - 20, _y - 30, _x - 60, _y + 10, _x, _y + 40);
  bezierVertex(_x + 60, _y + 10, _x + 20, _y - 30, _x, _y);
  endShape(CLOSE);
}
