var NoughtsAndCrosses;
const Player1 = 'X';
const AI = 'O';
const WinningPattern = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	NoughtsAndCrosses = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof NoughtsAndCrosses[square.target.id] == 'number') {
		turn(square.target.id, Player1)
		if (!gameResult(NoughtsAndCrosses, Player1) && !Draw()) turn(bestSpot(), AI);
	}
}

function turn(squareId, player) {
	NoughtsAndCrosses[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = gameResult(NoughtsAndCrosses, player)
	if (gameWon) gameOver(gameWon)
}

function gameResult(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of WinningPattern.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of WinningPattern[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == Player1 ? "green" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	Winner(gameWon.player == Player1 ? "WINNER" : "LOST");
}

function emptySquares() {
	return NoughtsAndCrosses.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(NoughtsAndCrosses, AI).index;
}

function Draw() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "blue";
			cells[i].removeEventListener('click', turnClick, false);
		}
		Winner("Tie Game!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var FreeSlot = emptySquares();

	if (gameResult(newBoard, Player1)) {
		return {score: -10};
	} else if (gameResult(newBoard, AI)) {
		return {score: 10};
	} else if (FreeSlot.length === 0) {
		return {score: -10};
	}
	var moves = [];
	for (var i = 0; i < FreeSlot.length; i++) {
		var move = {};
		move.index = newBoard[FreeSlot[i]];
		newBoard[FreeSlot[i]] = player;

		if (player == AI) {
			var result = minimax(newBoard, Player1);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, AI);
			move.score = result.score;
		}

		newBoard[FreeSlot[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === AI) {
		var bestScore = -100;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 100;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}