var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

function initializeTemp(temp) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;
        }
    }
}

function setTemp(board, temp) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }
        }
    }
}

function setColor(temp, colour) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = colour;
            }
        }
    }
}

function resetColor() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j].style.color = "green";
        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]

let generate_easy = document.getElementById('generate-sudoku-easy')
let generate_medium = document.getElementById('generate-sudoku-medium')
let generate_hard = document.getElementById('generate-sudoku-hard')
let generate_random = document.getElementById('generate-sudoku-random')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0)
                arr[i][j].innerText = board[i][j]
            else
                arr[i][j].innerText = ''
        }
    }
}


generate_easy.onclick = function () {
    
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp, "blue")
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    xhrRequest.send()
}

generate_medium.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp, "#F6BE00")
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=medium')
    xhrRequest.send()
}

generate_hard.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp, "red")
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=hard')
    xhrRequest.send()
}

generate_random.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp, "black")
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=random')
    xhrRequest.send()
}

function isSafe(board, r, c, no){

    for(var i = 0; i < 9; i++){
        if(board[i][c] == no || board[r][i] == no){
            return false;
        }
    }
    var sx = r - r % 3;
    var sy = c - c % 3;

    for(var x = sx; x < sx + 3; x++){
        for(var y = sy; y < sy + 3; y++){
            if(board[x][y] == no){
                return false;
            }
        }
    }
    return true;
}

function solveSudokuHelper(board,r,c){

    if(r == 9){
        changeBoard(board);
        return true;
    }
    if(c == 9){
        return solveSudokuHelper(board, r + 1, 0);
    }
    if(board[r][c] != 0){
        return solveSudokuHelper(board, r, c + 1);
    }
    for(var i = 1; i <= 9; i++){
        if(isSafe(board, r, c, i)){
            board[r][c] = i;
            var success = solveSudokuHelper(board, r, c + 1);
            if(success == true){
                return true;
            }
            board[r][c] = 0;
        }
    }
    return false;
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0);
}

solve.onclick = function () {
    solveSudoku(board)
}