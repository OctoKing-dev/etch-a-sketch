const newGridButton = document.getElementById('newGridButton');
const squareContainer = document.getElementById('squareContainer');

// Get a new, 10% darker random color based off the previous.
function getRandomPassThroughColor(color) {
  const [r,g,b] = color.match(/[\d.]+/g).map(Number); // Break it up into r, g, b with float support
  let maxValue = Math.max(r, g, b) * 0.9 + 1; // Get the highest value to use as the "ceiling", darken it by 10%, and add 1 for Math.random
  if (maxValue < 26) maxValue = 0; // Should never take more than 10 passes to become black
  return getRandomColor(maxValue, maxValue, maxValue); // Add 1 for Math.random
}

function squareHovered() {
  // Generate a random color if this is the first time it's been selected.
  if (!this.style.backgroundColor) this.style.backgroundColor = getRandomColor();
  // Generate a new, darker color on every pass-through.
  else if (this.style.backgroundColor !== 'rgb(0, 0, 0)') this.style.backgroundColor = getRandomPassThroughColor(this.style.backgroundColor);
}

// Generate random color with given max values.
function getRandomColor(maxR, maxG, maxB) {
  let r = Math.floor(Math.random() * (maxR ?? 256)),
      g = Math.floor(Math.random() * (maxG ?? 256)),
      b = Math.floor(Math.random() * (maxB ?? 256));
  return `rgb(${r}, ${g}, ${b})`;
}

// Create a square grid of size x size.
function createNewGrid(size) {
  if (!Number.isInteger(size)) return;
  squareContainer.replaceChildren();

  const squareEle = document.createElement('div');
  squareEle.className = 'square';

  for (let row = 1; row <= size; row++) {
    const rowEle = document.createElement('div');
    rowEle.className = 'square-row';

    for (let column = 1; column <= size; column++) {
      const newSquare = squareEle.cloneNode();
      newSquare.addEventListener('mouseenter', squareHovered);
      rowEle.appendChild(newSquare);
    }

    squareContainer.appendChild(rowEle);
  }
}

function promptNewGrid() {
  let newGridSize;
  do {
    newGridSize = Number.parseInt(prompt("Please enter new grid size: (1 - 100)"));
    if (Number.isNaN(newGridSize) || newGridSize < 1 || newGridSize > 100) newGridSize = null;
  } while (!newGridSize);

  createNewGrid(newGridSize);
}

newGridButton.addEventListener('click', promptNewGrid);

// Start with a 16x16 grid.
createNewGrid(16);
