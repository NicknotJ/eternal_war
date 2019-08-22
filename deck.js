//I need to create a shuffling mechanism... 
const deck = [];
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'spade'});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'heart'});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'club'});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'diamond'});
}
console.log(deck);

module.exports = {
  deck
}
