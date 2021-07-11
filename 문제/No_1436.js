const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
let N = Number(input);
let number = 665;

while(N > 0) {
    number++;
    if(number.toString().includes('666')){
        N--;
    }
}

console.log(number);

