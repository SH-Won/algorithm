//1   2

//3
// const input = [
// '7 5',
// '.......',
// '.o...*.',
// '.......',
// '.*...*.',
// '.......',
// '15 13',
// '.......x.......',
// '...o...x....*..',
// '.......x.......',
// '.......x.......',
// '.......x.......',
// '...............',
// 'xxxxx.....xxxxx',
// '...............',
// '.......x.......',
// '.......x.......',
// '.......x.......',
// '..*....x....*..',
// '.......x.......',
// '10 10',
// '..........',
// '..o.......',
// '..........',
// '..........',
// '..........',
// '.....xxxxx',
// '.....x....',
// '.....x.*..',
// '.....x....',
// '.....x....',
// '0 0'
// ]
//const input = ['3 3','***','xox','*..','0 0']
// const input = [
// '5 5',
// '....*',
// '.*.*.',
// '..o..',
// '..*..',
// '.....',
// '0 0'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
let answer =""
while(true){
    const [c,r] = input[index++].split(' ').map(Number);
    if(c === 0 && r === 0) break;
    let map = Array.from({length:r},()=>input[index++].split(''));
    let visited =Array.from({length:r},()=>Array(c).fill(false));
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<r && x<c);
    let N = 1;
    let vertex = [];
    let start ;
    for(let i=0; i<r; i++){
        for(let j=0; j<c; j++){
            if(map[i][j] === 'o'){
                map[i][j] = 0;
                vertex.push([i,j]);
            }
            if(map[i][j] ==='*'){
                map[i][j] = N;
                vertex.push([i,j]);
                N++;
            }
        }
    }
    const bfs = (y,x,ey,ex) =>{
        let queue = [[y,x,0]];
        visited[y][x] = true;
        while(queue.length){
            const [cy,cx,time] = queue.shift();
            if(cy===ey && cx ===ex){
                return time;
            }
            distance.forEach(([my,mx])=>{
                const [ny,nx] = [cy+my,cx+mx];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='x') return;
                visited[ny][nx] = true;
                queue.push([ny,nx,time+1])
            })
        }
        return -1;
    }
    let flag = false;
    let edge = Array.from({length:vertex.length},()=>[]);
    loop:for(let i=0; i<vertex.length-1; i++){
        for(let j=i+1; j<vertex.length; j++){
           const [sy,sx] = vertex[i];
           const [ey,ex] = vertex[j];
           
           const time = bfs(sy,sx,ey,ex);
           if(time === -1){
              flag = true;
              break loop;
            }
           const [from,to] = [map[sy][sx],map[ey][ex]];
           edge[from].push({to,time});
           edge[to].push({to:from,time});
           visited = visited.map(array=>array.fill(false));
        }
    }
    if(flag){
        answer+="-1\n";
        continue;
    }
    //console.log(edge);
    //console.log(map.map(array=>array.join('')).join('\n'));
    let clean = Array(vertex.length).fill(false);
    let min = Infinity;
    clean[0] = true;
    const dfs = (start,count,totalTime) =>{
        if(count === vertex.length-1){
            min = Math.min(min,totalTime);
            return;
        }
        for(let i=0; i<edge[start].length; i++){
            const {to,time} = edge[start][i];
            if(!clean[to]){
                clean[to] = true;
                const nextTime = totalTime + time;
                dfs(to,count+1,nextTime);
                clean[to] = false;
            }
        }
    } 
    dfs(0,0,0);
    answer+=`${min}\n`;
   
}
console.log(answer.trim());