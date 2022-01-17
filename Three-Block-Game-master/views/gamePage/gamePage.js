// ! 전역 변수 
var board = Array.from(Array(10), () => Array(10).fill(0)) // * board 에 값 저장
var boardCheck = Array.from(Array(10), () => Array(10).fill(1))// * myBlock 사이 장애물이 있는지를 판단하기 위한 공간
var boardName = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"],
["30", "31", "32", "33", "34", "35", "36", "37", "38", "39"],
["40", "41", "42", "43", "44", "45", "46", "47", "48", "49"],
["50", "51", "52", "53", "54", "55", "56", "57", "58", "59"],
["60", "61", "62", "63", "64", "65", "66", "67", "68", "69"],
["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"],
["80", "81", "82", "83", "84", "85", "86", "87", "88", "89"],
["90", "91", "92", "93", "94", "95", "96", "97", "98", "99"]
] // * 0 : 빈 공간 1 : 블럭 공간 2 : myBlock 공간
var dir = [[-1, 0], [0, -1], [0, 1], [1, 0]]; // * 4방향 이동
var y = 0, x = 0; // * 현재의 X 와 Y 좌표
var myBlock = [[0, 0], [0, 0], [0, 0]]; // * Enter 로 저장한 세 블럭 저장
var count = 0; // * myBlock이 3개인지 판단
var myScore = 0;
var time = 3;
// ! 전역 변수

// ! 키보드 입력 함수 
window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp": move(0); break;// * Up
    case "ArrowLeft": move(1); break;// * Left
    case "ArrowRight": move(2); break;// * Right
    case "ArrowDown": move(3); break;// * Down
    case "Enter": click(); break; // * Enter
  }
  event.preventDefault(); // * 다른 임력을 막는 설정
});

// ! 초기 실행 함수
init();

// ! 초기화 함수
function init() {
  let num = 0; // * block 에 들어갈 수 입력 1 ~ 9
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      do { num = parseInt(Math.random() * 10); } while (num == 0)
      board[y][x] = num;
      let block = document.getElementById(boardName[y][x]);
      block.innerHTML = num;
    }
  }
  color(y, x, 'blue'); // * 가장 초기위치 지정
  score.innerHTML = 0;
}

// ! 20초 시간제한 타이머 함수
var interval = setInterval(function(){
  timer.innerHTML = time;
  time--;
  if(time == -1) {
    clearInterval(interval);
    gameover();
  }
},1000)

// ! 게임오버 함수
function gameover() {
  var userId;
  userId = prompt("이름을 입력해주세요 !");
  document.getElementById('hiddenName').value = userId;
  document.getElementById('hiddenScore').value = myScore;
   document.submit.submit();
}

// ! 디스플레이 갱신 함수 
function display() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let block = document.getElementById(boardName[y][x]);
      if (board[y][x] == 0) block.innerHTML = " ";
      else block.innerHTML = board[y][x];
    }
  }
  score.innerHTML = myScore;
}

// ! 컬러링 함수 
function color(y, x, coloring) {
  let block = document.getElementById(boardName[y][x]);
  if (coloring === 'block')  block.style.backgroundColor = "white"; 
  else if (coloring === 'blue') block.style.backgroundColor = "blue";
  else if (coloring === 'red') block.style.backgroundColor = "red";
}

// ! 현재 블록 이동 함수
function move(movedir) {
  if (checkDir(y + dir[movedir][0], x + dir[movedir][1])) {
    let block = document.getElementById(boardName[y][x]);
    if (block.style.backgroundColor != "red") color(y, x, 'block');
    y += dir[movedir][0]; x += dir[movedir][1];
    block = document.getElementById(boardName[y][x]);
    if (block.style.backgroundColor != "red") color(y, x, 'blue');
  }
}

// ! 이동범위 체크 함수
function checkDir(y, x) {
  if (y >= 0 && y < 10 && x >= 0 && x < 10) return true;
  else return false;
}

// ! Enter 입력 시 블록 클릭 함수
function click() {
  if (board[y][x] && boardCheck[y][x] != 2) {
    color(y, x, 'red');
    myBlock[count][0] = y; myBlock[count][1] = x; count++;
    boardCheck[y][x] = 2; // * myBlock 의 위치를 2로 둔다.
    if (count == 3) {
      if (scoreUp()) {
        let A = board[myBlock[0][0]][myBlock[0][1]]; // * 보너스 점수 체크
        let C = board[myBlock[1][0]][myBlock[1][1]];
        let B = board[myBlock[2][0]][myBlock[2][1]];
        if((A == B) && (B == C)) myScore += 20;
        else if((A == B) || (B == C) || (A == C)) myScore += 5;
        for (let i = 0; i < 3; i++) {
          let nowBlock = board[myBlock[i][0]][myBlock[i][1]];
          board[myBlock[i][0]][myBlock[i][1]] = 0;
          boardCheck[myBlock[i][0]][myBlock[i][1]] = 0; // * myBlock 처리 장애물 제거
          myScore += nowBlock;
        }
      }
      else for (let i = 0; i < 3; i++) boardCheck[myBlock[i][0]][myBlock[i][1]] = 1;
      for (let i = 0; i < 3; i++) color(myBlock[i][0], myBlock[i][1], 'block');
      color(y, x, 'blue'); count = 0;
      display();
    }
  }
}

// ! 점수를 올려주는 함수
function scoreUp() {
  for (let i = 0; i < 3; i++) {
    let lineCount = 0; // * 같은 라인에 블럭이 몇 개 있는지를 판단.
    for (let j = 0; j < 3; j++)
      if (i != j && (myBlock[i][0] == myBlock[j][0] || myBlock[i][1] == myBlock[j][1])) lineCount++; // * 같은 라인의 블록 체크
    if (lineCount == 2) { // * 자신과 같은 라인의 블록이 2개 더 있음
      for (let k = 0; k < 3; k++) {
        if ((i != k) && (myBlock[i][0] == myBlock[k][0])) { // * y 축의 좌표가 똑같을 경우 (x 좌표 비교)
          if (!blockingCheckX(myBlock[i][1], myBlock[k][1], i)) return false;
        }
        else if ((i != k) && (myBlock[i][1] == myBlock[k][1])) {  // * x 축의 좌표가 똑같을 경우 (y 좌표 비교)
          if (!blockingCheckY(myBlock[i][0], myBlock[k][0], i)) return false;
        }
      }
      return true;
    }
  }
  return false;
}

// ! x 축 장애물 체크 함수
function blockingCheckX(swapA, swapB, i) { // * myBlock의 X축 장애물 체크
  if (swapA > swapB) [swapA, swapB] = [swapB, swapA];
  for (let start = swapA + 1; start < swapB; start++) {
    if (boardCheck[myBlock[i][0]][start] == 2) continue; // * myBlock 이면 넘김.
    if (boardCheck[myBlock[i][0]][start] == 1) return false;
  }
  return true;
}

// ! y 축 장애물 체크 함수
function blockingCheckY(swapA, swapB, i) { // * myBlock의 Y축 장애물 체크
  if (swapA > swapB) [swapA, swapB] = [swapB, swapA];
  for (let start = swapA + 1; start < swapB; start++) {
    if (boardCheck[start][myBlock[i][1]] == 2) continue; // * myBlock 이면 넘김.
    if (boardCheck[start][myBlock[i][1]] == 1) return false;
  }
  return true;
}