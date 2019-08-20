const player = require('../player.js');
const chai = require('chai');
const assert = chai.assert;

describe('Player Class', () => {
  it('Should have a name based off input', () => {
    assert.equal(player.player1.name, 'player1');
  });
})