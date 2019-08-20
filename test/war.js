const player = require('../player.js');
const war = require('../war.js');
const chai = require('chai');
const assert = chai.assert;


describe('Deck', () => {
  it('Should have 52 cards in the deck', () => {
    assert.equal(war.deck.length, 52);
  })
});