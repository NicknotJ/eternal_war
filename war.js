class warGame {
  constructor(numPlayers, pile = [], players = []){
    this.numPlayers = numPlayers;
    //this will signal game end if defined
    this.winner = undefined;
    //this simply signals who should get all the cards
    this.handWinner = undefined;
    this.pile = pile;
    this.players = players;
    this.gameOver = false;
    this.leftOverPile = [];
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
  addLeftOver(card){
    this.leftOverPile.push(card);
  }
  pileToLeftOver(){
    let length = this.pile.length;
    for(let x = 0; x < length; x++){
      this.addLeftOver(this.removePile());
    }
  }
  //this might need to be changed to reference a variable rather than a string
  removePlayer(playerName){
    for(let x = 0; x < this.players.length; x++){
      if(this.players[x].name === playerName){
        this.numPlayers--;
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
  receiveCards(){
    //This should probably also check if the player has any cards. no cards = remove from game
    for(let x = 0; x < this.players.length; x++){
      this.addPile(this.players[x].playCard());
    }
  }
  determineWinner(){
    let winnerArray = [];
    let maxValue = 0;
    for(let x = 0; x < this.pile.length; x++){
      if(this.pile[x].value > maxValue){
        winnerArray = [];
        winnerArray.push(this.pile[x].owner);
        maxValue = this.pile[x].value;
      } else if(this.pile[x].value === maxValue){
        winnerArray.push(this.pile[x].owner);
      }
    }
    return winnerArray;
    //excess pile for ties?
  }
  checkGame(){
    if(this.players.length === 1){
      this.gameOver = true;
      this.winner = this.players[0];
    }
    if(this.players.length === 0){
      this.gameOver = true;
      this.winner = null;
    }
    return this.gameOver;
  }
  warTie(players){
    //players is expected to be an array
    if(players.length === 1){
      return players[0];
    }
    if(players.length === 0){
      return null;
    }
    //remove everything from pile
    this.pileToLeftOver();
    for(let x = 0; x < players.length; x++){
      this.addLeftOver(players[x].playCard());
      this.addLeftOver(players[x].playCard());
      this.addLeftOver(players[x].playCard());
      this.addPile(players[x].playCard());
    }
    return this.warTie(this.determineWinner());
  }
}

module.exports = {
  warGame
}