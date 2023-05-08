const newGridButton = document.getElementById('newGridButton');
const squareContainer = document.getElementById('squareContainer');

function squareHovered() {
  // Generate a random color if this is the first time it's been selected.
  if (!this.style.backgroundColor) this.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
  let r = Math.floor(Math.random() * 256),
      g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256);
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
