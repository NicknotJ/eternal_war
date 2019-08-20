const player = require('../player.js');
const war = require('../war.js');
const chai = require('chai');
const assert = chai.assert;

describe('Player Class', () => {
  it('Should have a name based off input', () => {
    assert.equal(player.player1.name, 'player1');
  });
  it('Should have a starting hand the size of input or default 10', () => {
    assert.equal(player.player1.startingHandSize, 26);
    assert.equal(player.player2.startingHandSize, 26);
  });
})