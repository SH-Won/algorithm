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
// const input = [
//     '8 8',
//     'BWBWBWBW',
//     'WBWBWBWB',
//     'BWBWBWBW',
//     'WBWBWBWB',
//     'BWBWBWBW',
//     'WBWBWBWB',
//     'BWBWBWBW',
//     'WBWBWBWB',
    
// ]
const input = [
    '9 23',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBB',
'BBBBBBBBBBBBBBBBBBBBBBW',
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const white = [
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
]
const black = [
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
]
const getCount = (m,n,board) =>{
    let whiteCount = 0 , blackCount = 0;
    for(let y=0; y<8; y++){
        for(let x=0; x<8; x++){
            if(board[y+m][x+n] !== white[y][x]) whiteCount++;
            if(board[y+m][x+n] !== black[y][x]) blackCount++;
        }
    }
    return Math.min(whiteCount,blackCount);
}
const solution = (input) =>{
    const [R,C] = input[0].split(' ').map(Number);
    const chessBoard = Array.from({length:R},(_,i)=>input[i+1].split(''));
    let min = Infinity;
    for(let m=0; m <= R-8; m++){
        for(let n=0; n <= C-8; n++){
             const count = getCount(m,n,chessBoard);
             if(min > count) min = count;
        }
    }
    console.log(min);
}
solution(input);