const deck = require('./deck');
class Player {
  constructor(name, startingHandSize = 26, playerDeck = []){
    this.name = name;
    this.startingHandSize = startingHandSize;
    this.playerDeck = playerDeck;
    this.playing = true;
    this.lost = false;
  }
  //playerDeck should be a queue eventually
  createPlayerDeck(num, deck){
    for(let x = 0; x < num; x++){
      let newCard = deck.splice(Math.floor(Math.random() * deck.length), 1);
      newCard[0].owner = this;
      this.playerDeck.push(newCard[0]);
    }
  }
  playCard(){
    return this.playerDeck.pop();
  }
  receiveCard(card){
    card.owner = this;
    this.playerDeck.unshift(card);
  }
  checkStatus(){
    if(!this.playerDeck.length){
      this.playing = false;
      this.lost = true;
    }
  }
  quit(){
    let length = this.playerDeck.length;
    for(let x = 0; x < length; x++){
      this.playCard();
    }
    this.playing = false;
    this.lost = true;
  }
}

//52 cards in a deck. Suits are numbered 2-10 -> Jack-> Queen -> King -> Ace
//Probably just don't have jokers.
//Do we care about suits? Not at the start. 


module.exports = {
  Player
}