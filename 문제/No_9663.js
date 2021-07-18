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
// 1. 일단 퀸은 같은 행과 열에 두개가 존재 할 수 가 없다.
// 2. 행에 퀸을 넣어본다.
// 3. 다음행의 퀸은 이전 행의 퀸의 대각선과, 같은 열은 둘 수 가 없다.
// 4. 2번을 체크하고 둘 수 있으면 재귀


const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = Number(input)
const array = Array(N).fill(0); // index 가 행을 의미하고 값이 열을 의미한다.

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
        //
        if(array[cnt] === array[i]) return false;
        if(Math.abs(array[cnt] - array[i] ) === cnt - i) return false;

    }
    return true;
}
dfs(0);
console.log(count);


