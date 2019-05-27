const cards = document.querySelectorAll('.memory-card');

var moves = 0;
updateMoves();

var score = 0;
updateScore();

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
	if(lockBoard) return;
	if(this == firstCard) return;
	
	this.classList.add('flip');
	
	if(!hasFlippedCard)
	{
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	
	hasFlippedCard = false;
	secondCard = this;
	moves++;
	updateMoves();
	checkForMatch();
}

function checkForMatch(){
	let isMatch = firstCard.dataset.framework == secondCard.dataset.framework;
	isMatch ? disableCards() : unflipCards();
}

function disableCards(){
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
	score++;
	updateScore();
	setTimeout(() => {
	winScreen();
	}, 500);
}

function resetBoard(){
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffleCards(){
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});	
})();

function updateScore() {
	document.getElementById('score')
	.innerHTML = score;
}

function updateMoves() {
	document.getElementById('moves')
	.innerHTML = moves;
}

function winScreen(){
	if(score==6){
		alert("Wygrana!");
	}
}

function unflipCards(){
	lockBoard = true;
	
	setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			
			lockBoard = false;
		}, 500);
}

cards.forEach(card=>card.addEventListener('click', flipCard));