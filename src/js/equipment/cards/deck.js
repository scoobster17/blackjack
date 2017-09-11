import Card from './card';

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

/**
 * Create a deck of cards object utilising the Card class
 */
class Deck {
	constructor() {
		this.cards = Deck.createDeck();
	}

	shuffleDeck() {
		let shuffledDeck = [];
		while (shuffledDeck.length !== this.cards.length) {
			var randomCardId = Math.floor(Math.random() * this.cards.length);
			var matches = shuffledDeck.filter(cardId => cardId === randomCardId);
			if (!matches.length) shuffledDeck.push(randomCardId);
		}
		this.cards = shuffledDeck;
	}

	static createDeck() {
		let id = 0;
		let cards = [];
		suits.forEach((suit) => {
			for (let i=1; i<=13; i++) {
				cards.push(new Card(id++, suit, i));
			}
		});
		return cards;
	}
}

export default Deck;