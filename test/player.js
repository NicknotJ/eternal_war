const player = require('../player.js');
const chai = require('chai');
const assert = chai.assert;

describe('Player Class', () => {
  let player1 = new player.Player('player1');
  it('Should have a name based off input', () => {
    assert.equal(player1.name, 'player1');
  });
  it('Should have a starting hand the size of input or default 26', () => {
    assert.equal(player1.startingHandSize, 26);
    let player2 = new player.Player('player2', 10);
    assert.equal(player2.startingHandSize, 10);
  });
})