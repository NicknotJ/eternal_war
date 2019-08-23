const player = require('../player.js');
const deck = require('../deck.js');
const chai = require('chai');
const assert = chai.assert;


describe('Deck', () => {
  it('Should have 52 cards in the deck', () => {
    assert.equal(deck.deck.length, 52);
  });
  it('Should have cards with value, suit, and owner keys', () => {
    assert.equal(deck.deck[0].value, 2);
    assert.equal(deck.deck[0].suit, 'spade');
    assert.equal(deck.deck[0].owner, null);
  })
});