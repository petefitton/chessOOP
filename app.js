





// use OOP to create gameboard

function Gameboard() {
  this.gameboard = [];

  let row = 1;
  for (i=0; i<64; i++) {
    this.gameboard.push(i);
    let square = document.createElement('div');
    square.classList.add('square');
    square.id = i;
    if (i%2 === 0) {
      if (row%2 != 0) {
        square.classList.add('white');
      } else {
        square.classList.add('black');
      }
    } else {
      if (row%2 != 0) {
        square.classList.add('black');
      } else {
        square.classList.add('white');
      }
    }
    document.querySelector('.gameboard').appendChild(square);
    if (i===(row*8-1)) {
      row++;
    }
  }
}

let gameboard = new Gameboard();















// A pawn will need the following:
// color, movement patterns, attack patterns, firstMove boolean for movement pattern purposes
// movement handling, attack handling, checks for moving/attacking that prevent King from becoming in check
// alive boolean (for all pieces) - handling for deletion when dead
// current location
// image src, will need to render


// need to handle capturing - maybe I can put on Piece constructor?


// will need gameState Object 
// handle turns
// game board?
// event listeners adding and removing based on whose turn and which part of turn (piece selection and then movement)


function Piece() {
  this.alive = true;
}

function Pawn(color, location) {
  Piece.call(this);
  this.firstMove = true;
  this.color = color;
  this.location = location;
  this.moves = [/* info about one square forward or if firstMove can move two */];
  this.attack = [/* info about side-ways attack */];
  if (this.color === "black") {
    this.img_src = "./assets/Chess_pdt60.png"
  } else {
    this.img_src = "./assets/Chess_plt60.png"
  }
  this.image = document.createElement('img')
  this.image.src = this.img_src
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode)
  }(this.image, this.location)
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

let blackPawnOne = new Pawn("black", 1);
let blackPawnTwo = new Pawn("black", 2);
let blackPawnThree = new Pawn("black", 3);
let blackPawnFour = new Pawn("black", 4);
let blackPawnFive = new Pawn("black", 5);
let blackPawnSix = new Pawn("black", 6);
let blackPawnSeven = new Pawn("black", 7);
let blackPawnEight = new Pawn("black", 63);






