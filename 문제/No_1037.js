const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');



const N = +input[0];
const arr =input[1].split(' ').map(num => +num);

console.log(Math.max(...arr) * Math.min(...arr));



