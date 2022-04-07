// const input =[
//     '4',
//     '14 9 12 10',
//     '1 11 5 4',
//     '7 15 2 13',
//     '6 3 16 8'
// ]
// const input =[
//     '2',
//     '2 2',
//     '2 2'
// ]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const dp = Array.from({length:N},()=>Array(N).fill(0));
  
    const movePanda = (y,x) =>{
        if(dp[y][x]) return dp[y][x];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= N || map[ny][nx] <= map[y][x]) continue;
            dp[y][x] = Math.max(dp[y][x],movePanda(ny,nx));
        }
        dp[y][x]++;
        return dp[y][x];
    }
    let max = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const count = movePanda(y,x);
            max = Math.max(count,max);
        }
    }
    console.log(max);
}
solution(input);