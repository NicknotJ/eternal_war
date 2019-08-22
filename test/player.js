const player = require('../player.js');
const chai = require('chai');
const assert = chai.assert;
const deck = require('../deck');
describe('Player Class', () => {
  let player1 = new player.Player('player1');
  let player2 = new player.Player('player2', 10);
  let tempDeck = deck.deck.slice(0);
  it('Should have a name based off input', () => {
    assert.equal(player1.name, 'player1');
  });
  it('Should have a starting hand the size of input or default 26', () => {
    assert.equal(player1.startingHandSize, 26);
    assert.equal(player2.startingHandSize, 10);
  });
  it('Should have a createPlayerDeck method that creates a playerDeck the size of the input', () => {
    assert.isDefined(player1.createPlayerDeck, 'createPlayerDeck is defined');
    player1.createPlayerDeck(player1.startingHandSize, tempDeck);
    assert.equal(player1.playerDeck.length, 26);
    player2.createPlayerDeck(player2.startingHandSize, tempDeck);
    assert.equal(player2.playerDeck.length, 10);
  });
  it('Should have a playCard method that pops/returns the last card of the playerdeck', () => {
    assert.equal(player1.playerDeck[player1.playerDeck.length - 1], player1.playCard());
    assert.equal(player1.playerDeck.length, 25);
  });
  it('Should have a receiveCard method that unshifts the card given into the playerdeck', () => {
    let randomValue = Math.floor(Math.random() * 13) + 1;
    let tempCard = {value: randomValue, suit: 'spade'};
    assert.isDefined(player1.receiveCard, 'receiveCard is defined');
    player1.receiveCard(tempCard);
    assert.equal(player1.playerDeck[0], tempCard);
  });
  it('Should have a checkStatus method that checks the player deck, setting values to false if necessary', () => {
    assert.isDefined(player2.checkStatus, 'checkStatus is defined');
    for(let x = 0; x < 10; x++){
      player2.playCard();
    }
    player2.checkStatus();
    assert.equal(player2.playing, false);
    assert.equal(player2.lost, true);
    player1.checkStatus();
    assert.equal(player1.playing, true);
    assert.equal(player1.lost, false);
  });
  it('Should have a quit method that removes all cards from the player deck and sets player status to loss', () => {
    assert.isDefined(player1.quit, 'quit is defined');
    player1.quit();
    assert.equal(player1.playerDeck.length, 0);
    assert.equal(player1.playing, false);
    assert.equal(player1.lost,  true);
  });
})