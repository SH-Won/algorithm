const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

let NM = input[0].split(' ');
let N = Number(NM[0]); //카드갯수
let M = Number(NM[1]); //카드3장 합
let card = input[1].split(' ').map(num => parseInt(num));
let max = 0;
// [1,2,3,4,5];
for(let i=0; i<N-2; i++){
    for(let j=i+1; j<N-1; j++){
        for(let z=j+1; z<N; z++){
            let sum = card[i]+card[j]+card[z];
            if(sum > max && sum <= M) max=sum;
            
        }
    }
}
console.log(max);
