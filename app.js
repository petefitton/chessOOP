// NOTES FOR WHAT I WAS JUST WORKING ON:

// Next TODOS

// check and checkmate
// castling
// en passant






// square id's are a8-h1
// each chesspiece image tag also needs an id
  // pawn OBJECT & IMG tag id's are 109-124 (9-24 with 1 at beginning)



// gameboard originally designed as a single array containing a set of squares between 0 through 64
// what about changing that to be an object with keys for a-g and arrays at each key from 0 through 7?
// how to handle logic for moves between letters? how can I subtract letters?
  // if letters are base 18 numbers then I can limit the calculations between a-g (inclusive of both)
  //convert from base 18 to a number:
  // parseInt(string, radix)
  //convert from that number to base 18
  // NumberObject.toString(radix)


// use OOP to create gameboard


function Gameboard() {
  this.gameboard = [];

  for (i=8; i>0; i--) {
    for (j=0; j<8; j++) {
      let k = (j+10).toString(18);
      if (!this.gameboard[k]) {
        this.gameboard[k] = [];
      }
      this.gameboard[k].push(i);
      let square = document.createElement('div');
      square.classList.add('square');
      square.id = `${k}${i}`;
      if (i%2 === 0) {
        if (j%2 === 0) {
          square.classList.add('white');
        } else {
          square.classList.add('black');
        }
      } else {
        if (j%2 === 0) {
          square.classList.add('black');
        } else {
          square.classList.add('white');
        }
      }
      document.querySelector('.gameboard').appendChild(square);
    }
  }
  for (array in this.gameboard) {
    this.gameboard[array].reverse();
  }

  this.isPositionLegal = function(position) {
    // is position parameter in octodecimal or decimal?
    // gonna make it come in as decimal so that isPositionLegal can easily check for moves that will be made
          // since that logic will require math on current position of piece
    // will position stay on a file between a1 & a8?
    if (position >= 181 && position <= 188) {
      return true;
    }
    // will position stay on b file between b1 & b8?
    if (position >= 199 && position <= 206) {
      return true;
    }
    // c
    if (position >= 217 && position <= 224) {
      return true;
    }
    // d
    if (position >= 235 && position <= 242) {
      return true;
    }
    // e
    if (position >= 253 && position <= 260) {
      return true;
    }
    // f
    if (position >= 271 && position <= 278) {
      return true;
    }
    // g
    if (position >= 289 && position <= 296) {
      return true;
    }
    // h
    if (position >= 307 && position <= 314) {
      return true;
    }
    return false;
  }
}

let gameboard = new Gameboard();
console.log(gameboard)


// LAST CHANGED GAMEBOARD TO BE STANDARD CONVENTION
// object with keys a-h, each containing an array as a value which contains [1,2,3...8]





let piecesArray = [];

let capturedPieces = [];


// A pawn will need the following:
// color, movement patterns, attack patterns, firstMove boolean for movement pattern purposes
// movement handling, attack handling, checks for moving/attacking that prevent King from becoming in check
// alive boolean (for all pieces) - handling for deletion when dead
// current location
// image src, will need to render


// need to handle capturing - maybe I can put on Piece constructor?

// handle pawn promotion



function Piece() {
  this.alive = true;
}

function Pawn(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "pawn"
  // movement changes boolean value
  this.hasMoved = false;
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.image = document.createElement('img');
  if (this.color === "black") {
    this.img_src = "./assets/Chess_pdt60.png";
    this.image.classList.add('blackPiece');
    this.moves = [(location)=>(parseInt(location, 18) - 1).toString(18), (location)=>(parseInt(location, 18) - 2).toString(18)];
    // black attack inverted relative to white attack for simplified capturing logic located in GameState.secondPartTurn
    this.attack = [(location)=>(parseInt(location, 18) - 1 + 18).toString(18), (location)=>(parseInt(location, 18) - 1 - 18).toString(18)];
  } else {
    this.img_src = "./assets/Chess_plt60.png";
    this.image.classList.add('whitePiece');
    this.moves = [(location)=>(parseInt(location, 18) + 1).toString(18), (location)=>(parseInt(location, 18) + 2).toString(18)];
    this.attack = [(location)=>(parseInt(location, 18) + 1 + 18).toString(18), (location)=>(parseInt(location, 18) + 1 - 18).toString(18)];
  }
  this.image.src = this.img_src;
  this.image.id = pieceId;
  this.render = function(imgNode, location) {
    console.log(location)
    console.log(document.getElementById(location))
    document.getElementById(location).appendChild(imgNode);
  }
  this.render(this.image, this.location);
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

let blackPawnOne = new Pawn("black", "a7", 109);
let blackPawnTwo = new Pawn("black", "b7", 110);
let blackPawnThree = new Pawn("black", "c7", 111);
let blackPawnFour = new Pawn("black", "d7", 112);
let blackPawnFive = new Pawn("black", "e7", 113);
let blackPawnSix = new Pawn("black", "f7", 114);
let blackPawnSeven = new Pawn("black", "g7", 115);
let blackPawnEight = new Pawn("black", "h7", 116);

let whitePawnOne = new Pawn("white", "a2", 117);
let whitePawnTwo = new Pawn("white", "b2", 118);
let whitePawnThree = new Pawn("white", "c2", 119);
let whitePawnFour = new Pawn("white", "d2", 120);
let whitePawnFive = new Pawn("white", "e2", 121);
let whitePawnSix = new Pawn("white", "f2", 122);
let whitePawnSeven = new Pawn("white", "g2", 123);
let whitePawnEight = new Pawn("white", "h2", 124);




function Rook(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "rook"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  // movement changes boolean value
  this.hasMoved = false;
  this.moves = [
    [
      (location)=>(parseInt(location, 18) - 1).toString(18),
      (location)=>(parseInt(location, 18) - 2).toString(18),
      (location)=>(parseInt(location, 18) - 3).toString(18),
      (location)=>(parseInt(location, 18) - 4).toString(18),
      (location)=>(parseInt(location, 18) - 5).toString(18),
      (location)=>(parseInt(location, 18) - 6).toString(18),
      (location)=>(parseInt(location, 18) - 7).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 1).toString(18),
      (location)=>(parseInt(location, 18) + 2).toString(18),
      (location)=>(parseInt(location, 18) + 3).toString(18),
      (location)=>(parseInt(location, 18) + 4).toString(18),
      (location)=>(parseInt(location, 18) + 5).toString(18),
      (location)=>(parseInt(location, 18) + 6).toString(18),
      (location)=>(parseInt(location, 18) + 7).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) - 18).toString(18),
      (location)=>(parseInt(location, 18) - (18*2)).toString(18),
      (location)=>(parseInt(location, 18) - (18*3)).toString(18),
      (location)=>(parseInt(location, 18) - (18*4)).toString(18),
      (location)=>(parseInt(location, 18) - (18*5)).toString(18),
      (location)=>(parseInt(location, 18) - (18*6)).toString(18),
      (location)=>(parseInt(location, 18) - (18*7)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 18).toString(18),
      (location)=>(parseInt(location, 18) + (18*2)).toString(18),
      (location)=>(parseInt(location, 18) + (18*3)).toString(18),
      (location)=>(parseInt(location, 18) + (18*4)).toString(18),
      (location)=>(parseInt(location, 18) + (18*5)).toString(18),
      (location)=>(parseInt(location, 18) + (18*6)).toString(18),
      (location)=>(parseInt(location, 18) + (18*7)).toString(18)
    ]
  ];
  // this.attack = [/* capture is same as movement */];
  this.image = document.createElement('img');
  if (this.color === "black") {
    this.img_src = "./assets/Chess_rdt60.png";
    this.image.classList.add('blackPiece');
  } else {
    this.img_src = "./assets/Chess_rlt60.png";
    this.image.classList.add('whitePiece');
  }
  this.image.src = this.img_src;
  this.image.id = pieceId;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }
  this.render(this.image, this.location)
}

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

