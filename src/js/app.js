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

// create a dealer with methods (class)
const dealer = new Dealer(0);
participants.push(dealer);

// create a player with methods (class)
const player = new Player(0);
participants.push(player);

// TODO trigger with 'deal' button
gameInProgress = true;

const dealRoundOfCards = (initial) => {

	// deal card function to utilise the dealer to distribute cards
	const dealCard = (person) => {
		deck.cards = dealer.dealCard(person, deck.cards);
	};

	// deal cards, alternating between dealer and player until they have 2 each
	for (let i=0; i <= (initial === true ? 2 : 1); i++) {
		for (let participant of participants) {
			dealCard(participant);
			participant.playing = true;

			// calculate total values and present user option to hit/stick
			participant.cardTotal = 0;
			for (let participantCard of participant.cards) {
				if (participantCard.values.length > 1) {
					participant.cardTotal += 11; // for now, onload will assume 11 to achieve blackjack on first deal
				} else {
					participant.cardTotal += participantCard.values[0];
				}
			}
		}
	}
}
dealRoundOfCards(true);

// check game status, after cards have been dealt
let winners = [];

let checkGameStatus = () => {
	for (let participant of participants) {
		switch (true) {

			case (!participant.playing):
				continue;
				break;

			case (participant.cardTotal < 21):
				continue; // TODO check hit/stick state
				break;

			case (participant.cardTotal === 21):
				winners.push(participant);
				break;

			case (participant.cardTotal > 21):
				participant.playing = false;
				console.log(`${participant.id} is out of the game with a score of ${winner.cardTotal}.`);
				break;

		}
	}
	if (winners.length) winners.forEach((winner) => {
		console.log(`${winner.id} wins with a score of ${winner.cardTotal}!`);
	});
}

checkGameStatus();

// add event listeners for events above
/*const buttons = document.querySelectorAll('.actions button');
buttons.forEach((button) => {
	button.addEventListener('click', (event) => {
		// player wants to hit/stick
		// event.target.getAttribute('data-hit');
	});
});*/

// create a game class? holding situations to be in, controlling outcomes?
// const game = new BlackjackGame();