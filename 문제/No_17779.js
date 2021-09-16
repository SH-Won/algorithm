const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const election = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));


