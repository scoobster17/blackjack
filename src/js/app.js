import Deck from './equipment/cards/deck';
import Dealer from './people/dealer';
import Player from './people/player';

// TODO global closure? Revealing module pattern?
// TODO put vars in config object?
let gameInProgress = false;
let participants = [];
let winners = [];
let stickers = 0;
let playersDealtInRound = 0;
let round = 0;
const playersList = document.getElementById('players');
const buttons = document.querySelectorAll('.actions button');
const newGameBtn = document.getElementById('new-game-trigger');

// create a deck of cards utilising Deck class (only 1 at the moment)
// and shuffle the deck to randomise order of dealing
const deck = new Deck();
deck.shuffle();

// create a player with methods (class)
const player = new Player(1);
participants.push(player);

// create a dealer with methods (class; should extend player??? TODO)
// comes after all players
const dealer = new Dealer(0);
participants.push(dealer);

/**
 * Get current player from a list of participants based on how many players
 * have been dealt to and ended their turn
 * @return {Object} Instance of the player
 */
const getCurrentPlayer = () => participants[playersDealtInRound];

/**
 * Reqeuest the next player in line to make their move.
 * @return {void}
 */
const requestMoveFromNextPlayer = () => {
	let participant = getCurrentPlayer();

	// if participant is a player, ask them to hit / stick. Or just wait for them
	if (participant instanceof Player) {
		console.log(`${participant.id} do you want to hit or stick?`);

	// if the dealer, deal if cardTotal under 17 and end round as dealer is last
	} else {
		while (participant.cardTotal < 17) {
			hit();
		}
		endRound();
	}
}

/**
 * Start a round of dealing cards to every player finishing with dealing to the dealer
 * @return {void}
 */
const startRound = () => {
	playersDealtInRound = 0;
	stickers = 0;
	requestMoveFromNextPlayer();
}

/**
 * Either start a new round, or end a round because:
 *   - declaring a winner
 *   - game is a draw (same score)
 *   - no-one wins (all bust)
 * @return {void}
 */
const endRound = () => {
	if (winners.length) {
		if (winners.length > 1) {
			setTimeout(() => alert('The game is drawn!'));
		} else {
			setTimeout(() => alert(`You win ${winners[0].id} with a score of ${winners[0].cardTotal}!`));
		}

	// if the number of people that have opted to 'stick' matches the number of players
	} else if (stickers = participants.length) {

		// if everyone has stuck with their choice of card
		// find highest score
		const participantsSortedByHighScore = participants
			.sort((a, b) => b.cardTotal - a.cardTotal)
			.filter(participant => participant.cardTotal < 22);

		// if there is a valid high score
		if (participantsSortedByHighScore.length) {

			// this is more for when >1 player against the dealer in future
			const winnersByHighScore = participantsSortedByHighScore.filter((participant) => {
				return participant.cardTotal === participantsSortedByHighScore[0].cardTotal;
			});

			// at the moment this checks dealer vs player but need to consider multiple players in future
			if (winnersByHighScore.length > 1) {
				setTimeout(() => alert('The game is drawn!'));
			} else {
				setTimeout(() => alert(`${winnersByHighScore[0].id} wins with a score of ${winnersByHighScore[0].cardTotal}!`));
			}
		} else {
			setTimeout(() => alert('Nobody won!'));
		}
	} else {
		startRound();
	}
}

/**
 * 'Hit'; request another card to be dealt
 * @return {void}
 */
const hit = () => dealNextCard(getCurrentPlayer());

/**
 * 'Stick'; request to keep current cards for this round
 * @return {void}
 */
const stick = () => {
	stickers++;
	playersDealtInRound++;
	if (playersDealtInRound < participants.length) requestMoveFromNextPlayer();
};

/**
 * Check if the participant has an ace card
 * @param  {Object} participant Instance of the participant being interrogated
 * @return {Number}             Number of aces in hand
 */
const hasAceCard = (participant) => {
	return participant.cards.filter(card => card.name === "Ace").length;
}

