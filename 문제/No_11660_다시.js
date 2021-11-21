// const input = [
// '4 3',
// '1 2 3 4',
// '2 3 4 5',
// '3 4 5 6',
// '4 5 6 7',
// '2 2 3 4',
// '3 4 3 4',
// '1 1 4 4'
// ]
const input = [
'2 4',
'1 2',
'3 4',
'1 1 1 1',
'1 2 1 2',
'2 1 2 1',
'2 2 2 2'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const startEndInfo = Array.from({length:M},(_,i)=>input[i+N+1].split(' ').map(Number));

const solution = () =>{
    let dp = Array.from({length:N+1},()=>Array(N+1).fill(0));
    let answer = "";
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            dp[y+1][x+1] = dp[y+1][x] + dp[y][x+1] - dp[y][x] + map[y][x];
        }
    }
    for(let i=0; i<startEndInfo.length; i++){
        const [sRow,sCol,eRow,eCol] = startEndInfo[i];
        const all = dp[eRow][eCol];
        const part = dp[sRow-1][eCol] + dp[eRow][sCol-1] - dp[sRow-1][sCol-1];
        answer +=`${all - part}\n`; 
    }
    console.log(answer.trim());
}
solution();