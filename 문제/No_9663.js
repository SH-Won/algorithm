// N x N 체스판에서 N개의 퀸이 서로 공격할 수 없는 경우의 수는?
// 1 0 0 0 0
// 0 0 1 0 0
// 0 0 0 0 1
// 0 1 0 0 0
// 0 0 0 1 0

// 0 1 0 0 0
// 0 0 0 1 0
// 1 0 0 0 0
// 0 0 1 0 0
// 0 0 0 0 1

// 1 0 0 0 0
// 0 0 0 1 0
// 0 1 0 0 0
// 0 0 0 0 1
// 0 0 1 0 0

// const fs = require('fs');
// const N = fs.readFileSync('/dev/stdin').toString().trim().split('').map(num => parseInt(num));
const N = 4;
const array = Array(N).fill(0);

let count = 0;
function dfs(cnt){
    if(cnt === N){
        count++;
    }
    for(let i=0; i<N; i++){
        array[cnt] = i;

        if(check(cnt)){
            dfs(cnt+1);
        }
    }
}
function check(cnt){
    for(let i=0; i<cnt; i++){
        if(array[cnt] === array[i]) return false;
        if(Math.abs(array[cnt] - array[i] ) === cnt - i) return false;

    }
    return true;
}
dfs(0);
console.log(count);