let blackRookOne = new Rook("black", "a8", 101);
let blackRookTwo = new Rook("black", "h8", 108);

let whiteRookOne = new Rook("white", "a1", 125);
let whiteRookTwo = new Rook("white", "h1", 132);




function Knight(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "knight"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.moves = [
    [
      (location)=>(parseInt(location, 18) - 1 - (18 * 2)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) - 2 - 18).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) - 2 + 18).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) - 1 + (18 * 2)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 1 - (18 * 2)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 2 - 18).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 2 + 18).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 1 + (18 * 2)).toString(18)
    ],
  ]
  // this.attack = [/* capture is same as movement */];
  this.image = document.createElement('img');
  if (this.color === "black") {
    this.img_src = "./assets/Chess_ndt60.png";
    this.image.classList.add('blackPiece');
  } else {
    this.img_src = "./assets/Chess_nlt60.png";
    this.image.classList.add('whitePiece');
  }
  this.image.src = this.img_src;
  this.image.id = pieceId;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }
  this.render(this.image, this.location)
}

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

let blackKnightOne = new Knight("black", "b8", 102);
let blackKnightTwo = new Knight("black", "g8", 107);

let whiteKnightOne = new Knight("white", "b1", 126);
let whiteKnightTwo = new Knight("white", "g1", 131);





