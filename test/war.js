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
    example2.receiveCards();;
    assert.equal(example2.determineWinner().length, 2);
  });
  it('Should have a method called checkGame that looks at the number of players and changes game status if there is one left', () => {
    let player1 = new player.Player('player1', 2);
    let player2 = new player.Player('player2', 2);
    let example = new war.warGame(2, [], [player1, player2]);
    let player3 = new player.Player('player3', 3);
    example.join(player3);
    example.removePlayer(player2.name);
    example.removePlayer(player3.name);
    example.checkGame();
    assert.equal(example.winner, player1);
  });
  it('Should have a method called addLeftover that adds a card to the leftover pile', () => {
    let example = new war.warGame(2, []);
    example.addLeftOver({value: 2, suit: 'club'});
    assert.equal(example.leftOverPile.length, 1);
    example.addLeftOver({value: 2, suit: 'spade'});
    assert.equal(example.leftOverPile.length, 2);
  });
  it('Should have a method called pileToLeftOver that removes all cards from pile and adds to leftOver', () => {
    let example = new war.warGame(2, [{value: 2, suit: 'club'}, {value: 2, suit: 'spade'}]);
    assert.equal(example.pile.length, 2);
    example.pileToLeftOver();
    assert.equal(example.pile.length, 0);
    assert.equal(example.leftOverPile.length, 2);
  })
  it('Should have a method called warTie that does the war mechanic with players who tied, ultimately returning a single player', () => {
    let example = new war.warGame(0);
    let player1 = new player.Player('player1');
    let player2 = new player.Player('player2');
    let player3 = new player.Player('player3');
    let player4 = new player.Player('player4');
    example.join(player1);
    example.join(player2);
    example.join(player3);
    example.join(player4);
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 7, suit: 'club'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    example.addPile(player1.playCard());
    example.addPile(player2.playCard());
    example.addPile(player3.playCard());
    example.addPile(player4.playCard());
    assert.equal(example.warTie(example.determineWinner()), player1);
  });
  it('Should have a method called warTie that returns null if there ultimately is no winner (both players deck out?)', () => {
    let example = new war.warGame(0);
    let player1 = new player.Player('player1');
    let player2 = new player.Player('player2');
    let player3 = new player.Player('player3');
    let player4 = new player.Player('player4');
    example.join(player1);
    example.join(player2);
    example.join(player3);
    example.join(player4);
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 5, suit: 'club'});
    player1.receiveCard({value: 5, suit: 'club'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player2.receiveCard({value: 5, suit: 'diamond'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player3.receiveCard({value: 2, suit: 'spade'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    player4.receiveCard({value: 2, suit: 'heart'});
    example.addPile(player1.playCard());
    example.addPile(player2.playCard());
    example.addPile(player3.playCard());
    example.addPile(player4.playCard());
    assert.equal(example.warTie(example.determineWinner()), null);
  });
})

/*class warGame {
  constructor(numPlayers, pile = [], players = []){
    this.numPlayers = numPlayers;
    this.winner = undefined;
    this.pile = pile;
    this.players = players;
  }
}*/