class warGame {
  constructor(numPlayers, pile = [], players = []){
    this.numPlayers = numPlayers;
    //this will signal game end if defined
    this.winner = undefined;
    //this simply signals who should get all the cards
    this.handWinner = undefined;
    this.pile = pile;
    this.players = players;
  }
  join(player){
    this.players.push(player);
    this.numPlayers++;
  }
  addPile(card){
    this.pile.push(card);
  }
  removePile(){
    return this.pile.pop();
  }
  //this might need to be changed to reference a variable rather than a string
  removePlayer(playerName){
    for(let x = 0; x < this.players.length; x++){
      if(this.players[x].name === playerName){
        this.players.splice(x, 1);
        break;
      }
    }
  }
  giveCards(player){
    let length = this.pile.length;
    for(let x = 0; x < length; x++){
      let card = this.removePile();
      player.receiveCard(card);
    }
  }
}

module.exports = {
  warGame
}