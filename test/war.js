const player = require('../player.js');
const chai = require('chai');
const assert = chai.assert;
const deck = require('../deck');
const war = require('../war');

describe('warGame', () => {
  const newGame = new war.warGame(4);
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
    newGame.join({name: 'playerCards'});
    newGame.addPile({value: 4});
    newGame.addPile({value: 3});
    newGame.addPile({value: 2});
    assert.equal(newGame.pile.length, 3);
    let playerCards = new player.Player('playerCards')
    newGame.giveCards(playerCards);
    assert.equal(newGame.pile.length, 0);
    assert.equal(newGame.players[2].playerDeck.length, 3);
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