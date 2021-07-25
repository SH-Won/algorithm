const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input = [
//     '10 13',
//     'BBBBBBBBWBWBW',
//     'BBBBBBBBBWBWB',
//     'BBBBBBBBWBWBW',
//     'BBBBBBBBBWBWB',
//     'BBBBBBBBWBWBW',
//     'BBBBBBBBBWBWB',
//     'BBBBBBBBWBWBW',
//     'BBBBBBBBBWBWB',
//     'WWWWWWWWWWBWB',
//     'WWWWWWWWWWBWB'
//     ];
const [N,M]=input[0].split(' ').map(num => +num);
const WB = Array.from({length:N},(_,i)=>input[i+1]);
let count = Infinity;
const blackStart = [
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB'
]
const whiteStart = [
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW'
]
function white(i,j){
    let count =0;
    for(let x=i; x<i+8; x++){
        for(let y=j; y<j+8; y++){
            if(WB[x][y] !== whiteStart[x-i][y-j]) count++;
        }
    }
    return count;
}
function black(i,j){
    let count =0;
    for(let x=i; x<i+8; x++){
        for(let y=j; y<j+8; y++){
            if(WB[x][y] !== blackStart[x-i][y-j]) count++;
        }
    }
    return count;
}
for(let i=0; i+7 < N; i++){
    for(let j=0; j+7 <M; j++){
        let min = Math.min(white(i,j),black(i,j));   
        if(min < count) count = min;
    }
}
console.log(count);
