const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');


// const input = [
//     '7',
//     '2 3 1 2 3 4',
//     '5 2 4 6 1 7 5',
// ]
const N = +input[0];
const distance = input[1].split(' ').map(num => BigInt(num));
const oilPrice = input[2].split(' ').map(num => BigInt(num));

let currentPrice = oilPrice[0];
let allCost= 0n;

for(let i=0; i<N-1; i++){
    allCost += currentPrice * distance[i];
    if(currentPrice > oilPrice[i+1]) currentPrice = oilPrice[i+1];
}
console.log(allCost);