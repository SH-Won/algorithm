const input = 8;
// const fs = require('fs');
// const input = +fs.readFileSync('/dev/stdin').toString().trim()

//퀸은 가로세로에 서로 없어야한다.
//퀸은 대각선에도 서로 없어야 한다.
let answer = 0;
let queen = Array(input).fill(0);
//[0,0,0,0,0,0,0,0]; 인덱스가 x 숫자가 y
const check = (x) =>{

    for(let i=0; i<x; i++){
        if(queen[i] === queen[x]) return false;
        if(Math.abs(queen[x] - queen[i]) === x-i) return false;
    }

    return true
}

const dfs = (count) =>{

    if(count === input){
        answer++;
        return;
    }
    for(let i=0; i<input ; i++){

        queen[count] = i;
        if(check(count)){
            dfs(count+1);
        }

    }
}
dfs(0);
console.log(answer);