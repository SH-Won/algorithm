//const input = ['3','0 0 1','0 0 0','0 9 0'];
//const input =['4','4 3 2 1','0 0 0 0','0 0 9 0','1 2 3 4']
//const input =['6','5 4 3 2 3 4','4 3 2 3 4 5','3 2 9 5 6 6','2 1 2 3 4 5','3 2 1 6 5 4','6 6 6 6 6 6']
//const input =['6','6 0 6 0 6 1','0 0 0 0 0 2','2 3 4 5 6 6','0 0 0 0 0 2','0 2 0 0 0 0','3 9 3 0 0 1'];
//const input =['6','1 1 1 1 1 1','2 2 6 2 2 3','2 2 5 2 2 3','2 2 2 4 6 3','0 0 0 0 0 6','0 0 0 0 0 9'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));

solution(map);
function solution(map){
    let sharkSize = 2;
    let eaten = 0;
    let shark ;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] === 9){
                shark = {y,x};
                map[y][x] = 0;
            }
        }
    }
    
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x) => (y>=0 & x>=0 && y<N && x<N);
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    
    const sharkMove = (y,x,sharkSize,time) =>{
        let flag = false;
        let edible = [];
        let queue=[];
        queue.push({y,x,time});
        visited[y][x] = true;
        while(queue.length){
            const {y,x,time} = queue.shift();
            if(map[y][x] !== 0 && sharkSize > map[y][x]){
                 flag = true;
                 edible.push({y,x,time});
            }
            if(flag) continue;

            distance.forEach(([my,mx])=>{
                const [ny,nx] = [y+my,x+mx];
                if(!isValidPos(ny,nx) || map[ny][nx] > sharkSize || visited[ny][nx]) return;
                visited[ny][nx] = true;
                queue.push({y:ny,x:nx,time:time+1})
            })
        }
        if(edible.length === 0) return time;
        edible.sort((a,b)=>{
            if(a.time === b.time){
                if(a.y === b.y) return a.x - b.x
                return a.y - b.y
            }
            return a.time - b.time
        })
        let shark = edible[0];
        map[shark.y][shark.x] = 0;
        if(++eaten === sharkSize){
            sharkSize++;
            eaten = 0;
        }
        visited = visited.map(array =>array.fill(false));
        return sharkMove(shark.y,shark.x,sharkSize,shark.time);
    }
    const time = sharkMove(shark.y,shark.x,sharkSize,0);
    return console.log(time);
}