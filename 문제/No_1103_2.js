// const input = ['3 7','3942178','1234567','9123532']
// const input =['1 10','2H3HH4HHH5']
// const input =['4 4','3994','9999','9999','2924']
// const input = ['4 6','123456','234567','345678','456789']
// const input =['1 1','9']
// const input = ['3 7','2H9HH11','HHHHH11','9HHHH11']
// const input =['4 4','3HH2','H1HH','H2H1','2219'] //ans 8
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
    const visited = Array.from({length:N},()=>Array(M).fill(false));
    const dp = Array.from({length:N},()=>Array(M).fill(0));
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const moveCoin = (y,x) =>{
        if(visited[y][x]) process.exit(console.log(-1));
        if(dp[y][x]) return dp[y][x];
        visited[y][x] = true;
        const number = +map[y][x];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i]*number , x+dx[i]*number];
            if(ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] === 'H') continue;
            dp[y][x] = Math.max(dp[y][x],moveCoin(ny,nx));
        }
        dp[y][x]++;
        visited[y][x] = false;
        return dp[y][x];
    }
    console.log(moveCoin(0,0))
}
solution(input);



// const solution = input =>{
//     const [N,M] = input[0].split(' ').map(Number);
//     const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
//     const visited = Array.from({length:N},()=>Array(M).fill(false));
//     const dp = Array.from({length:N},()=>Array(M).fill(-1));
//     const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
//     let maxCount = 0;
//     const moveCoin = (y,x,count) =>{
//         if(visited[y][x]) process.exit(console.log(-1));
//         if(dp[y][x] >= count) return;
//         visited[y][x] = true;
//         dp[y][x] = count;
//         const number = +map[y][x];
//         for(let i=0; i<4; i++){
//             const [ny,nx] = [y+dy[i]*number , x+dx[i]*number];
//             if(ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] === 'H'){
//                 maxCount = Math.max(count+1,maxCount);
//                 continue;
//             }
//             moveCoin(ny,nx,count+1);
//         }
//         visited[y][x] = false;
//     }
//     moveCoin(0,0,0);
//     console.log(maxCount);
// }
// solution(input);
