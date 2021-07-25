const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
//  const input = '5';
const N = +input;
let result = [];

for(let i=1; i<N; i++){
    let temp = i.toString().split('').map(num => +num);
    let sum = i + temp.reduce((acc,pre) => acc+=pre);
    
    if(sum === N) result.push(i);
}
result.length === 0 ? console.log(0) :
console.log(Math.min(...result));