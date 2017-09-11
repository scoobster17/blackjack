import Card from './card';

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

/**
 * Create a deck of cards object utilising the Card class
 */
class Deck {
	constructor() {
		this.cards = Deck.createDeck();
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