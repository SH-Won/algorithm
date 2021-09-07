//const input = ['3 3','1 1 0','1 1 1','1 0 1','1 1 1'];
const input =['11 10','7 4 0','1 1 1 1 1 1 1 1 1 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 1 1 1 1 0 1','1 0 0 1 1 0 0 0 0 1','1 0 1 1 0 0 0 0 0 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 0 0 0 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 0 0 0 1','1 1 1 1 1 1 1 1 1 1']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N,M] = input[0].split(' ').map(num =>+num);
const [sy,sx,sd] = input[1].split(' ').map(num =>+num);
const map = Array.from({length:N},(_,i)=>input[i+2].split(' '))

const bfs = (sy,sx,d) =>{
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    const go = [[-1,0],[0,1],[1,0],[0,-1]]; // 
    const back =[[1,0],[0,-1],[-1,0],[0,1]]
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<M);
    let queue = [[sy,sx,d]];
    let count = 1;
    visited[sy][sx] = true;
    while(queue.length){
        const [cy,cx,d] = queue.shift();
        
        for(let i=d+3; i>=d; i--){
            const [ny,nx] = [cy+go[i%4][0],cx+go[i%4][1]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] !=='0') continue;
            
            queue.push([ny,nx,i%4]);
            visited[ny][nx] = true;
            count++;
            break;
        }
        if(queue.length === 0){
            const [ny,nx,nd] = [cy+back[d][0],cx+back[d][1],d];
           
            if(!isValidPos(ny,nx) || map[ny][nx] === '1') return count;

            if(!visited[ny][nx]){
                count++;
                visited[ny][nx] =true;
            }
            queue.push([ny,nx,nd]);

        }
    }
}
const answer = bfs(sy,sx,sd);
console.log(answer);