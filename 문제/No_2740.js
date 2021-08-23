// const input = [
//     '3 2',
//     '1 2',
//     '3 4',
//     '5 6',
//     '2 3',
//     '-1 -2 0',
//     '0 0 3'
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
let A  =makeMatrix([]);
let B = makeMatrix([]);
let answer = Array.from({length:A.length},()=>Array(B[0].length).fill(0))

console.log(A)
console.log(B)

function makeMatrix(array){
    
        const [N,M] = input[index++].split(' ').map(num => +num)
        array = Array.from({length:N},()=>input[index++].split(' ').map(num => +num));
    
        return array;
}
// 3 x 2  2 x 3
for(let i=0; i<A.length; i++){
    for(let j=0; j<B[0].length; j++){
        for(let k=0; k<B.length; k++){
            answer[i][j] += A[i][k] * B[k][j]
        }
    }
}
answer = answer.map(row => row.join(' '));
console.log(answer.join('\n'));