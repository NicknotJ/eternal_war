class warGame {
  constructor(numPlayers){
    this.numPlayers = numPlayers;
    this.winner = undefined;
    this.pile = [];
    this.players = [];
  }
}

module.exports = {
  warGame
}