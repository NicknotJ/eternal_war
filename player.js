class Player {
  constructor(name, startingHandSize = 26){
    this.name = name;
    this.startingHandSize = startingHandSize;
  }
}

//52 cards in a deck. Suits are numbered 2-10 -> Jack-> Queen -> King -> Ace
//Probably just don't have jokers.
//Do we care about suits? Not at the start. 

const player1 = new Player('player1', 26);
const player2 = new Player('player2', 26);

module.exports = {
  player1,
  player2
}