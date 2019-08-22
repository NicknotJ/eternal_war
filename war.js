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
  removePlayer(playerName){
    for(let x = 0; x < this.players.length; x++){
      if(players[x].name === playerName){
        console.log(`${this.players.splice()} has been removed from the game!`);
        break;
      }
    }
  }
}

module.exports = {
  warGame
}