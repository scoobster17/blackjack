import Deck from './equipment/cards/deck';
import Dealer from './people/dealer';
import Player from './people/player';

let gameInProgress = false;

// create a deck of cards utilising Deck class (only 1 at the moment)
var deck = new Deck();
window.deck = deck; // temp

// shuffle the deck to randomise order of dealing
deck.shuffle();

// create a list of players for the game
let participants = [];
window.participants = participants; // temp

// create a player with methods (class)
const player = new Player(1);
participants.push(player);

// create a dealer with methods (class)
// comes after all players
const dealer = new Dealer(0);
participants.push(dealer);

// TODO trigger with 'deal' button
gameInProgress = true;

let winners = [];
let stickers;

const getCurrentPlayer = () => participants[playersDealtInRound];

const requestMoveFromNextPlayer = () => {
	let player = getCurrentPlayer();
	// if (player) {
	console.log(`${player.id} do you want to hit or stick?`);
	// } else if (Dealer) {
	// 	deal if cardTotal under 17
	// }
}


const startRound = () => {
	playersDealtInRound = 0;
	stickers = 0;
	if (!winners.length) {
		requestMoveFromNextPlayer();
	} else {
		endRound();
	}
}

const endRound = () => {
	if (winners.length) {
		winners.forEach((winner) => {
			console.log(`You win ${winner.id}`);
		});
	} else if (stickers = participants.length) {
		// if everyone has stuck with their choice of card
		// find highest score
		const participantsSortedByHighScore = participants
			.sort((a, b) => b.cardTotal - a.cardTotal)
			.filter(participant => participant.cardTotal < 22);
		if (participantsSortedByHighScore.length) {
			// more for when >1 player in future
			const winnersByHighScore = participantsSortedByHighScore.filter((participant) => {
				return participant.cardTotal === participantsSortedByHighScore[0].cardTotal;
			});
			alert(`${winnersByHighScore[0].id} wins with a score of ${winnersByHighScore[0].cardTotal}!`);
		} else {
			alert('Nobody won!')
		}
	} else {
		startRound();
	}
}

const hit = () => dealNextCard(getCurrentPlayer());

const stick = () => {
	stickers++;
	playersDealtInRound++;
	if (playersDealtInRound < participants.length) {
		requestMoveFromNextPlayer();
	} else {
		endRound();
	}
};

// check game status, after cards have been dealt
let checkGameStatus = (participant) => {
	switch (true) {

		case (participant.cardTotal < 21):
			return;
			break;

		case (participant.cardTotal === 21):
			winners.push(participant);
			// participant.playing = false;
			console.log(`${participant.id} wins with a score of ${participant.cardTotal}!`);
			break;

		case (participant.cardTotal > 21):
			// participant.playing = false;
			// check for ace, if have one lower value to 1
			// if () {
			// } else {
				console.log(`${participant.id} is out of the game with a score of ${participant.cardTotal}.`);
				stick();
			// }
			break;

	}
}

// deal card function to utilise the dealer to distribute cards
const dealCard = (person) => {
	deck.cards = dealer.dealCard(person, deck.cards);
};

// calculate total values and present user option to hit/stick
const calculateTotal = (participant) => {
	participant.cardTotal = 0;
	for (let participantCard of participant.cards) {
		if (participantCard.values.length > 1) {
			participant.cardTotal += 11; // for now, onload will assume 11 to achieve blackjack on first deal
		} else {
			participant.cardTotal += participantCard.values[0];
		}
	}
}

const dealNextCard = (participant) => {
	dealCard(participant);
	calculateTotal(participant);
	if (round > 1) checkGameStatus(participant);
}

let round = 1;
let playersDealtInRound;

const startGame = () => {
	while (round <= 2) {
		for (let participant of participants) {
			dealNextCard(participant);
		}
		round++;
	}
	startRound();
};
startGame();

// participant.playing = true;

// add event listeners for events above
const buttons = document.querySelectorAll('.actions button');
buttons.forEach((button) => {
	button.addEventListener('click', (event) => {

		// see if player wants to hit/stick
		switch (event.target.getAttribute('data-action')) {

			case 'stick':
				stick();
				break;

			case 'hit':
				hit();
				break;

		}

	});
});

// create a game class? holding situations to be in, controlling outcomes?
// const game = new BlackjackGame();