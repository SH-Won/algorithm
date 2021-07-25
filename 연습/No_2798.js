const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '5 21',
//     '5 6 7 8 9'
// ]
const [N,M]=input[0].split(' ').map(num => +num);
const numbers = input[1].split(' ').map(num=> +num);
let sum=0;

for(let i=0; i<N-2; i++){
    for(let j=i+1; j<N; j++){
        for(let k=j+1; k<N; k++){
             
            if(numbers[i]+numbers[j]+numbers[k] > sum && numbers[i]+numbers[j]+numbers[k] <= M) 
            sum =numbers[i]+numbers[j]+numbers[k];
        }
    }
}

console.log(sum);