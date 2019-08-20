class Player {
  constructor(name, startingHandSize = 10){
    this.name = name;
    this.startingHandSize = startingHandSize;
  }
}

//52 cards in a deck. Suits are numbered 2-10 -> Jack-> Queen -> King -> Ace
//Probably just don't have jokers.
//Do we care about suits? Not at the start. 

const player1 = new Player('player1');
const player2 = new Player('player2', 26);

const deck = [];
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'spade'});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'heart'});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'club'});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'diamond'});
}
console.log(deck);
module.exports = {
  player1,
  player2
}