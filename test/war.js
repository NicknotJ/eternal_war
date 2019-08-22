const player = require('../player.js');
const chai = require('chai');
const assert = chai.assert;
const deck = require('../deck');
const war = require('../war');

describe('warGame', () => {
  const newGame = new war.warGame(4);
  it('Should have a parameter with the number of players', () => {
    assert.equal(newGame.numPlayers, 4);
  })
})