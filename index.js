const newGridButton = document.getElementById('newGridButton');
const squareContainer = document.getElementById('squareContainer');

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
      rowEle.appendChild(newSquare);
    }
    squareContainer.appendChild(rowEle);
  }
}

// Start with a 16x16 grid.
createNewGrid(16);
