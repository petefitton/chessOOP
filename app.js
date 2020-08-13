// NOTES FOR WHAT I WAS JUST WORKING ON:

// need to create id's for each square
// each chesspiece image tag also needs an id
// these id's are separate things
// places to update code are gameState object methods and instantiation of piece objects
// plus Gameboard object for square id's





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



function Piece() {
  this.alive = true;
}

function Pawn(color, location, pieceId) {
  Piece.call(this);
  // movement changes boolean value
  this.hasMoved = false;
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.moves = [/* info about one square forward or if firstMove can move two */];
  this.attack = [/* info about side-ways attack */];
  if (this.color === "black") {
    this.img_src = "./assets/Chess_pdt60.png";
    this.image = document.createElement('img');
    this.image.src = this.img_src;
    this.image.classList.add('blackPiece')
    this.image.id = pieceId
  } else {
    this.img_src = "./assets/Chess_plt60.png";
    this.image = document.createElement('img');
    this.image.src = this.img_src;
    this.image.classList.add('whitePiece')
    this.image.id = pieceId
  }
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }(this.image, this.location)
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

let blackPawnOne = new Pawn("black", 8, 1);
let blackPawnTwo = new Pawn("black", 9, 2);
let blackPawnThree = new Pawn("black", 10, 3);
let blackPawnFour = new Pawn("black", 11, 4);
let blackPawnFive = new Pawn("black", 12, 5);
let blackPawnSix = new Pawn("black", 13, 6);
let blackPawnSeven = new Pawn("black", 14, 7);
let blackPawnEight = new Pawn("black", 15, 8);

let whitePawnOne = new Pawn("white", 48, 17);
let whitePawnTwo = new Pawn("white", 49, 18);
let whitePawnThree = new Pawn("white", 50, 19);
let whitePawnFour = new Pawn("white", 51, 20);
let whitePawnFive = new Pawn("white", 52, 21);
let whitePawnSix = new Pawn("white", 53, 22);
let whitePawnSeven = new Pawn("white", 54, 23);
let whitePawnEight = new Pawn("white", 55, 24);




function Rook(color, location) {
  Piece.call(this);
  this.color = color;
  this.location = location;
  // movement changes boolean value
  this.hasMoved = false;
  this.moves = [/* info about up/down & left/right */];
  this.attack = [/* capture is same as movement */];
  if (this.color === "black") {
    this.img_src = "./assets/Chess_rdt60.png";
  } else {
    this.img_src = "./assets/Chess_rlt60.png";
  }
  this.image = document.createElement('img');
  this.image.src = this.img_src;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }(this.image, this.location)
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

let blackRookOne = new Rook("black", 0);
let blackRookTwo = new Rook("black", 7);

let whiteRookOne = new Rook("white", 56);
let whiteRookTwo = new Rook("white", 63);




function Knight(color, location) {
  Piece.call(this);
  this.color = color;
  this.location = location;
  this.moves = [/* info about 2x1 movement (staying on board) */];
  this.attack = [/* capture is same as movement */];
  if (this.color === "black") {
    this.img_src = "./assets/Chess_ndt60.png";
  } else {
    this.img_src = "./assets/Chess_nlt60.png";
  }
  this.image = document.createElement('img');
  this.image.src = this.img_src;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }(this.image, this.location)
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

let blackKnightOne = new Knight("black", 1);
let blackKnightTwo = new Knight("black", 6);

let whiteKnightOne = new Knight("white", 57);
let whiteKnightTwo = new Knight("white", 62);





function Bishop(color, location) {
  Piece.call(this);
  this.color = color;
  this.location = location;
  this.moves = [/* info about diagonals */];
  this.attack = [/* capture is same as movement */];
  if (this.color === "black") {
    this.img_src = "./assets/Chess_bdt60.png";
  } else {
    this.img_src = "./assets/Chess_blt60.png";
  }
  this.image = document.createElement('img');
  this.image.src = this.img_src;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }(this.image, this.location)
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

let blackBishopOne = new Bishop("black", 2);
let blackBishopTwo = new Bishop("black", 5);

let whiteBishopOne = new Bishop("white", 58);
let whiteBishopTwo = new Bishop("white", 61);





function King(color, location) {
  Piece.call(this);
  this.color = color;
  this.location = location;
  // castling
  // movement changes boolean value
  this.hasMoved = false;
  this.moves = [/* info about all four directions */];
  this.attack = [/* capture is same as movement */];
  // cannot move into check
  if (this.color === "black") {
    this.img_src = "./assets/Chess_kdt60.png";
  } else {
    this.img_src = "./assets/Chess_klt60.png";
  }
  this.image = document.createElement('img');
  this.image.src = this.img_src;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }(this.image, this.location)
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

let blackKingOne = new King("black", 4);

let whiteKingOne = new King("white", 60);




function Queen(color, location) {
  Piece.call(this);
  this.color = color;
  this.location = location;
  this.moves = [/* info about up/down & left/right */];
  this.attack = [/* capture is same as movement */];
  if (this.color === "black") {
    this.img_src = "./assets/Chess_qdt60.png";
  } else {
    this.img_src = "./assets/Chess_qlt60.png";
  }
  this.image = document.createElement('img');
  this.image.src = this.img_src;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }(this.image, this.location)
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

let blackQueenOne = new Queen("black", 3);

let whiteQueenOne = new Queen("white", 59);









// will need gameState Object 
// handle turns
// game board?
// event listeners adding and removing based on whose turn and which part of turn (piece selection and then movement)
// need to prevent movement when one's own King would be in check afterwards

// special considerations:
// en passant
// castling
// pawn first movement
// black pawn vs white pawn direction


function GameState() {
  this.isWhiteTurn = true;
  this.selectedPiece = null;

  this.firstPartTurn = function() {
    if (gameState.isWhiteTurn) { 
      let playablePieces = document.querySelectorAll('.whitePiece');
      playablePieces.forEach(piece => {
        piece.addEventListener('click', callbackerooni);
      })
    } else {
      let playablePieces = document.querySelectorAll('.blackPiece');
      playablePieces.forEach(piece => {
        piece.addEventListener('click', callbackerooni);
      })
    }
    function callbackerooni(e) {
      let playablePieces
      if (gameState.isWhiteTurn) { 
        playablePieces = document.querySelectorAll('.whitePiece');
      } else {
        playablePieces = document.querySelectorAll('.blackPiece');
      }
      console.log(playablePieces)
      playablePieces.forEach(piece => {
        piece.removeEventListener('click', callbackerooni);
      })
      gameState.selectedPiece = e.target;
      console.log(gameState.selectedPiece)
      return gameState.secondPartTurn()
    }
  }

  this.secondPartTurn = function() {
    console.log(this.selectedPiece)
    // handle movement
    // add event listener to every square that selectedPiece can move to
    // each piece is an object that has information regarding where it can move/capture



    // first test simple scenario
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      square.addEventListener('click', callerbacker);
    })
    function callerbacker(e) {
      let squares = document.querySelectorAll('.square');
      squares.forEach(square => {
        square.removeEventListener('click', callerbacker);
      })
      // let selectedSquare = e.target;
      // gameState.selectedPiece is the image tag associated with the selectedPiece object
      // need to grab object from image
      // give each image tag a unique chess piece id and then I will be able to easily go from one to the other
      gameState.selectedPiece.id = e.target.id;
      gameState.selectedPiece.render();
      return gameState.firstPartTurn()
    }
  }
}

let gameState = new GameState();



gameState.firstPartTurn();
