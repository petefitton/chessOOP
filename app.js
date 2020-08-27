// NOTES FOR WHAT I WAS JUST WORKING ON:

// square id's are 0 through 63
// each chesspiece image tag also needs an id
  // pawn OBJECT & IMG tag id's are 109-124 (9-24 with 1 at beginning)





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
    this.moves = [8, 16];
    // black attack inverted to 9 and 7 for simplified capturing logic located in GameState.secondPartTurn
    this.attack = [9, 7];
  } else {
    this.img_src = "./assets/Chess_plt60.png";
    this.image.classList.add('whitePiece');
    this.moves = [-8, -16];
    this.attack = [-7, -9];
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

let blackPawnOne = new Pawn("black", 8, 109);
let blackPawnTwo = new Pawn("black", 9, 110);
let blackPawnThree = new Pawn("black", 10, 111);
let blackPawnFour = new Pawn("black", 11, 112);
let blackPawnFive = new Pawn("black", 12, 113);
let blackPawnSix = new Pawn("black", 13, 114);
let blackPawnSeven = new Pawn("black", 14, 115);
let blackPawnEight = new Pawn("black", 15, 116);

let whitePawnOne = new Pawn("white", 48, 117);
let whitePawnTwo = new Pawn("white", 49, 118);
let whitePawnThree = new Pawn("white", 50, 119);
let whitePawnFour = new Pawn("white", 51, 120);
let whitePawnFive = new Pawn("white", 52, 121);
let whitePawnSix = new Pawn("white", 53, 122);
let whitePawnSeven = new Pawn("white", 54, 123);
let whitePawnEight = new Pawn("white", 55, 124);




function Rook(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "rook"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  // movement changes boolean value
  this.hasMoved = false;
  this.moves = [
    [8, 16, 24, 32, 40, 48, 56],
    [-8, -16, -24, -32, -40, -48, -56],
    [1, 2, 3, 4, 5, 6, 7],
    [-1, -2, -3, -4, -5, -6, -7]
  ];
  this.attack = [/* capture is same as movement */];
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

let blackRookOne = new Rook("black", 0, 101);
let blackRookTwo = new Rook("black", 7, 108);

let whiteRookOne = new Rook("white", 56, 125);
let whiteRookTwo = new Rook("white", 63, 132);




function Knight(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "knight"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.moves = [
    -6, -15, -17, -10, 6, 10, 15, 17
  ];
  this.attack = [/* capture is same as movement */];
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

let blackKnightOne = new Knight("black", 1, 102);
let blackKnightTwo = new Knight("black", 6, 107);

let whiteKnightOne = new Knight("white", 57, 126);
let whiteKnightTwo = new Knight("white", 62, 131);





function Bishop(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "bishop"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.moves = [
    [9, 18, 27, 36, 45, 54, 63],
    [-9, -18, -27, -36, -45, -54, -63],
    [7, 14, 21, 28, 35, 42, 49],
    [-7, -14, -21, -28, -35, -42, -49]
  ];
  this.attack = [/* capture is same as movement */];
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

let blackBishopOne = new Bishop("black", 2, 103);
let blackBishopTwo = new Bishop("black", 5, 106);

let whiteBishopOne = new Bishop("white", 58, 127);
let whiteBishopTwo = new Bishop("white", 61, 130);





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
    [8],
    [-8],
    [1],
    [-1],
    [9],
    [-9],
    [7],
    [-7]
  ];
  this.attack = [/* capture is same as movement */];
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

let blackKingOne = new King("black", 4, 105);

let whiteKingOne = new King("white", 60, 129);




function Queen(color, location, pieceId) {
  Piece.call(this);
  this.pieceType = "queen"
  this.color = color;
  this.location = location;
  this.id = pieceId;
  this.moves = [
    [8, 16, 24, 32, 40, 48, 56],
    [-8, -16, -24, -32, -40, -48, -56],
    [1, 2, 3, 4, 5, 6, 7],
    [-1, -2, -3, -4, -5, -6, -7],
    [9, 18, 27, 36, 45, 54, 63],
    [-9, -18, -27, -36, -45, -54, -63],
    [7, 14, 21, 28, 35, 42, 49],
    [-7, -14, -21, -28, -35, -42, -49]
  ];
  this.attack = [/* capture is same as movement */];
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

let blackQueenOne = new Queen("black", 3, 104);

let whiteQueenOne = new Queen("white", 59, 128);



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

  this.firstPartTurn = function() {
    if (gameState.isWhiteTurn) { 
      let playablePieces = document.querySelectorAll('.whitePiece');
      playablePieces.forEach(piece => {
        piece.addEventListener('click', selectPiece);
      })
    } else {
      let playablePieces = document.querySelectorAll('.blackPiece');
      playablePieces.forEach(piece => {
        piece.addEventListener('click', selectPiece);
      })
    }
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
    if (selectedObj.pieceType === "pawn") {
      selectedObj.moves.forEach((move, index) => {
        console.log(selectedObj.location+move)
        // if location of move already has a piece (an Img tag child), then pass that move; else, addEventListener
        if (document.getElementById(`${selectedObj.location+move}`).childNodes.length > 0) {
          // do nothing
          console.log(document.getElementById(`${selectedObj.location+move}`).childNodes.length)
        } else {
          if (index > 0) {
            // check to make sure nothing occupies space directly in front of pawn if the pawn is moving two forward squares on first turn
            if (document.getElementById(`${selectedObj.location+selectedObj.moves[0]}`).childNodes.length > 0) {
              // do nothing
            } else {
              document.getElementById(`${selectedObj.location+move}`).addEventListener('click', movePiece);
            }
          } else {
            document.getElementById(`${selectedObj.location+move}`).addEventListener('click', movePiece);
          }
        }
      })
    } else if (selectedObj.pieceType === "queen" || "king" || "bishop" || "rook") {
      selectedObj.moves.forEach((moveArray, index) => {
        moveArray.forEach((move, index) => {
          let isLastMove = false;
          if (selectedObj.location+move < 0 || selectedObj.location+move > 63) {
            return
          }
          // do not allow piece to move by passing through sides of board
            // if queen is already on right side, do not let go through right side to far left side
            // if queen is not already on right side, let queen move to right side but not beyond
            // same for those two but for left side
          if (selectedObj.location % 8 === 7 && move === 1 || move === 9 || move === -7) {
            return
          } else if (selectedObj.location % 8 === 0 && move === -1 || move === 7 || move === -9) {
            return
          }
          if (selectedObj.location+move % 8 === 7 || selectedObj.location+move % 8 === 0) {
            isLastMove = true;
          }
          console.log(selectedObj.location+move)
          // if location of move already has a piece (an Img tag child), then pass that move; else, addEventListener
          if (document.getElementById(`${selectedObj.location+move}`).childNodes.length > 0) {
            // there is a piece there which can be captured
            if (gameState.isWhiteTurn) {
              console.log(document.getElementById(`${selectedObj.location+move}`).classList)
              console.log("^^^^^^ class list from potential attack div")
              if (document.getElementById(`${selectedObj.location+move}`).childNodes[0].classList[1] === "black") {
                document.getElementById(`${selectedObj.location+move}`).addEventListener('click', capturePiece);
                console.log(document.getElementById(`${selectedObj.location+move}`).childNodes.length)
                return
              }
            } else {
              if (document.getElementById(`${selectedObj.location+move}`).childNodes[0].classList[1] === "white") {
                document.getElementById(`${selectedObj.location+move}`).addEventListener('click', capturePiece);
                console.log(document.getElementById(`${selectedObj.location+move}`).childNodes.length)
                return
              }
            }
            return
          } else {
            if (isLastMove) {
              document.getElementById(`${selectedObj.location+move}`).addEventListener('click', movePiece);
              return
            }
            document.getElementById(`${selectedObj.location+move}`).addEventListener('click', movePiece);
          }
        })
      })
    } else if (selectedObj.pieceType === "knight") {
      selectedObj.moves.forEach((move, index) => {
        if (document.getElementById(`${selectedObj.location+move}`).childNodes.length > 0) {
          // there is a piece there which can be captured
          document.getElementById(`${selectedObj.location+move}`).addEventListener('click', capturePiece);
        } else {
          document.getElementById(`${selectedObj.location+move}`).addEventListener('click', movePiece);
        }
      })
    }
    if (selectedObj.pieceType === "pawn") {
      selectedObj.attack.forEach((attack, index) => {
        console.log("HUR, below is ID of DOM node being grabbed")
        console.log(`${selectedObj.location+attack}`)
        console.log(document.getElementById(`${selectedObj.location+attack}`).childNodes)
        console.log("^^^^^^ class list from potential attack div")
        // console.log(document.getElementById(`${selectedObj.location+attack}`).childNodes[0])
        // console.log(document.getElementById(`${selectedObj.location+attack}`).childNodes[0].classList)
        // console.log(document.getElementById(`${selectedObj.location+attack}`).childNodes[0].classList === "blackPiece")
        if (document.getElementById(`${selectedObj.location+attack}`).childNodes.length > 0) {
          console.log(gameState.isWhiteTurn)
          console.log(document.getElementById(`${selectedObj.location+attack}`).childNodes[0].classList[0])
          if (document.getElementById(`${selectedObj.location+attack}`).childNodes[0].classList[0] === "blackPiece" && gameState.isWhiteTurn) {
            if (selectedObj.location % 8 === 7) {
              if (index === 1) {
                console.log('test1')
                document.getElementById(`${selectedObj.location+attack}`).addEventListener('click', capturePiece);
              }
            } else if (selectedObj.location % 8 === 0) {
              console.log('test2')
              if (index === 0) {
                console.log('test3')
                document.getElementById(`${selectedObj.location+attack}`).addEventListener('click', capturePiece);
              }
            } else {
              console.log('test4')
              console.log("hittin' here")
              document.getElementById(`${selectedObj.location+attack}`).addEventListener('click', capturePiece);
            }
          } else if ((document.getElementById(`${selectedObj.location+attack}`).childNodes[0].classList[0] === "whitePiece" && gameState.isWhiteTurn === false)) {
            console.log('test5')
            if (selectedObj.location % 8 === 7) {
              console.log('test6')
              if (index === 1) {
                console.log('test7')
                document.getElementById(`${selectedObj.location+attack}`).addEventListener('click', capturePiece);
              }
            } else if (selectedObj.location % 8 === 0) {
              console.log('test8')
              if (index === 0) {
                console.log('test9')
                document.getElementById(`${selectedObj.location+attack}`).addEventListener('click', capturePiece);
              }
            } else {
              console.log('test10')
              console.log("hittin' here")
              document.getElementById(`${selectedObj.location+attack}`).addEventListener('click', capturePiece);
            }
          }
          console.log('test11')
        } else {
          console.log('test12')
        }
      })
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
    pieceObject.location = parseInt(e.target.id);
    pieceObject.render(gameState.selectedPieceImg, pieceObject.location);
    if (pieceObject.pieceType === "pawn") {
      if (pieceObject.hasMoved === false) {
        pieceObject.hasMoved = true;
        pieceObject.moves.pop();
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
    let capturedImg = document.getElementById(`${e.target.id}`);
    let capturedObject = findCapturedObj(capturedImg);
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
    gameState.isWhiteTurn = !gameState.isWhiteTurn;
    return gameState.firstPartTurn();
  }

  function findCapturedObj(imgElem) {
    return function(imgElem) {
      for (i=0; i<piecesArray.length; i++) {
        if (piecesArray[i].id == imgElem.id) {
          return piecesArray[i];
        }
      }
    }(imgElem)
  }
}

let gameState = new GameState();



gameState.firstPartTurn();
