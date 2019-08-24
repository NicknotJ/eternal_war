const player = require('../player.js');
const chai = require('chai');
const assert = chai.assert;
const deck = require('../deck');
const war = require('../war');

describe('warGame', () => {
  const newGame = new war.warGame(4);
  //need a beforeEach that sets up a fake game.
  it('Should have a parameter with the number of players', () => {
    assert.equal(newGame.numPlayers, 4);
  });
  it('Should have a parameter called winner that starts undefined', () => {
    assert.equal(newGame.winner, undefined);
  });
  it('Should have a parameter called pile that defaults to an empty array OR is an input', () => {
    assert.equal(newGame.pile[0], undefined);
    let example = new war.warGame(4, ['Some random stuff']);
    assert.equal(example.pile[0], 'Some random stuff');
    assert.equal(example.pile.length, 1);
  });
  it('Should have a parameter called players that defaults to an empty array OR is the input', () => {
    assert.equal(newGame.players[0], undefined);
    let example = new war.warGame(4, ['Some random stuff'], [{}, {}, 'Some random stuff']);
    assert.equal(example.players.length, 3);
    assert.equal(example.players[2], 'Some random stuff');
  });
  it('Should have a method called join which adds a player to the players parameter', () => {
    assert.isDefined(newGame.join, 'join is defined');
    newGame.join({name: 'player0'});
    assert.equal(newGame.players.length, 1);
    assert.equal(newGame.players[0].name, 'player0');
  });
  it('Should have a method called addPile which adds a card to the pile', () => {
    assert.isDefined(newGame.addPile, 'addPile is defined');
    newGame.addPile({value: 4, suit: 'diamond'});
    assert.equal(newGame.pile.length, 1);
  });
  it('Should have a method called removePile which removes and returns a card from the pile', () => {
    assert.isDefined(newGame.removePile, 'removePile is defined');
    assert.equal(newGame.removePile().value, 4);
    assert.equal(newGame.pile.length, 0);
  });
  it('Should have a method called removePlayer which removes a player from the players array', () => {
    assert.isDefined(newGame.removePlayer, 'removePlayer is defined');
    newGame.join({name: 'player1'});
    newGame.join({name: 'player2'});
    assert.equal(newGame.players.length, 3);
    assert.equal(newGame.players[1].name, 'player1');
    newGame.removePlayer('player1');
    assert.equal(newGame.players[1].name, 'player2');
    assert.equal(newGame.players.length, 2);
  });
  it('Should have a method called giveCards which gives one player all of the cards in the pile', () => {
    newGame.addPile({value: 4});
    newGame.addPile({value: 3});
    newGame.addPile({value: 2});
    assert.equal(newGame.pile.length, 3);
    let playerCards = new player.Player('playerCards')
    newGame.join(playerCards);
    newGame.giveCards(playerCards);
    assert.equal(newGame.pile.length, 0);
    assert.equal(newGame.players[2].playerDeck.length, 3);
  });
  it('Should have a method called receiveCards which takes one card from all of the listed players', () => {
    let player1 = new player.Player('player1', 10);
    player1.createPlayerDeck();
    let player2 = new player.Player('player2', 10);
    player2.createPlayerDeck();
    let player3 = new player.Player('player3', 10);
    player3.createPlayerDeck();
    let example = new war.warGame(3, []);
    example.join(player1);
    example.join(player2);
    example.join(player3);
    example.receiveCards();
    assert.equal(example.pile.length, 3);
  });
  it('Should have a method called determineWinner that compares all cards and, if possible, returns a single winner', () => {
    let example = new war.warGame(3, []);
    let player1 = new player.Player('player1', 3);
    player1.receiveCard({value: 4, suit: 'diamond'});
    player1.receiveCard({value: 4, suit: 'diamond'});
    player1.receiveCard({value: 4, suit: 'diamond'});
    let player2 = new player.Player('player2', 3);
    player2.receiveCard({value: 3, suit: 'diamond'});
    player2.receiveCard({value: 3, suit: 'diamond'});
    player2.receiveCard({value: 3, suit: 'diamond'});
    let player3 = new player.Player('player3', 3);
    player3.receiveCard({value: 2, suit: 'diamond'});
    player3.receiveCard({value: 2, suit: 'diamond'});
    player3.receiveCard({value: 2, suit: 'diamond'});
    example.join(player1);
    example.join(player2);
    example.join(player3);
    example.receiveCards();
    assert.equal(example.determineWinner()[0], player1);
    let example2 = new war.warGame(0, []);
    let player4 = new player.Player('player4', 2);
    let player5 = new player.Player('player5', 2);
    player4.receiveCard({value: 4, suit: 'spade'});
    player4.receiveCard({value: 4, suit: 'spade'});
    player5.receiveCard({value: 4, suit: 'club'});
    player5.receiveCard({value: 4, suit: 'club'});
    example2.join(player4);
    example2.join(player5);
    example2.receiveCards();
    console.log(example2.determineWinner());
    assert.equal(example2.determineWinner().length, 2);
    
  })
})

/*class warGame {
  constructor(numPlayers, pile = [], players = []){
    this.numPlayers = numPlayers;
    this.winner = undefined;
    this.pile = pile;
    this.players = players;
  }
}*/