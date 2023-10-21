let area = document.getElementById('area');
let cells = document.getElementsByClassName('cells');
let whoWins = document.getElementById('whoWins');
let current = document.getElementById('currentPl');
let erCelss = document.getElementById('error');

let roundHistory = [];

let player = 'X';
let ai = 'O';

let stat = {
    "X": 0,
    "O": 0,
    "D": 0,
}

let winCombination = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

for (let i = 1; i <= 9; i++) {
    area.innerHTML += `<div class="cells" pos="${i}"></div>`;
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellsOnclick);
}

function cellsOnclick() {
    let data = [];
    if (!this.innerHTML) {
        this.innerHTML = player;
    } else {
        erCelss.innerHTML = "Бул ячайка толтурулган!";
        let error = new Audio('./error.mp3');
        error.play();
        setTimeout(() => {
            erCelss.innerHTML = "";
        }, 3000);
    }
    for (let i in cells) {
        if (cells[i].innerHTML == player) {
            data.push(parseInt(cells[i].getAttribute('pos')));
        }
    }
    if (checkWinner(data)) {
        stat[player] += 1;
        whoWins.innerHTML = "Утту:" + " "+ [player];
        roundHistory.push(whoWins.innerHTML);
        document.getElementById('roundHistory').innerHTML += `Утту: ${player}` + " ";
        document.getElementById('sX').innerHTML = stat.X;
        document.getElementById('sO').innerHTML = stat.O;
        console.log(stat);
        refresh();
    } else {
        let draw = true;
        for (let i in cells) {
            if (cells[i].innerHTML == "") draw = false;
        }
        if (draw) {
            stat.D += 1;
            whoWins.innerHTML = "Тен чыкты!";
            roundHistory.push(whoWins.innerHTML);
            document.getElementById('roundHistory').innerHTML += "Тен чыкты!";
            document.getElementById('sD').innerHTML = stat.D;
            refresh();
        }
    }
    player = player === "X" ? "O" : "X";
    current.innerHTML = player;
}

function checkWinner(data) {
    for (let i in winCombination) {
        let win = true;
        for (let j in winCombination[i]) {
            let id = winCombination[i][j];
            let ind = data.indexOf(id);
            if (ind == -1) {
                win = false;
            }
        }
        if (win) return true;
    }
    return false;
}

function refresh() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
}