const fs = require('fs');
const input =fs.readFileSync('/dev/stdin').toString().trim();
const N = +input;

function Fibonacci(N){

    if(N === 0) return 0;
    if(N <= 2) return 1;

    return Fibonacci(N-1)+Fibonacci(N-2)

}
console.log(Fibonacci(N));