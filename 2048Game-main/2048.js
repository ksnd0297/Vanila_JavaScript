///////////////////////////////////////////////////////////////////////////////////////////////////
/* 전역함수 ( 사용과 초기화에 주의 ) */
var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; // 보드
var boardName = [["0", "1", "2", "3"], ["4", "5", "6", "7"], ["8", "9", "10", "11"], ["12", "13", "14", "15"]]; // 보드판의 이름
var check = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; // 합쳐졌는지 확인
var score = 0; // 게임의 점수
var subscore = 0; //한번 움직일 때의 점수
var move = false; // 움직임이 없다면 새로운 수를 만들면 안됨

///////////////////////////////////////////////////////////////////////////////////////////////////
/* 스크립트 사용 */
Init(); // 가장처음 숫자 2개 생성
//Display(); // 디버깅용
///////////////////////////////////////////////////////////////////////////////////////////////////
/* 함수들 */

/* 키보드의 입력을 받는 함수 */
window.addEventListener("keydown", function (event) {
  let New = true;
  switch (event.key) {
    case "ArrowDown": Rotate(2); Up(); Rotate(2); break; // 아래 회전(2) 위() 회전(2)
    case "ArrowUp": Up(); break; // 위 위()
    case "ArrowLeft": Rotate(1); Up(); Rotate(3); break; // 왼쪽 회전(1) 위() 회전 (3)
    case "ArrowRight": Rotate(3); Up(); Rotate(1); break; // 오른쪽 회전(3) 위() 회전(1)
    default: New = false; alert("방향키를 눌러주세요 !"); break; // 그 외의 방향키를 눌렀을 때
  }
  if (New && move) { // 움직임이 있고 방향키를 눌렀을 때 새로운 수 생성
    Newnum(); Display();
    move = false;
  }
}, true);

/* 초기 설정 함수 */
function Init() {
  Newnum(); Newnum();// 새로운 숫자 2개 생성
  Display(); // 화면에 표시
}

/* 새로운 숫자를 만드는 함수 */
function Newnum() {
  while (1) {
    let y = parseInt(Math.random() * 4);
    let x = parseInt(Math.random() * 4);
    if (board[y][x] == 0) { // 랜덤한 위치가 빈 공간일 때
      let Num = parseInt(Math.random() * 10) + 1;
      if (Num == 4) board[y][x] = 4; // 10% 4
      else board[y][x] = 2; // 90% 2
      return;
    }
  }
}

/* 화면의 정보를 갱신하는 함수 */
function Display() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      var node = document.getElementById(boardName[y][x]);
      if (board[y][x] != 0) { node.innerHTML = board[y][x]; color(y, x); } // 빈 공간이 아닌 타일 색칠
      else { node.innerHTML = " "; node.style.backgroundColor = "#eee4da59"; }
    }
  }
  score += subscore;
  if (subscore != 0) {
    var sscore = document.getElementById("subscore");
    sscore.innerHTML = "+" + subscore; subscore = 0;
    sscore.style.transform = "scale(1.2)";
    setTimeout(function () { // 0.3 초 후 축소
      sscore.style.transform = "scale(0)";
      sscore.style.transition = "0.5s";
    }, 500)
  }
  document.getElementById("score").innerHTML = score;
}

/* 시계방향으로 회전시키는 함수 */
function Rotate(count) {
  while (count--) {
    let tempboard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let tempcheck = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (let y = 0; y < 4; y++) { // 시계방향 회전
      for (let x = 0; x < 4; x++) {
        tempboard[y][x] = board[3 - x][y];
        tempcheck[y][x] = check[3 - x][y];
      }
    }
    for (let y = 0; y < 4; y++) {  //다시 재 입력
      for (let x = 0; x < 4; x++) {
        board[y][x] = tempboard[y][x];
        check[y][x] = tempcheck[y][x];
      }
    }
  }
}

/* 업 함수 */
function Up() {
  for (let y = 0; y < 4; y++)
    for (let x = 0; x < 4; x++)
      check[y][x] = 0;

  for (let x = 0; x < 4; x++)  // 0 ~ 3 행 체크
    for (let y = 1; y < 4; y++)  // 1열 ~ 3열 체크
      if (board[y][x] != 0) { // board[y][x] 의 값이 0(빈 공간)이 아닐 때
        tempY = y - 1;
        while (tempY > 0 && board[tempY][x] == 0) tempY--; // tempY의 값이 0보다 크고 빈 공간이 아닐때까지 내림
        if (tempY == 0 && board[tempY][x] == 0) { // 아래가 전부 빈 공간일 때
          board[tempY][x] = board[y][x];
          board[y][x] = 0; move = true;
        }
        else if (board[tempY][x] != board[y][x]) { // 아래의 값이 다를 때 
          if ((tempY + 1) == y) continue;
          board[tempY + 1][x] = board[y][x]; // 그 위에 블록을 저장
          board[y][x] = 0; move = true;
        }
        else { // 아래의 값이 같을 때
          if (!check[tempY][x]) {
            subscore += board[tempY][x]; // 스코어 Up
            board[tempY][x] *= 2;
            board[y][x] = 0;
            check[tempY][x] = true;
          }
          else {
            board[tempY + 1][x] = board[y][x];
            board[y][x] = 0;
          }
          move = true;
        }
      }
  if (gameOver()) alert("게임 오버!"); // 게임오버 체크
}

/* 게임오버 체크 */
function gameOver() { //상 하 좌 우로 합칠 수 있는 수가 있는지 판단.
  let dy = [1, -1, 0, 0];
  let dx = [0, 0, 1, -1];
  for (let y = 0; y < 4; y++)
    for (let x = 0; x < 4; x++)
      if (board[y][x] == 0) return false; // 빈 공간이 있을 때
  for (let k = 0; k < 4; k++)
    if ((y + dy[k]) >= 0 && (y + dy[k]) < 4 && (x + dx[k]) >= 0 && (x < dx[k]) < 4) // 범위 밖인지를 확인
      if (board[y][x] == board[y + dy[k]][x + dx[k]]) return false; //상 하 좌 우로 합칠 공간이 있을 때
  return true;
}

/* 블록에 색을 칠하는 함수 */
function color(y, x) {
  let num = board[y][x];
  let block = document.getElementById(boardName[y][x]);

  if (num == 2) block.style.backgroundColor = "#FAF082";
  else if (num == 4) block.style.backgroundColor = "#FAEB78";
  else if (num == 8) block.style.backgroundColor = "#FFE146";
  else if (num == 16) block.style.backgroundColor = "#FFDC3C";
  else if (num == 32) block.style.backgroundColor = "#FFD228";
  else if (num == 64) block.style.backgroundColor = "#FFC81E";
  else if (num == 128) block.style.backgroundColor = "#FFBE0A";
  else if (num == 256) block.style.backgroundColor = "#FFB400";
  else if (num == 512) block.style.backgroundColor = "#FFAF0A";
  else if (num == 1024) block.style.backgroundColor = "#FFA500";
  else if (num == 2048) block.style.backgroundColor = "#FF9B00";
  if(check[y][x]) { // 합쳐질 때 확대
    block.style.transform = "scale(1.2) ";
    block.style.transition = "0.2s";
    setTimeout(function() { // 0.3 초 후 축소
      block.style.transform = "scale(1.0)";
    },200)
  }
}
