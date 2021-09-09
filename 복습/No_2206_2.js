const input = ['6 4','0100','1110','1000','0000','0111','0000'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const map = Array.from({length:N},(_,i)=>input[i+1].split('').map(num =>+num));
let visited = Array.from({length:N},()=>Array.from({length:M},()=>Array(2).fill(0)));

const bfs = (y,x) =>{
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<M);
    const distance =[[1,0],[-1,0],[0,1],[0,-1]];
    let queue=[[y,x,0]];
    visited[y][x][0] = 1;
    while(queue.length){
        const [cy,cx,crush] = queue.shift();
        if(cy ===N-1 && cx ===M-1){
            return visited[N-1][M-1][crush];
        }
        
        for(let i=0; i<distance.length; i++){
            const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
            if(!isValidPos(ny,nx)) continue;

            if(!visited[ny][nx][crush]){
                if(map[ny][nx] ===1 && !crush){
                    visited[ny][nx][crush+1] = visited[cy][cx][crush] +1;
                    queue.push([ny,nx,crush+1]);
                }
                if(map[ny][nx] === 0){
                    visited[ny][nx][crush] = visited[cy][cx][crush] +1
                    queue.push([ny,nx,crush]);
                }
            }
        }
    }
    return -1
}
const answer = bfs(0,0);
console.log(answer);