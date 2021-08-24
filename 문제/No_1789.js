// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();
// const N = +input
const N = 200;
let i = 0;
let sum =0;
while(true){
    sum+=i;
    if(sum > N){
        sum = i-1;
        break;
    }
    i++
    
}
console.log(sum);
