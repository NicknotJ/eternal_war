const player = require('../player.js');
const deck = require('../deck.js/index.js');
const chai = require('chai');
const assert = chai.assert;


describe('Deck', () => {
  it('Should have 52 cards in the deck', () => {
    assert.equal(deck.deck.length, 52);
  })
});