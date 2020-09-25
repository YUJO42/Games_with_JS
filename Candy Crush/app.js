document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const width = 8;
  const squares = [];

  const candyColors = ['red', 'yellow', 'orange', 'purple', 'green', 'blue'];

  // Create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('draggable', true);
      square.setAttribute('id', i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }

  // Call Function
  createBoard();

  // Drag the candies

  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener('dragstart', dragStart));
  squares.forEach((square) => square.addEventListener('dragend', dragEnd));
  squares.forEach((square) => square.addEventListener('dragover', dragOver));
  squares.forEach((square) => square.addEventListener('dragenter', dragEnter));
  squares.forEach((square) => square.addEventListener('dragleave', dragLeave));
  squares.forEach((square) => square.addEventListener('drop', dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged);
    console.log(this.id, 'dragstart');
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, 'over');
  }

  function dragEnd(e) {
    console.log(this.id, 'end');
    let validMoves = [
      squareIdBeingDragged - 1, // left move
      squareIdBeingDragged + 1, // right move
      squareIdBeingDragged + width, // up move
      squareIdBeingDragged - width, // down move
    ];

    let validmove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validmove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validmove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, 'enter');
  }
  function dragLeave() {
    console.log(this.id, 'leave');
  }
  function dragDrop() {
    console.log(this.id, 'drop');
    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
  }

  // Checking for matches
  // check for row of Three

  //
});
