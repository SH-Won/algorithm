const fs =require('fs');
const input = +fs.readFileSync('/dev/stdin').toString().trim();

function factorial(N){
    
    if(N <= 1) return 1;

    return N*factorial(N-1);

}
console.log(factorial(input));