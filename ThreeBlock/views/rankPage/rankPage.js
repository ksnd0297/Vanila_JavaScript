function prev() {
  var offset = parseInt(document.getElementById("offset").value)-5;
  if(offset < 0) alert("첫 페이지 입니다!");
  else location.href = `http://localhost:3000/rank/${offset}`;
}

function next() {
  var offset = parseInt(document.getElementById("offset").value)+5;
  var count = parseInt(document.getElementById("count").value);
  if(offset > count) alert("마지막 페이지 입니다!");
  else location.href = `http://localhost:3000/rank/${offset}`;
}