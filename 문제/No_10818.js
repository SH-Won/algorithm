let fs = require('fs');
let [n,...array] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');


let arr = array[1].split(' ').map(v => Number(v));

let solution = [];
solution.push(Math.min(...arr));
solution.push(Math.max(...arr));

console.log(solution.join(' '));

let ssss = ['5 21','5 6 7 8 9'];
let sss = ssss[0].split(' ');
let ss = sss.shift();

console.log(ss);