function Bishop(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "bishop"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.moves = [
  [
    (location)=>(parseInt(location, 18) + 1*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 2*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 3*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 4*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 5*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 6*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 7*(1 + 18)).toString(18)
  ],
  [
    (location)=>(parseInt(location, 18) - 1*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) - 2*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) - 3*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) - 4*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) - 5*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) - 6*(1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) - 7*(1 + 18)).toString(18)
  ],
  [
    (location)=>(parseInt(location, 18) + 1*(1 - 18)).toString(18),
    (location)=>(parseInt(location, 18) + 2*(1 - 18)).toString(18),
    (location)=>(parseInt(location, 18) + 3*(1 - 18)).toString(18),
    (location)=>(parseInt(location, 18) + 4*(1 - 18)).toString(18),
    (location)=>(parseInt(location, 18) + 5*(1 - 18)).toString(18),
    (location)=>(parseInt(location, 18) + 6*(1 - 18)).toString(18),
    (location)=>(parseInt(location, 18) + 7*(1 - 18)).toString(18)
  ],
  [
    (location)=>(parseInt(location, 18) + 1*(-1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 2*(-1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 3*(-1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 4*(-1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 5*(-1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 6*(-1 + 18)).toString(18),
    (location)=>(parseInt(location, 18) + 7*(-1 + 18)).toString(18)
  ]
]
  // this.attack = [/* capture is same as movement */];
  this.image = document.createElement('img');
  if (this.color === "black") {
    this.img_src = "./assets/Chess_bdt60.png";
    this.image.classList.add('blackPiece');
  } else {
    this.img_src = "./assets/Chess_blt60.png";
    this.image.classList.add('whitePiece');
  }
  this.image.src = this.img_src;
  this.image.id = pieceId;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }
  this.render(this.image, this.location)
}

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

let blackBishopOne = new Bishop("black", "c8", 103);
let blackBishopTwo = new Bishop("black", "f8", 106);

let whiteBishopOne = new Bishop("white", "c1", 127);
let whiteBishopTwo = new Bishop("white", "f1", 130);





function King(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "king"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  // castling
  // movement changes boolean value
  this.hasMoved = false;
  this.moves = [
    [
      (location)=>(parseInt(location, 18) - 1).toString(18),
    ],
    [
      (location)=>(parseInt(location, 18) + 1).toString(18),
    ],
    [
      (location)=>(parseInt(location, 18) - 18).toString(18),
    ],
    [
      (location)=>(parseInt(location, 18) + 18).toString(18),
    ],
    [
      (location)=>(parseInt(location, 18) + 1*(1 + 18)).toString(18),
    ],
    [
      (location)=>(parseInt(location, 18) - 1*(1 + 18)).toString(18),
    ],
    [
      (location)=>(parseInt(location, 18) + 1*(1 - 18)).toString(18),
    ],
    [
      (location)=>(parseInt(location, 18) + 1*(-1 + 18)).toString(18),
    ]
  ];
  // this.attack = [/* capture is same as movement */];
  // cannot move into check
  this.image = document.createElement('img');
  if (this.color === "black") {
    this.img_src = "./assets/Chess_kdt60.png";
    this.image.classList.add('blackPiece');
  } else {
    this.img_src = "./assets/Chess_klt60.png";
    this.image.classList.add('whitePiece');
  }
  this.image.src = this.img_src;
  this.image.id = pieceId;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }
  this.render(this.image, this.location)
}

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

let blackKingOne = new King("black", "e8", 105);

let whiteKingOne = new King("white", "e1", 129);




function Queen(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "queen"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.moves = [
    [
      (location)=>(parseInt(location, 18) - 1).toString(18),
      (location)=>(parseInt(location, 18) - 2).toString(18),
      (location)=>(parseInt(location, 18) - 3).toString(18),
      (location)=>(parseInt(location, 18) - 4).toString(18),
      (location)=>(parseInt(location, 18) - 5).toString(18),
      (location)=>(parseInt(location, 18) - 6).toString(18),
      (location)=>(parseInt(location, 18) - 7).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 1).toString(18),
      (location)=>(parseInt(location, 18) + 2).toString(18),
      (location)=>(parseInt(location, 18) + 3).toString(18),
      (location)=>(parseInt(location, 18) + 4).toString(18),
      (location)=>(parseInt(location, 18) + 5).toString(18),
      (location)=>(parseInt(location, 18) + 6).toString(18),
      (location)=>(parseInt(location, 18) + 7).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) - 18).toString(18),
      (location)=>(parseInt(location, 18) - (18*2)).toString(18),
      (location)=>(parseInt(location, 18) - (18*3)).toString(18),
      (location)=>(parseInt(location, 18) - (18*4)).toString(18),
      (location)=>(parseInt(location, 18) - (18*5)).toString(18),
      (location)=>(parseInt(location, 18) - (18*6)).toString(18),
      (location)=>(parseInt(location, 18) - (18*7)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 18).toString(18),
      (location)=>(parseInt(location, 18) + (18*2)).toString(18),
      (location)=>(parseInt(location, 18) + (18*3)).toString(18),
      (location)=>(parseInt(location, 18) + (18*4)).toString(18),
      (location)=>(parseInt(location, 18) + (18*5)).toString(18),
      (location)=>(parseInt(location, 18) + (18*6)).toString(18),
      (location)=>(parseInt(location, 18) + (18*7)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 1*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 2*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 3*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 4*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 5*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 6*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 7*(1 + 18)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) - 1*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) - 2*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) - 3*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) - 4*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) - 5*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) - 6*(1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) - 7*(1 + 18)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 1*(1 - 18)).toString(18),
      (location)=>(parseInt(location, 18) + 2*(1 - 18)).toString(18),
      (location)=>(parseInt(location, 18) + 3*(1 - 18)).toString(18),
      (location)=>(parseInt(location, 18) + 4*(1 - 18)).toString(18),
      (location)=>(parseInt(location, 18) + 5*(1 - 18)).toString(18),
      (location)=>(parseInt(location, 18) + 6*(1 - 18)).toString(18),
      (location)=>(parseInt(location, 18) + 7*(1 - 18)).toString(18)
    ],
    [
      (location)=>(parseInt(location, 18) + 1*(-1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 2*(-1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 3*(-1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 4*(-1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 5*(-1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 6*(-1 + 18)).toString(18),
      (location)=>(parseInt(location, 18) + 7*(-1 + 18)).toString(18)
    ]
  ];
  // this.attack = [/* capture is same as movement */];
  this.image = document.createElement('img');
  if (this.color === "black") {
    this.img_src = "./assets/Chess_qdt60.png";
    this.image.classList.add('blackPiece');
  } else {
    this.img_src = "./assets/Chess_qlt60.png";
    this.image.classList.add('whitePiece');
  }
  this.image.src = this.img_src;
  this.image.id = pieceId;
  this.render = function(imgNode, location) {
    document.getElementById(location).appendChild(imgNode);
  }
  this.render(this.image, this.location)
}

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

let blackQueenOne = new Queen("black", "d8", 104);

let whiteQueenOne = new Queen("white", "d1", 128);



piecesArray.push(blackRookOne, blackKnightOne, blackBishopOne, blackQueenOne, blackKingOne, blackBishopTwo, blackKnightTwo, blackRookTwo, blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight)
piecesArray.push(whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight, whiteRookOne, whiteKnightOne, whiteBishopOne, whiteQueenOne, whiteKingOne, whiteBishopTwo, whiteKnightTwo, whiteRookTwo)
console.log(piecesArray)



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
  this.selectedPieceImg = null;
  // this.checkingPieces = [];
  this.kingIsChecked = false;

  this.firstPartTurn = function() {
    let playablePieces;
    let currentKing;
    // based off of isKingInCheck(), should not add querySelector to every piece
    if (gameState.isKingInCheck(piecesArray)) {
      // there are checking pieces
      // which pieces should have selectPiece eventListener added to them?
      // three possible ways to get king out of check
      // 1: move king
      if (gameState.canKingMove()) {
        currentKing = gameState.currentKing(piecesArray);
        playablePieces.push(currentKing);
      }
      // ^^^^^ returns true or false
      // 2: move piece between king and checking piece [not if two pieces are checking and doesn't work for knights]
        // find which piece(s) is/are checking currentKing
        // gameState.checkingPieces() returns array of checking pieces
        let checkingPieces = gameState.checkingPieces(currentKing);
        if (checkingPieces.length > 1) {
          // skip over 2:
        } else {
          if (checkingPieces[0].pieceType === "knight") {
            // skip
          } else {
            // don't skip 2:
            // check to see what pieces could potentially block any of the checking pieces (not include capturing)
            // else moving a blocking piece may be possible
              // check and see if which pieces can move between king and checking piece(singular)
              // push any piece that could block the check into the playablePieces array
            // someMethod should return any playable piece that would block the single checking piece
            let tempPlayablePieces = gameState.findPossibleBlockingPieces(checkingPieces[0], currentKing);
            tempPlayablePieces.forEach(piece => playablePieces.push(piece));
          }
        }
      // 3: capture checking piece [doesn't work if two pieces are checking]
    } else {
      if (gameState.isWhiteTurn) {
        playablePieces = document.querySelectorAll('.whitePiece');
      } else {
        playablePieces = document.querySelectorAll('.blackPiece');
      }
    }
    playablePieces.forEach(piece => {
      piece.addEventListener('click', selectPiece);
    })
  }

  function selectPiece(e) {
    document.querySelectorAll('.square').forEach(square => {
      square.removeEventListener('click', movePiece);
      square.removeEventListener('click', capturePiece);
    })
    gameState.selectedPieceImg = e.target;
    console.log(gameState.selectedPieceImg);
    return setTimeout(gameState.secondPartTurn, 0);
  }

  this.secondPartTurn = function() {
    console.log(gameState.selectedPieceImg);
    // handle movement
    // add event listener to every square that selectedPieceImg can move to
    // each piece is an object that has information regarding where it can move/capture
    let selectedObj = findObjFromGameStateSelectedPieceImg();
    console.log(selectedObj)
    console.log("^^^^^^^^selectedObj")
    if (selectedObj.pieceType === "pawn") {
      selectedObj.moves.forEach((move, index) => {
        // console.log(move)
        // if location of move already has a piece (an Img tag child), then pass that move; else, addEventListener
        if (document.getElementById(`${move(selectedObj.location)}`).childNodes.length > 0) {
          // do nothing
          console.log(document.getElementById(`${move(selectedObj.location)}`).childNodes.length)
        } else {
          if (index > 0) {
            // check to make sure nothing occupies space directly in front of pawn if the pawn is moving two forward squares on first turn
            if (document.getElementById(`${selectedObj.moves[0](selectedObj.location)}`).childNodes.length > 0) {
              // do nothing
            } else {
              document.getElementById(`${move(selectedObj.location)}`).addEventListener('click', movePiece);
            }
          } else {
            document.getElementById(`${move(selectedObj.location)}`).addEventListener('click', movePiece);
          }
        }
      })
      // selectedObj is still a pawn
      selectedObj.attack.forEach((attack, index) => {
        console.log("HUR, below is ID of DOM node being grabbed")
        // console.log(`${attack}`)
        console.log(document.getElementById(`${attack(selectedObj.location)}`).childNodes)
        console.log("^^^^^^ class list from potential attack div")
        // console.log(document.getElementById(`${attack}`).childNodes[0])
        // console.log(document.getElementById(`${attack}`).childNodes[0].classList)
        // console.log(document.getElementById(`${attack}`).childNodes[0].classList === "blackPiece")
        if (!gameboard.isPositionLegal(parseInt(attack(selectedObj.location), 18))) {
          // do nothing; illegal attack location
        } else if (document.getElementById(`${attack(selectedObj.location)}`).childNodes.length > 0) {
          // console.log(gameState.isWhiteTurn)
          // console.log(document.getElementById(`${attack}`).childNodes[0].classList[0])
          if (document.getElementById(`${attack(selectedObj.location)}`).childNodes[0].classList[0] === "blackPiece" && gameState.isWhiteTurn) {
            document.getElementById(`${attack(selectedObj.location)}`).addEventListener('click', capturePiece);
          } else if (document.getElementById(`${attack(selectedObj.location)}`).childNodes[0].classList[0] === "whitePiece" && !gameState.isWhiteTurn) {
            document.getElementById(`${attack(selectedObj.location)}`).addEventListener('click', capturePiece);
          }
        }
      })
    } else if (selectedObj.pieceType === "queen" || "king" || "bishop" || "rook" || "knight") {
      selectedObj.moves.forEach((moveArray, index) => {
        let continueIteration = true;
        moveArray.forEach((move, index) => {
          if (continueIteration) {
            // a1 = 181; h8 = 314
            // gameboard.isPositionLegal() takes a decimal number
            // check if move position is legal
            if (!gameboard.isPositionLegal(parseInt(move(selectedObj.location), 18))) {
              console.log(selectedObj)
              console.log(selectedObj.location)
              console.log(move(selectedObj.location))
              console.log(parseInt(move(selectedObj.location), 18))
              console.log(gameboard.isPositionLegal(parseInt(move(selectedObj.location), 18)))
              console.log("hur")
              continueIteration = false;
              return
            }
            // do not allow piece to move by passing through sides of board
              // if queen is already on right side, do not let go through right side to far left side
              // if queen is not already on right side, let queen move to right side but not beyond
              // same for those two but for left side
            console.log(move(selectedObj.location))
            // if location of move already has a piece (an Img tag child), then pass that move; else, addEventListener
            if (document.getElementById(`${move(selectedObj.location)}`).childNodes.length > 0) {
              // there is a piece on that square
              if (gameState.isWhiteTurn) {
                console.log(document.getElementById(`${move(selectedObj.location)}`).classList)
                console.log("^^^^^^ class list from potential attack div")
                if (document.getElementById(`${move(selectedObj.location)}`).childNodes[0].classList[0] === "blackPiece") {
                  document.getElementById(`${move(selectedObj.location)}`).addEventListener('click', capturePiece);
                  console.log(document.getElementById(`${move(selectedObj.location)}`).childNodes.length)
                  continueIteration = false;
                  return
                } else {
                  // if it's white turn and there's a white piece at that location, then don't allow move or capture and end that set of moves with return
                  continueIteration = false;
                  return
                }
              } else {
                if (document.getElementById(`${move(selectedObj.location)}`).childNodes[0].classList[0] === "whitePiece") {
                  document.getElementById(`${move(selectedObj.location)}`).addEventListener('click', capturePiece);
                  console.log(document.getElementById(`${move(selectedObj.location)}`).childNodes.length)
                  continueIteration = false;
                  return
                } else {
                  continueIteration = false;
                  return
                }
              }
            } else {
              document.getElementById(`${move(selectedObj.location)}`).addEventListener('click', movePiece);
            }
          }
        })
      })
    }
    if (selectedObj.pieceType === "king") {
      if (selectedObj.hasMoved === false) {
        // potential castling scenario
        // movement for castling must move both pieces in movePiece() below
        // two castle potentials - kingside and queenside
        // where to handle what logic?
        // logic to handle: check if kingside and queenside rooks have moved or not
        // check to see if there are pieces between king and each rook
        // check for King in check (cannot be IN check, cannot move THROUGH check, cannot move INTO check)
        // will need to write check logic first since it hinges on that so much
      }
    }
    // first test simple scenario
    // let squares = document.querySelectorAll('.square');
    // squares.forEach(square => {
    //   square.addEventListener('click', movePiece);
    // })
  }
  
  function findObjFromGameStateSelectedPieceImg() {
    return function() {
      for (i=0; i<piecesArray.length; i++) {
        if (piecesArray[i].id == gameState.selectedPieceImg.id) {
          return piecesArray[i];
        }
      }
    }()
  }

  function movePiece(e) {
    let playablePieces
    if (gameState.isWhiteTurn) { 
      playablePieces = document.querySelectorAll('.whitePiece');
    } else {
      playablePieces = document.querySelectorAll('.blackPiece');
    }
    // console.log(playablePieces)
    playablePieces.forEach(piece => {
      piece.removeEventListener('click', selectPiece);
    })

    document.querySelectorAll('.square').forEach(square => {
      square.removeEventListener('click', movePiece);
      square.removeEventListener('click', capturePiece);
    })
    let pieceObject = findObjFromGameStateSelectedPieceImg();
    pieceObject.location = e.target.id;
    pieceObject.render(gameState.selectedPieceImg, pieceObject.location);
    if (pieceObject.pieceType === "pawn") {
      if (pieceObject.hasMoved === false) {
        pieceObject.hasMoved = true;
        pieceObject.moves.pop();
      }
    }
    if (pieceObject.pieceType === "king" || "rook") {
      if (pieceObject.hasMoved === false) {
        pieceObject.hasMoved = true;
      }
    }
    gameState.isWhiteTurn = !gameState.isWhiteTurn;
    return gameState.firstPartTurn();
  }

  function capturePiece(e) {
    // should move to that location, should remove that piece from board, should progress turn
    // should check for check and checkmate
    let playablePieces
    if (gameState.isWhiteTurn) { 
      playablePieces = document.querySelectorAll('.whitePiece');
    } else {
      playablePieces = document.querySelectorAll('.blackPiece');
    }
    console.log(playablePieces)
    playablePieces.forEach(piece => {
      piece.removeEventListener('click', selectPiece);
    })

    document.querySelectorAll('.square').forEach(square => {
      square.removeEventListener('click', movePiece);
      square.removeEventListener('click', capturePiece);
    })
    let capturedImg = document.getElementById(e.target.id);
    let capturedObject = findObjFromImg(capturedImg);
    capturedImg.remove();
    capturedPieces.push(capturedObject)
    let pieceObject = findObjFromGameStateSelectedPieceImg();
    pieceObject.location = capturedObject.location;
    pieceObject.render(gameState.selectedPieceImg, pieceObject.location);
    if (pieceObject.pieceType === "pawn") {
      if (pieceObject.hasMoved === false) {
        pieceObject.hasMoved = true;
        pieceObject.moves.pop();
      }
    }
    if (pieceObject.pieceType === "king" || "rook") {
      if (pieceObject.hasMoved === false) {
        pieceObject.hasMoved = true;
      }
    }
    gameState.isWhiteTurn = !gameState.isWhiteTurn;
    return gameState.firstPartTurn();
  }

  function findObjFromImg(imgElem) {
    return function(imgElem) {
      for (i=0; i<piecesArray.length; i++) {
        if (piecesArray[i].id == imgElem.id) {
          return piecesArray[i];
        }
      }
    }(imgElem)
  }
// I wrote kingCheck in a bad way initally, going to break this logic up into some different pieces
  // this.kingCheckFALSE = function() {
  //   // check current player's king
  //   let opponentPiecesImages;
  //   let currentKing;
  //   if (gameState.isWhiteTurn) {
  //     console.log("white's turn from kingCheckFALSE func");
  //     // if white's king is in check, then return an array of pieces that can move to get king out of check
  //     // else return every playable piece for white
  //     opponentPiecesImages = document.querySelectorAll('.blackPiece');
  //     // find current player's king and assign to currentKing
  //     piecesArray.forEach(piece => {
  //       if (piece.id === 129) {
  //         // piece with id of 129 is white king
  //         currentKing = piece;
  //         return
  //       }
  //     });
  //   } else {
  //     console.log("black's turn from kingCheckFALSE func");
  //     opponentPiecesImages = document.querySelectorAll('.whitePiece');
  //     piecesArray.forEach(piece => {
  //       if (piece.id === 105) {
  //         // piece with id of 105 is black king
  //         currentKing = piece;
  //         return
  //       }
  //     });
  //   }
  //   opponentPiecesImages.forEach(pieceImg => {
  //     // check if potential moves put king in check
  //     // for second part turn typically, I want to add an event listener for a single piece on move and attack spaces
  //     // here I want to check multiple pieces and if any piece has current player's king in check, then I want to add that piece to gameState.checkingPieces
  //     // continue iterating over all opponentPieces and adding as appropriate
  //     let opponentPiece = findObjFromImg(pieceImg);
  //     if (opponentPiece.pieceType === "pawn") {
  //       opponentPiece.attack.forEach((attack, index) => {
  //         if (attack(opponentPiece.location) === currentKing.location) {
  //           // if true, then king is in check from this pawn
  //           gameState.checkingPieces.push(opponentPiece);
  //         }
  //       })
  //     } else if (opponentPiece.pieceType === "queen" || "bishop" || "rook" || "knight") {
  //       // don't include king in the list above because king's can't get within checking distance
  //       opponentPiece.moves.forEach((moveArray, index) => {
  //         let continueIteration = true;
  //         moveArray.forEach((move, index) => {
  //           if (continueIteration) {
  //             if (!gameboard.isPositionLegal(parseInt(move(opponentPiece.location), 18))) {
  //               continueIteration = false;
  //               return
  //             }
  //             if (move(opponentPiece.location) === currentKing.location) {
  //               // if true, then king is in check from this piece
  //               gameState.checkingPieces.push(opponentPiece);
  //             }
  //             if (document.getElementById(`${move(opponentPiece.location)}`).childNodes.length > 0) {
  //               // there is a piece on that square
  //               continueIteration = false;
  //               return
  //             }
  //           }
  //         })
  //       })
  //     }
  //   })
  //   // kingCheckFALSE() should return an array of playablePieces for current player OR FALSE if king is not in check
  //   if (gameState.checkingPieces.length > 0) {
  //     return gameState.checkingPieces
  //   } else {
  //     return false
  //   }
  //   // make sure I clear gameState.checkingPieces at the appropriate time
  // }

  this.isKingInCheck = function(piecesArray) {
    // should return true or false if king is in check or not
    let opponentObjs;
    let currentKing = gameState.currentKing(piecesArray);
    let isChecked = false;
    if (gameState.isWhiteTurn) {
      opponentObjs = piecesArray.filter(piece => {
        if (piece.color === "black") {
          return piece
        }
      });
    } else {
      opponentObjs = piecesArray.filter(piece => {
        if (piece.color === "white") {
          return piece
        }
      });
    }
    while (!isChecked) {
      opponentObjs.forEach(opponentPiece => {
        // check if potential moves put king in check
        if (opponentPiece.pieceType === "pawn") {
          opponentPiece.attack.forEach((attack, index) => {
            if (attack(opponentPiece.location) === currentKing.location) {
              // if true, then king is in check from this pawn
              isChecked = true;
            }
          })
        } else if (opponentPiece.pieceType === "queen" || "bishop" || "rook" || "knight") {
          // don't include king in the list above because king's can't get within checking distance
          opponentPiece.moves.forEach((moveArray, index) => {
            let continueIteration = true;
            moveArray.forEach((move, index) => {
              if (continueIteration) {
                if (!gameboard.isPositionLegal(parseInt(move(opponentPiece.location), 18))) {
                  continueIteration = false;
                  return
                }
                if (move(opponentPiece.location) === currentKing.location) {
                  // if true, then king is in check from this piece
                  isChecked = true;
                }
                for (piece in piecesArray) {
                  if (piece.location === move(opponentPiece.location)) {
                    // there is a piece at that location
                    continueIteration = false;
                    return
                  }
                }
              }
            })
          })
        }
      })
    }
    return isChecked
  }

  this.canKingMove = function() {
    // returns boolean of whether king can move out of check
    let out = false;
    let currentKing = gameState.currentKing(piecesArray);
    if (gameState.isWhiteTurn) {
      opponentPiecesImages = document.querySelectorAll('.blackPiece');
    } else {
      opponentPiecesImages = document.querySelectorAll('.whitePiece');
    }
    // iterate over king's moves to see if king would be in check in that position
    while (!out) {
      currentKing.moves.forEach((moveArray, index) => {
        let continueIteration = true;
        moveArray.forEach((move, index) => {
          if (!gameboard.isPositionLegal(parseInt(move(currentKing.location), 18))) {
            // illegal position
          }
          piecesArray.forEach((piece, index) => {
            if (piece.location === move(currentKing.location)) {
              // there is a piece at that location
              if (piece.color === "white" && currentKing.color === "white") {
                // current player's piece
              } else if (piece.color === "black" && currentKing.color === "black") {
                // same
              } else {
                // possible move/capture
                // use gameState.isKingInCheck(tempPiecesArray) to determine if King would move into check or not
                let tempPiecesArray = piecesArray;
                // need to change location of king in tempPiecesArray
                tempPiecesArray.forEach(piece => {
                  if (piece.pieceType === "king" && piece.color === currentKing.color) {
                    piece.location = move(currentKing.location)
                  }
                })
                // need to remove captured piece from tempPiecesArray
                tempPiecesArray.splice(index, 1)
                if (gameState.isKingInCheck(tempPiecesArray)) {
                  // king would move into check, not a valid move
                } else {
                  out = true;
                }
              }
              continueIteration = false;
              return
            } else {
              // nothing there
              // possible move (but king must not move into check)
              // if it's legit: out = true;
              let tempPiecesArray = piecesArray;
              // need to change location of king in tempPiecesArray
              tempPiecesArray.forEach(piece => {
                if (piece.pieceType === "king" && piece.color === currentKing.color) {
                  piece.location = move(currentKing.location)
                }
              })
              if (gameState.isKingInCheck(tempPiecesArray)) {
                // king would move into check, not a valid move
              } else {
                out = true;
              }
            }
          })
        })
      })
    }
    return out
  }

  this.currentKing = function(piecesArray) {
    let currentKing;
    if (gameState.isWhiteTurn) {
      piecesArray.forEach(piece => {
        if (piece.id === 129) {
          // piece with id of 129 is white king
          currentKing = piece;
          return
        }
      });
    } else {
      piecesArray.forEach(piece => {
        if (piece.id === 105) {
          // piece with id of 105 is black king
          currentKing = piece;
          return
        }
      });
    }
    return currentKing
  }

  // this.checkingPieces = function() {
  //   // should return an array of checking pieces (either one or two pieces)
  //   let out = [];
  //   // iterate over current player's pieces
  //   // iterate over the moveArrays for each piece (handle pawn logic separately)
  //   let currentObjs;
  //   if (gameState.isWhiteTurn) {
  //     currentObjs = piecesArray.filter(piece => {
  //       if (piece.color === "white") {
  //         return piece
  //       }
  //     });
  //   } else {
  //     currentObjs = piecesArray.filter(piece => {
  //       if (piece.color === "black") {
  //         return piece
  //       }
  //     });
  //   }
  //   currentObjs.forEach(curentPlayerPiece => {
  //     if (curentPlayerPiece.pieceType === "pawn") {
  //       curentPlayerPiece.moves.forEach((move, index) => {
  //         // if location of move already has a piece (an Img tag child), then pass that move; else, addEventListener
  //         if (document.getElementById(`${move(curentPlayerPiece.location)}`).childNodes.length > 0) {
  //           // do nothing
  //         } else {
  //           if (index > 0) {
  //             // check to make sure nothing occupies space directly in front of pawn if the pawn is moving two forward squares on first turn
  //             if (document.getElementById(`${curentPlayerPiece.moves[0](curentPlayerPiece.location)}`).childNodes.length > 0) {
  //               // do nothing
  //             } else {
  //               // if move would block king from being in check, then add event listener for movePiece on that piece's image tag
  //               let tempPiecesArray = piecesArray;
  //               // need to change location of king in tempPiecesArray
  //               tempPiecesArray.forEach(piece => {
  //                 if (piece.location === currentPlayerPiece.location) {
  //                   piece.location = move(currentPlayerPiece.location)
  //                 }
  //               })
  //               if (gameState.isKingInCheck(tempPiecesArray)) {
  //                 // king would move into check, not a valid move
  //               } else {
  //                 out.push(currentPlayerPiece);
  //               }
  //             }
  //           } else {
  //             let tempPiecesArray = piecesArray;
  //             // need to change location of king in tempPiecesArray
  //             tempPiecesArray.forEach(piece => {
  //               if (piece.location === currentPlayerPiece.location) {
  //                 piece.location = move(currentPlayerPiece.location)
  //               }
  //             })
  //             if (gameState.isKingInCheck(tempPiecesArray)) {
  //               // king would move into check, not a valid move
  //             } else {
  //               out.push(currentPlayerPiece);
  //             }
  //           }
  //         }
  //       })
  //       // curentPlayerPiece is still a pawn
  //       curentPlayerPiece.attack.forEach((attack, index) => {
  //         if (!gameboard.isPositionLegal(parseInt(attack(selectedObj.location), 18))) {
  //           // do nothing; illegal attack location
  //         } else if (document.getElementById(`${attack(selectedObj.location)}`).childNodes.length > 0) {
  //           if (document.getElementById(`${attack(curentPlayerPiece.location)}`).childNodes[0].classList[0] === "blackPiece" && gameState.isWhiteTurn) {
  //             // check to see if that movement would remove king's check
  //             let tempPiecesArray = piecesArray;
  //             // need to remove potentially captured piece from tempPiecesArray
  //             let tempImgId = document.getElementById(`${attack(curentPlayerPiece.location)}`).childNodes[0].id
  //             tempPiecesArray = tempPiecesArray.filter(piece => {
  //               return piece.id !== tempImgId
  //             })
  //             tempPiecesArray.forEach(piece => {
  //               if (piece.location === currentPlayerPiece.location) {
  //                 piece.location = move(currentPlayerPiece.location)
  //               }
  //             })
  //             if (gameState.isKingInCheck(tempPiecesArray)) {
  //               // king would move into check, not a valid move
  //             } else {
  //               out.push(currentPlayerPiece);
  //             }
  //           } else if (document.getElementById(`${attack(selectedObj.location)}`).childNodes[0].classList[0] === "whitePiece" && !gameState.isWhiteTurn) {
  //             let tempPiecesArray = piecesArray;
  //             // need to remove potentially captured piece from tempPiecesArray
  //             let tempImgId = document.getElementById(`${attack(curentPlayerPiece.location)}`).childNodes[0].id
  //             tempPiecesArray = tempPiecesArray.filter(piece => {
  //               return piece.id !== tempImgId
  //             })
  //             tempPiecesArray.forEach(piece => {
  //               if (piece.location === currentPlayerPiece.location) {
  //                 piece.location = move(currentPlayerPiece.location)
  //               }
  //             })
  //             if (gameState.isKingInCheck(tempPiecesArray)) {
  //               // king would move into check, not a valid move
  //             } else {
  //               out.push(currentPlayerPiece);
  //             }
  //           }
  //         }
  //       })
  //     } else if (curentPlayerPiece.pieceType === "queen" || "bishop" || "rook" || "knight") {
  //       // iterate over current player's pieces to see if a move would make king NOT be in check, if that's true push that piece into the out array
  //       let continueNestedIteration = true;
  //       while (continueNestedIteration) {
  //         curentPlayerPiece.moves.forEach((moveArray, index) => {
  //           let continueIteration = true;
  //           moveArray.forEach((move, index) => {
  //             if (continueIteration) {
  //               if (!gameboard.isPositionLegal(parseInt(move(curentPlayerPiece.location), 18))) {
  //                 continueIteration = false;
  //                 return
  //               }
  //               // if location of move already has a piece (an Img tag child), then pass that move; else, addEventListener
  //               if (document.getElementById(`${move(curentPlayerPiece.location)}`).childNodes.length > 0) {
  //                 // there is a piece on that square
  //                 if (gameState.isWhiteTurn) {
  //                   if (document.getElementById(`${move(curentPlayerPiece.location)}`).childNodes[0].classList[0] === "blackPiece") {
  //                     let tempPiecesArray = piecesArray;
  //                     // need to remove potentially captured piece from tempPiecesArray
  //                     let tempImgId = document.getElementById(`${move(curentPlayerPiece.location)}`).childNodes[0].id
  //                     tempPiecesArray = tempPiecesArray.filter(piece => {
  //                       return piece.id !== tempImgId
  //                     })
  //                     // update location of potentially moving piece
  //                     tempPiecesArray.forEach(piece => {
  //                       if (piece.location === currentPlayerPiece.location) {
  //                         piece.location = move(currentPlayerPiece.location)
  //                       }
  //                     })
  //                     if (gameState.isKingInCheck(tempPiecesArray)) {
  //                       // king would move into check, not a valid move
  //                     } else {
  //                       out.push(currentPlayerPiece);
  //                       continueNestedIteration = false;
  //                     }
  //                     continueIteration = false;
  //                     return
  //                   } else {
  //                     // if it's white turn and there's a white piece at that location, then don't allow move or capture and end that set of moves with return
  //                     continueIteration = false;
  //                     return
  //                   }
  //                 } else {
  //                   if (document.getElementById(`${move(curentPlayerPiece.location)}`).childNodes[0].classList[0] === "whitePiece") {
  //                     let tempPiecesArray = piecesArray;
  //                     // need to remove potentially captured piece from tempPiecesArray
  //                     let tempImgId = document.getElementById(`${move(curentPlayerPiece.location)}`).childNodes[0].id
  //                     tempPiecesArray = tempPiecesArray.filter(piece => {
  //                       return piece.id !== tempImgId
  //                     })
  //                     // update location of potentially moving piece
  //                     tempPiecesArray.forEach(piece => {
  //                       if (piece.location === currentPlayerPiece.location) {
  //                         piece.location = move(currentPlayerPiece.location)
  //                       }
  //                     })
  //                     if (gameState.isKingInCheck(tempPiecesArray)) {
  //                       // king would move into check, not a valid move
  //                     } else {
  //                       out.push(currentPlayerPiece);
  //                       continueNestedIteration = false;
  //                     }
  //                     continueIteration = false;
  //                     return
  //                   } else {
  //                     continueIteration = false;
  //                     return
  //                   }
  //                 }
  //               } else {
  //                 let tempPiecesArray = piecesArray;
  //                 tempPiecesArray.forEach(piece => {
  //                   if (piece.location === currentPlayerPiece.location) {
  //                     piece.location = move(currentPlayerPiece.location)
  //                   }
  //                 })
  //                 if (gameState.isKingInCheck(tempPiecesArray)) {
  //                   // king would move into check, not a valid move
  //                 } else {
  //                   out.push(currentPlayerPiece);
  //                   continueNestedIteration = false;
  //                 }
  //               }
  //             }
  //           })
  //         })
  //       }
  //     }
  //   })
  //   return out
  // }
  this.checkingPieces = function(currentKing) {
    // should return an array of checking pieces (either one or two pieces)
    let out = [];
    // iterate over current player's pieces
    // iterate over the moveArrays for each piece (handle pawn logic separately)
    let opponentObjs;
    if (gameState.isWhiteTurn) {
      opponentObjs = piecesArray.filter(piece => {
        if (piece.color === "black") {
          return piece
        }
      });
    } else {
      opponentObjs = piecesArray.filter(piece => {
        if (piece.color === "white") {
          return piece
        }
      });
    }
    opponentObjs.forEach(opposingPlayerPiece => {
      if (opposingPlayerPiece.pieceType === "pawn") {
        opposingPlayerPiece.attack.forEach((attack, index) => {
          if (attack(opposingPlayerPiece.location) === currentKing.location) {
            // checking piece
            out.push(opposingPlayerPiece);
          }
        })
      } else if (opposingPlayerPiece.pieceType === "queen" || "bishop" || "rook" || "knight") {
        // iterate over current player's pieces to see if a move would make king NOT be in check, if that's true push that piece into the out array
        opposingPlayerPiece.moves.forEach((moveArray, index) => {
          let continueIteration = true;
          moveArray.forEach((move, index) => {
            if (continueIteration) {
              if (!gameboard.isPositionLegal(parseInt(move(opposingPlayerPiece.location), 18))) {
                continueIteration = false;
                return
              }
              if (move(opposingPlayerPiece.location) === currentKing.location) {
                // checking piece
                out.push(opposingPlayerPiece);
              }
              // if location of move already has a piece (an Img tag child), then stop iterating over that moveArray
              if (document.getElementById(`${move(opposingPlayerPiece.location)}`).childNodes.length > 0) {
                continueIteration = false;
              }
            }
          })
        })
      }
    })
    return out
  }

  this.findPossibleBlockingPieces = function(checkingPiece, currentKing) {
    let out = [];
    // function that returns an array of pieces that could move to block a single checking piece to make king no longer be in check
    // I have access to checking piece
    // currentKing.location
    // find what line the check is happening on (knights not included in this, so restricted to ranks, files, and diagonals)
    // 8 ranks
    // 8 files
    // 7 \ diagonals
    // 7 / diagonals
    // blockingSquareLocations is base 10 locations rather than base 18
    let blockingSquareLocations = [];
    function locationBySizeFunc() {
      let smallerLocation;
      let largerLocation;
      console.log(checkingPiece.location);
      console.log(currentKing.location);
      if (parseInt(checkingPiece.location, 18) > parseInt(currentKing.location, 18)) {
        smallerLocation = parseInt(currentKing.location, 18);
        largerLocation = parseInt(checkingPiece.location, 18);
      } else {
        smallerLocation = parseInt(checkingPiece.location, 18);
        largerLocation = parseInt(currentKing.location, 18);
      }
      return [smallerLocation, largerLocation]
    }
    function increaseByFactor(factor) {
      let tempLoc = (smallerLocation + factor);
      while (tempLoc !== largerLocation) {
        blockingSquareLocations.push(tempLoc);
        tempLoc += factor;
        console.log("hope I don't get looping")
        console.log(smallerLocation);
        console.log(largerLocation);
        console.log(tempLoc);
        console.log(blockingSquareLocations);
      }
    }
    let [smallerLocation, largerLocation] = locationBySizeFunc();
    if (checkingPiece.location[1] === currentKing.location[1]) {
      // ex: '1' === '1'
      // find all blocking square locations
      increaseByFactor(18);
    } else if (checkingPiece.location[0] === currentKing.location[0]) {
      // ex: 'a' === 'a'
      increaseByFactor(1);
    } else if ((parseInt(checkingPiece.location, 18) - parseInt(currentKing.location, 18)) % 17 === 0) {
      // if the difference between the two locations (in base 10) modulus 17 === 0, it's \ diagonal
      increaseByFactor(17);
    } else if ((parseInt(checkingPiece.location, 18) - parseInt(currentKing.location, 18)) % 19 === 0) {
      // if the difference between the two locations (in base 10) modulus 19 === 0, it's / diagonal
      increaseByFactor(19);
    }
    // iterate over all of current player's pieces to see if any piece can move to any of the locations between checkingPiece and currentKing
    console.log(blockingSquareLocations); // in base 10
    // make sure that piece moving wouldn't put king in check
    let currentPlayerPieces;
    if (gameState.isWhiteTurn) {
      currentPlayerPieces = piecesArray.filter(piece => piece.color === "white" && piece.pieceType !== "king")
    } else {
      currentPlayerPieces = piecesArray.filter(piece => piece.color === "black" && piece.pieceType !== "king")
    }
    // first: see if that piece and the single checking piece were not on the board if the king would be in check
    currentPlayerPieces.forEach(currentPlayerPiece => {
      let tempPiecesArray = piecesArray;
      // need to remove currentPlayerPiece & checkingPiece from tempPiecesArray
      tempPiecesArray = tempPiecesArray.filter(piece => {
        return piece.id !== currentPlayerPiece.id
      })
      tempPiecesArray = tempPiecesArray.filter(piece => {
        return piece.id !== checkingPiece.id
      })
      // update location of potentially moving piece
      // tempPiecesArray.forEach(piece => {
      //   if (piece.location === currentPlayerPiece.location) {
      //     piece.location = move(currentPlayerPiece.location)
      //   }
      // })
      if (gameState.isKingInCheck(tempPiecesArray)) {
        // king would be in check if currentPlayerPiece moves
      } else {
        // passes first point
        // if first point passes, then second: see if that piece can move to one of the blockingSquareLocations in that array
        // if second is true, push that piece into the out array
        if (currentPlayerPiece.pieceType === "pawn") {
          // pawn moves (attacks won't count because blocking square locations must be empty)
          let continueIteration = true;
          while (continueIteration) {
            currentPlayerPiece.moves.forEach((move, index) => {
              if (document.getElementById(`${move(selectedObj.location)}`).childNodes.length > 0) {
                continueIteration = false;
              } else {
                blockingSquareLocations.forEach(location => {
                  if (move(currentPlayerPiece.location) === location) {
                    // piece could move to possible blocking square location
                    out.push(currentPlayerPiece);
                  }
                })
              }
            })
          }
        } else {
          // iterate over array and nested array of moves to see if any possible moves would land on any of the possible blockingSquareLocations
          let continueIteration = true;
          while (continueIteration) {
            currentPlayerPiece.moves.forEach((moveArray, index) => {
              let nestedContinueIteration = true;
              moveArray.forEach((move, index) => {
                while (nestedContinueIteration) {
                  if (!gameboard.isPositionLegal(parseInt(move(currentPlayerPiece.location), 18))) {
                    nestedContinueIteration = false;
                  }
                  if (document.getElementById(`${move(currentPlayerPiece.location)}`).childNodes.length > 0) {
                    // there is a piece on that square
                    nestedContinueIteration = false;
                  } else {
                    blockingSquareLocations.forEach(location => {
                      if (move(currentPlayerPiece.location) === location) {
                        // piece could move to possible blocking square location
                        out.push(currentPlayerPiece);
                        continueIteration = false;
                      }
                    })
                  }
                }
              })
            })
          }
        }
      }
    })
    console.log(out);
    console.log("^^^^^^^^ out😇");
    return out
  }
}

let gameState = new GameState();



gameState.firstPartTurn();

//TODO prevent adding eventListener for a move/attack that would put one's own king in check


// NOTES for check
// when turn begins, see if current player's king is in check
  // it's not possible for both kings to be in check, otherwise it would be a checkmate
// if move/attack would put player's king in check, prevent that move (or attack)
// check can be cleared 3 way:
  // king can move out of check
  // piece can move between king and checking piece (except for a checking knight)
  // checking piece can be captured
// above two points mean two things:
  // when a player's king is in check, player is required to get out of check
  // and cannot be put into check as a result of action


// it may make sense to remember checking piece(s)
// theoretically two pieces could be checking at the same time (but not three)
// checking piece(s) can be assigned into an array: gameState.checkingPieces
// declare that array
// add pieces at beginning of turn while looking to see if current player's king is in check
// empty array at end of player's turn


// checkmate
// when looking for current player's king in check:
  // if king is in check
  // iterate over current player's pieces
  // once a piece is found which can move and prevent check and will not create a new check on one's own king
  // then iteration can stop and turn can continue
  // if none of current player's pieces can move to get king out of check (or without creating a new check on one's own king)
    // then checkmate has occurred
// requires iterating over both player pieces arrays