/**
 * Reduce an ace's value from 11 to 1 if the card totol has breached the maximum
 * @param  {Object} participant Instance of the participant being interrogated
 * @param  {Number} noOfAces    Number of aces in the participants hand
 * @return {void}
 */
const reduceAceValue = (participant, noOfAces) => {
	participant.cardTotal -= 10;
	const noOfCards = participant.cards.length;
	for (let i=0; i<noOfCards; i++) {
		let card = participant.cards[i];
		if (card.name === "Ace") {
			card.values = card.values.filter(value => {
				return value !== 11;
			});
			break;
		}
	}
}

/**
 * Check participant's game status, after cards have been dealt
 * @param  {Object} participant Instance of the participant being interrogated
 * @return {void}
 */
let checkGameStatus = (participant) => {
	switch (true) {

		// case (participant.cardTotal < 21):
		// 	return;
		// 	break;

		case (participant.cardTotal === 21):
			winners.push(participant);
			// participant.playing = false;
			console.log(`${participant.id} wins with a score of ${participant.cardTotal}!`);
			if (round > 2) stick();
			break;

		case (participant.cardTotal > 21):
			// participant.playing = false;
			// check for ace, if have one lower value to 1
			const noOfAces = hasAceCard(participant);
			if (noOfAces > 0) {
				reduceAceValue(participant, noOfAces);
			} else {
				console.log(`${participant.id} is out of the game with a score of ${participant.cardTotal}.`);
				if (round > 2) stick();
			}
			break;

	}
}

/**
 * Deal card function to utilise the dealer distribute a card to a participant
 * and update the deck to reflect this
 * @param  {Object} person Instance of participant to deal the card to
 * @return {void}
 */
const dealCard = (person) => {
	deck.cards = dealer.dealCard(person, deck.cards);
};

/**
 * Calculate total hand value
 * @param  {Object} participant Instance of the participant being interrogated
 * @return {void}
 */
const calculateTotal = (participant) => {
	participant.cardTotal = 0;
	for (let participantCard of participant.cards) {
		if (participantCard.values.length > 1) {
			participant.cardTotal += 11; // onload will assume value of 11 to achieve blackjack on first deal
		} else {
			participant.cardTotal += participantCard.values[0];
		}
	}
}

/**
 * Update UI with user score and cards
 * @param  {Object} participant Instance of the participant being interrogated
 * @return {void}
 */
const showParticipantTheirScore = (participant) => {
	// this relies on the order of players appended to DOM; in future will be automatically appended to DOM
	const playerContainer = playersList.children[playersDealtInRound];
	const playerCards = playerContainer.querySelector('ul');
	const playerTotal = playerContainer.querySelector('.total');
	const mostRecentCard = participant.cards[participant.cards.length - 1];
	playerContainer.insertAdjacentHTML('beforeend', `<li>${mostRecentCard.name} of ${mostRecentCard.suit}</li>`)
	playerTotal.innerHTML = participant.cardTotal;
};

/**
 * Handle dealing a card to a participant and necessary immediate repercussions
 * @param  {Object} participant Instance of the participant being interrogated
 * @return {void}
 */
const dealNextCard = (participant) => {
	dealCard(participant);
	calculateTotal(participant);
	if (round > 1) checkGameStatus(participant);
	showParticipantTheirScore(participant);
}

/**
 * Start a new game of blackjack
 * @return {void}
 */
const startGame = () => {
	gameInProgress = true;
	round = 1;
	while (round <= 2) {
		playersDealtInRound = 0;
		for (let participant of participants) {
			dealNextCard(participant);
			playersDealtInRound++;
		}
		round++;
	}
	if (!winners.length) {
		startRound();
	} else {
		endRound();
	}
};

/**
 * Add event listeners
 */
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
newGameBtn.addEventListener('click', () => {
	// TODO clear previous game, at the moment a refresh is needed
	startGame();
});

// TODO create a game class? holding situations to be in, controlling outcomes?
// const game = new BlackjackGame();