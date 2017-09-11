import Deck from './equipment/cards/deck';
import Dealer from './people/dealer';
import Player from './people/player';

// create a deck of cards utilising Deck class (only 1 at the moment)
var deck = new Deck();
window.deck = deck; // temp

// shuffle the deck to randomise order of dealing
deck.shuffle();

// create a dealer with methods (class)
const dealer = new Dealer(0);
window.dealer = dealer; // temp

const dealCard = (person) => {
	deck.cards = dealer.dealCard(person, deck.cards);
};

// create a player with methods (class)
const player = new Player(0);
window.player = player; // temp

// pick cards, alternating between dealer and player until they have 2
dealCard(dealer);
dealCard(player);
dealCard(dealer);
dealCard(player);

// calculate total values and present user option to hit/stick

// add event listeners for events above

// create a game class? holding situations to be in, controlling outcomes?