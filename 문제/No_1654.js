const input = ['4 11','802','743','457','539'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const binarySearch = (N,lines) =>{
    let left = 0;
    let right = 10e9;
    let max = 0;
    while(left < right){
        const mid = Math.floor((left+right)/2);
        console.log(left,right);
        let count = 0;
        for(let i=0; i<lines.length; i++){
            count += Math.floor(lines[i] / mid);
            if(count >= N){
                max = Math.max(mid,max);
                break;
            }
        }
        if(count >= N) left = mid+1;
        else right = mid-1;
    }
    return max;
}
const solution = input =>{
    const [K,N] = input[0].split(' ').map(Number);
    const lines = Array.from({length:K},(_,i) => +input[i+1]);
    const answer = binarySearch(N,lines);
    console.log(answer);
}
solution(input);
console.log(10e9);
console.log(Math.pow(2,31)-1);