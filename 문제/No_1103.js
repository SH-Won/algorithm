//const input = ['3 7','3942178','1234567','9123532']
//const input =['1 10','2H3HH4HHH5']
//const input =['4 4','3994','9999','9999','2924']
//const input = ['4 6','123456','234567','345678','456789']
//const input =['1 1','9']
//const input = ['3 7','2H9HH11','HHHHH11','9HHHH11']
//const input =['4 4','3HH2','H1HH','H2H1','2219']
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num=>+num);
const board =Array.from({length:N},(_,i)=>input[i+1].split(''));
const isValidPos = (y,x)=> (y>=0 && x>=0 && y<N && x<M);
let visited = Array.from({length:N},()=>Array(M).fill(false))
let dp = Array.from({length:N},()=>Array(M).fill(0));
visited[0][0] =true;
let maxCount = 0;
dfs(0,0,1);
console.log(maxCount);
function dfs(y,x,count){

    dp[y][x] = count;
    if(count > maxCount) maxCount = count;

    const dist = +board[y][x] ;
    const dy = [dist,-dist,0,0];
    const dx = [0,0,dist,-dist];

    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]]
        if(!isValidPos(ny,nx) || board[ny][nx] ==='H') continue;
        if(visited[ny][nx]) process.exit(console.log(-1));
        if(count < dp[ny][nx] ) continue;
        visited[y][x]= true;
        dfs(ny,nx,count+1);
        visited[y][x] =false;
        

    }
}