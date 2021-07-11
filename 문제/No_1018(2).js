const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N,M] = input[0].split(' ').map(num => parseInt(num));
const WB = input.slice(1);
const white = [
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW'
]
const black = [
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB'

]
let minArr = [];

function whiteStart(y,x){
    let count =0;
    for(let i=y; i<y+8; i++){
        for(let j=x; j<x+8; j++){
            if(WB[i][j] !== white[i-y][j-x]) count++;
        }
    }
    return count;

}
function blackStart(y,x){
    let count=0;
    for(let i=y; i<y+8; i++){
        for(let j=x; j<x+8; j++){
            if(WB[i][j] !== black[i-y][j-x]) count++;
        }
    }
    return count;

}


for(let i=0; i+7<N; i++){
    for(let j=0; j+7<M; j++){
        minArr.push(whiteStart(i,j))
        minArr.push(blackStart(i,j))
    }
}

console.log(Math.min(...minArr))
