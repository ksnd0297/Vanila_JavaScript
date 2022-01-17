///////////////////////////////////////////////////////////////////////////////////////////////////
/* version : 1.04 ver */
///////////////////////////////////////////////////////////////////////////////////////////////////
/* 전역함수 ( 사용과 초기화에 주의 ) */
var imgArray = new Array();
imgArray[1] = new Image(); imgArray[1].src = 'Images/Creeper.png';
imgArray[2] = new Image(); imgArray[2].src = 'Images/Enderman.png';
imgArray[3] = new Image(); imgArray[3].src = 'Images/Spider.png';
imgArray[4] = new Image(); imgArray[4].src = 'Images/Zombie.png';
imgArray[5] = new Image(); imgArray[5].src = 'Images/O.png';

var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var boardName = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var dir = [-3, 3, -1, 1]; // 상 좌 우 하
var now = 4;
var space = false;

///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
/* 스크립트 사용 */
red(now);
var time = setInterval(function () {
  if (gameover()) {
    alert("Game Over");
    clearInterval(time);
  }
  else makeMonster();
}, 1000);
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
/* 함수들 */

/* 블럭표시를 위한 함수 */
function yellow(block) { let nowblock = document.getElementById(boardName[block]); nowblock.style.border = "5px dashed yellow"; }
function red(block) { let nowblock = document.getElementById(boardName[block]); nowblock.style.border = "5px solid red"; }
function blue(block) { let nowblock = document.getElementById(boardName[block]); nowblock.style.border = "5px solid blue"; }
function base(block) { let nowblock = document.getElementById(boardName[block]); nowblock.style.border = "5px solid #FFB432"; }

/* 이미지 표시 함수 */
function img(num, random) {
  let block = document.getElementById(boardName[num]);
  if (random != 0) block.innerHTML = "<img src='" + imgArray[random].src + "'>";
  else right(block);
}

function right(block) {
  block.style.transform = "scale(1.1)"; block.style.transition = "0.2s";
  blue(now);
  setTimeout(function () {
    block.style.transform = "scale(1.0)"; block.style.transition = "0.2s";
    block.innerHTML = " ";
    red(now);
  }, 200)
}

/* 게임오버 체크하는 함수 */
function gameover() {
  for (let i = 0; i < 9; i++)
    if (board[i] == 0) return false;
  return true;
}

/* 몬스터를 만들어내는 함수 */
function makeMonster() {
  while (1) {
    let temp = parseInt(Math.random() * 9);
    if (board[temp] == 0) {
      let random = parseInt(Math.random() * 4) + 1;
      board[temp] = random; img(temp, random);
      break;
    }
  }
}

/* 키보드의 입력을 받는 함수 */
window.addEventListener('keydown', function (e) {
  if (!space) {
    switch (e.keyCode) { // 방향키 입력
      case 38: moveInit(0); break; // Up
      case 40: moveInit(1); break; // Down
      case 37: moveInit(2); break; // Left
      case 39: moveInit(3); break; // Right
      case 32: space = true; yellow(now); break; // Space
    }
  }
  else if (space) { // 스페이스바를 누른 후 방향키 입력
    switch (e.keyCode) {
      case 38: spaceBar(1); break; // Up Creeper Kill
      case 37: spaceBar(2); break; // Left Enderman Kill
      case 39: spaceBar(3); break; // Right Spider Kill
      case 40: spaceBar(4); break; // Down Zombie Kill
      case 32: red(now); break;
    }
    space = false;
  }
  e.preventDefault(); // 다른 임력을 막는 설정
});

/* 입력방향에 따라 칸을 움직이는 함수 */
function moveInit(Dir) {
  let temp = now + dir[Dir];
  if (Dir == 2 && (now == 0 || now == 3 || now == 6)) return; // 왼쪽 벽에 붙을경우 왼쪽이동 방지
  if (Dir == 3 && (now == 2 || now == 5 || now == 8)) return; // 오른쪽 벽에 붙을경우 오른쪽이동 금지
  if (temp >= 0 && temp <= 8) {
    base(now); red(temp);
    now = temp;
  }
}

/* 스페이스바 입력 후 치료하기 위한 함수 */
function spaceBar(Dir) {
  if (Dir == board[now]) {
    img(now, 5); board[now] = 0;
    img(now, 0);
  }
  else red(now);
}

///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////