// A pawn will need the following:
// color, movement patterns, attack patterns, firstMove boolean for movement pattern purposes
// movement handling, attack handling, checks for moving/attacking that prevent King from becoming in check
// alive boolean (for all pieces) - handling for deletion when dead
// current location
// image src, will need to render

// will need gameState Object 
// handle turns
// game board?


function Piece() {
  this.alive = true;
}

function Pawn(color) {
  Piece.call(this);
  this.firstMove = true;
  this.color = color
  this.moves = [/* info about one square forward or if firstMove can move two */];
  this.attack = [/* info about side-ways attack */];
  if (this.color === "black") {
    this.img_src = "Chess_pdt60.png"
  } else {
    this.img_src = "Chess_plt60.png"
  }
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

let blackPawnOne = new Pawn("black");
let blackPawnTwo = new Pawn("black");
let blackPawnThree = new Pawn("black");
let blackPawnFour = new Pawn("black");
let blackPawnFive = new Pawn("black");
let blackPawnSix = new Pawn("black");
let blackPawnSeven = new Pawn("black");
let blackPawnEight = new Pawn("black");






















// use OOP to create gameboard

function Gameboard() {
  this.gameboard = [];

  let row = 1;
  for (i=0; i<64; i++) {
    this.gameboard.push(i)
    let square = document.createElement('div')
    square.classList.add('square', `${i}`)
    if (i%2 === 0) {
      if (row%2 != 0) {
        square.classList.add('white')
      } else {
        square.classList.add('black')
      }
    } else {
      if (row%2 != 0) {
        square.classList.add('black')
      } else {
        square.classList.add('white')
      }
    }
    document.querySelector('.gameboard').appendChild(square)
    if (i===(row*8-1)) {
      row++
    }
  }
}

let gameboard = new Gameboard();
