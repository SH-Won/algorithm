//const input = ['2 20 50','50 30','20 40'];
//const input =['2 40 50','50 30','20 40'];
//const input =['2 20 50','50 30','30 40'];
//const input =['3 5 10','10 15 20','20 30 25','40 22 10'];
const input = ['4 10 50','10 100 20 90','80 100 60 70','70 20 30 40','50 20 100 10'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,L,R] = input[0].split(' ').map(Number);
let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
let visited = Array.from({length:N},()=>Array(N).fill(false));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const bfs = (y,x) =>{
    visited[y][x] = true;
    let queue= [[y,x]];
    let move = false;
    let startIndex = 0;
    let endIndex;
    while(startIndex !== queue.length){
        endIndex = queue.length;
        for(let i=startIndex; i<endIndex; i++){
            const [cy,cx] = queue[i];
            for(let dir=0; dir<4; dir++){
                const [ny,nx] = [cy+dy[dir],cx+dx[dir]];
                if(!isValidPos(ny,nx) || visited[ny][nx]) continue;
                const diff = Math.abs(map[cy][cx] - map[ny][nx]);
                if((diff < L || diff > R)) continue;
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
        }
       startIndex = endIndex;
    }
    if(queue.length === 1) return move=false;
    const totalPeople = queue.reduce((acc,[y,x])=> acc+=map[y][x],0);
    const countryPeople = Math.floor(totalPeople / queue.length);
    queue.forEach(([y,x]) => map[y][x] = countryPeople);
    return move = true;
}

const solution = () =>{
    let count = 0;
    while(true){
        let isMoved = false;
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(!visited[y][x]){
                    let move = bfs(y,x);
                    if(!isMoved && move){
                        isMoved = true;
                    }
                }
            }
        }
        if(!isMoved) return console.log(count);
        count++;
        visited.forEach(array => array.fill(false));
    }
    
}
solution();