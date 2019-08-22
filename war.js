class warGame {
  constructor(numPlayers, pile = [], players = []){
    this.numPlayers = numPlayers;
    this.winner = undefined;
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
}

module.exports = {
  warGame
}