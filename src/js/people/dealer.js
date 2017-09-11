class Dealer {
	constructor(id) {
		this.id = id;
		this.cards = [];
	}

	dealCard(person, cards) {
		person.cards.push(cards[0]);
		return cards.slice(1);
	}
}

export default Dealer;