/**
 * Create a card object which holds information about the card
 */
class Card {
	constructor(id, suit, index) {
		this.id = id;
		this.suit = suit;
		if (index > 1 && index < 11) this.values = [index];
		if (index > 11) this.values = [10];
		switch (index) {

			case 1:
				this.values = [1, 11];
				this.name = 'Ace';
				break;

			case 2:
				this.name = 'Two';
				break;

			case 3:
				this.name = 'Three';
				break;

			case 4:
				this.name = 'Four';
				break;

			case 5:
				this.name = 'Five';
				break;

			case 6:
				this.name = 'Six';
				break;

			case 7:
				this.name = 'Seven';
				break;

			case 8:
				this.name = 'Eight';
				break;

			case 9:
				this.name = 'Nine';
				break;

			case 10:
				this.name = 'Ten';
				break;

			case 11:
				this.name = 'Jack';
				break;

			case 12:
				this.name = 'Queen';
				break;

			case 13:
				this.name = 'King';
				break;

			default:
				break;

		}
	}
}

export default Card;