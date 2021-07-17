// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();
// const N = +input;
const N = 8;
let count = 0;
let queen = Array(N).fill(0);
dfs(0);
console.log(count);

function dfs(cnt){
    if(cnt === N){
        count++;
        return;
    }

    for(let i=0; i<N; i++){
         queen[cnt] = i;

         if(check(cnt)){
             dfs(cnt + 1);
         }
    }
}
function check(x){
    for(let i=0; i<x; i++){
        if(queen[i] === queen[x]) return false;
        else if(Math.abs(queen[x] - queen[i]) === x-i ) return false;
    }
    return true;
}
