const input = ['7','0110100','0110101','1110101','0000111','0100000','0111110','0111000']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (input) =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i) => input[i+1]);
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    let complex = [];
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    const bfs = (y,x) =>{
        visited[y][x] = true;
        let queue = [[y,x]], count=0;
        while(queue.length){
            const [y,x] = queue.shift();
            count++;
            for(let i=0; i<4; i++){
               const [ny,nx] = [y+dy[i],x+dx[i]];
               if(ny < 0 || nx < 0 || ny >=N || nx >=N || visited[ny][nx] || map[ny][nx] !=='1') continue;
               visited[ny][nx] =true;
               queue.push([ny,nx]);
            }
        }
        return count;
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x] && map[y][x] ==='1'){
                complex.push(bfs(y,x));
            }
        }
    }
    console.log(`${complex.length}\n${complex.join('\n')}`);
}
solution(input);