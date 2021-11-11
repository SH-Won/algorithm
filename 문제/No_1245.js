const input = [
    "8 7",
"4 3 2 2 1 0 1",
"3 3 3 2 1 0 1",
"2 2 2 2 1 0 0",
"2 1 1 1 1 0 0",
"1 1 0 0 0 1 0",
"0 0 0 1 1 1 0",
"0 1 2 2 1 1 0",
"0 1 1 1 2 1 0",
]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const farm = Array.from({length:N},(_,i) => input[i+1].split(' ').map(num => +num));
const dy = [-1,-1,-1,0,1,1,1,0];
const dx = [-1,0,1,1,1,0,-1,-1];
const isValidPos =(y,x) => (y >=0 && x>=0 && y<N && x<M);
const bfs = (y,x,height,visited) =>{
    let isTop = true;
    visited[y][x] = true;
    let queue = [[y,x]];
    while(queue.length){
        const [cy,cx] = queue.shift();
        for(let i=0; i<8; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            if(farm[cy][cx] < farm[ny][nx]) isTop = false;
            if(!visited[ny][nx] && farm[ny][nx] === height){
                visited[ny][nx] = true;
                queue.push([ny,nx]);
            }
        }
    }
   return isTop;
}
const solution = () =>{
    let visited = Array.from({length:N} ,()=>Array(M).fill(false));
    let count = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(!visited[y][x]){
                let isTop = bfs(y,x,farm[y][x],visited);
                if(isTop) count++;
            }
        }
    }
    return console.log(count);
}
solution();

