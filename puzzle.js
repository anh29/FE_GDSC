var rows = 5;
var columns = 5;

var currTile;
var otherTile; //blank tile

var turns = 0;
var typeChallenge = rows.toString() + "x" + columns.toString();
var src = typeChallenge + "_challenge/";

// var imgOrdered = [
//   ["1", "2", "blank"],
//   ["4", "5", "6"],
//   ["7", "8", "9"],
// ];

var imgOrdered = [
  ["1", "2", "3", "4", "blank"],
  ["6", "7", "8", "9", "10"],
  ["11", "12", "13", "14", "15"],
  ["16", "17", "18", "19", "20"],
  ["21", "22", "23", "24", "25"],
];

window.onload = function () {
  var idImg = document.getElementById("img");
  addImg(idImg, "logo", ".png");
  addImg(idImg, "result", ".jpg");

  // Shuffle the image order
  //   var imgShuffled = shuffleImages(imgOrdered);
  var imgShuffled = [
    ["6", "1", "14", "3", "blank"],
    ["2", "7", "4", "9", "10"],
    ["11", "17", "8", "12", "15"],
    ["21", "16", "19", "13", "24"],
    ["18", "22", "23", "25", "20"],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img id="0-0" src="1.jpg">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = src + imgShuffled[r][c] + ".jpg";
      tile.className = rows == 3 ? "small" : "large";

      //DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); //click an image to drag
      tile.addEventListener("dragover", dragOver); //moving image around while clicked
      tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
      tile.addEventListener("dragleave", dragLeave); //dragged image leaving anohter image
      tile.addEventListener("drop", dragDrop); //drag an image over another image, drop the image
      tile.addEventListener("dragend", dragEnd); //after drag drop, swap the two tiles

      document.getElementById("board").append(tile);
    }
  }
};

function addImg(idImg, ...name) {
  var img = document.createElement("img");
  img.className = name[0];
  img.src = src + name[0] + name[1];
  img.alt = name;

  idImg.appendChild(img);
}

function dragStart() {
  currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
  if (!otherTile.src.includes("blank.jpg")) {
    return;
  }

  let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
  }
}
