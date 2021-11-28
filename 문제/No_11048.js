// const input = ['3 4','1 2 3 4','0 0 0 5','9 8 7 6']
// const input = ['3 3','1 0 0','0 1 0','0 0 1'];
// const input = ['4 3','1 2 3','6 5 4','7 8 9','12 11 10']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N+2},(_,i)=>{
    if(i === 0 || i === N+1) return Array(M+2).fill(0);
    return [0,...input[i].split(' ').map(Number),0]
})
let dp = Array.from({length:N+2},()=>Array(M+2).fill(0));

for(let y=1; y<N+1; y++){
    for(let x=1; x<M+1; x++){
        dp[y][x] = Math.max(map[y][x]+dp[y-1][x],map[y][x]+dp[y][x-1]);
    }
}
console.log(dp[N][M]);