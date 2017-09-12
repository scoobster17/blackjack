import Deck from './equipment/cards/deck';
import Dealer from './people/dealer';
import Player from './people/player';

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

const dealCard = (person) => {
	deck.cards = dealer.dealCard(person, deck.cards);
};

// create a player with methods (class)
const player = new Player(0);
participants.push(player);

// pick cards, alternating between dealer and player until they have 2
for (let i=0; i<=1; i++) {
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

// check game status, after cards have been dealt
let winners = [];
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

// add event listeners for events above

// create a game class? holding situations to be in, controlling outcomes?