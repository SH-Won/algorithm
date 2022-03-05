// const input = [
// '6 4 1',
// '0100',
// '1110',
// '1000',
// '0000',
// '0111',
// '0000',
// ]
// const input = [
// '6 4 2',
// '0100',
// '1110',
// '1000',
// '0000',
// '0111',
// '0000'
// ]
// const input = [
// '4 4 3',
// '0111',
// '1111',
// '1111',
// '1110'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,K] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
let visited = Array.from({length:N},()=>Array.from({length:M},()=>Array(K+1)))
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
const bfs = () =>{
    visited[0][0][K] = true;
    let queue = [[0,0,K,1]], idx = 0;
    while(idx < queue.length){
        const [y,x,k,time] = queue[idx++];
        if(y === N-1 && x ===M-1) return console.log(time)
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            if(!visited[ny][nx][k]){
                if(map[ny][nx] === '0'){
                    visited[ny][nx][k] = true;
                    queue.push([ny,nx,k,time+1]);
                }
                if(k && map[ny][nx] ==='1' && !visited[ny][nx][k-1]){
                    visited[ny][nx][k-1] = true;
                    queue.push([ny,nx,k-1,time+1]);
                }
            }
        }
    }
   console.log(-1);
}
bfs();