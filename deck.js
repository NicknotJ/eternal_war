//I need to create a shuffling mechanism... 
const deck = [];
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'spade', owner: null});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'heart', owner: null});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'club', owner: null});
}
for(let x = 2; x <= 14; x++){
  deck.push({value: x, suit: 'diamond', owner: null});
}
module.exports = {
  deck
}
