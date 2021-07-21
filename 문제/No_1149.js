const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input = [
//     '3',
//     '26 40 83',
//     '49 60 57',
//     '13 89 99'
// ]
const N = +input[0];

let arr = new Array(N);


for(let i=0; i<N; i++){
    arr[i] = input[i+1].split(' ').map(num => +num);
}
for(let i=1; i<N; i++){
    arr[i][0] = Math.min(arr[i-1][1],arr[i-1][2]) + arr[i][0]
    arr[i][1] = Math.min(arr[i-1][0],arr[i-1][2]) + arr[i][1]
    arr[i][2] = Math.min(arr[i-1][0],arr[i-1][1]) + arr[i][2] 
}

console.log(Math.min(...arr[N-1]));
