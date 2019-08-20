const war = require('./war');
class Player {
  constructor(name, startingHandSize = 26, playerDeck = []){
    this.name = name;
    this.startingHandSize = startingHandSize;
    this.playerDeck = playerDeck;
  }
  //playerDeck should be a queue eventually
  createPlayerDeck(num, deck){
    for(let x = 0; x < num; x++){
      let newCard = Math.floor(Math.random() * deck.length);
      this.playerDeck.push(newCard);
    }
  }
}

//52 cards in a deck. Suits are numbered 2-10 -> Jack-> Queen -> King -> Ace
//Probably just don't have jokers.
//Do we care about suits? Not at the start. 


module.exports = {
  Player
  
}