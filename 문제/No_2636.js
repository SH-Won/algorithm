const input = [
'13 12',
'0 0 0 0 0 0 0 0 0 0 0 0',
'0 0 0 0 0 0 0 0 0 0 0 0',
'0 0 0 0 0 0 0 1 1 0 0 0',
'0 1 1 1 0 0 0 1 1 0 0 0',
'0 1 1 1 1 1 1 0 0 0 0 0',
'0 1 1 1 1 1 0 1 1 0 0 0',
'0 1 1 1 1 0 0 1 1 0 0 0',
'0 0 1 1 0 0 0 1 1 0 0 0',
'0 0 1 1 1 1 1 1 1 0 0 0',
'0 0 1 1 1 1 1 1 1 0 0 0',
'0 0 1 1 1 1 1 1 1 0 0 0',
'0 0 1 1 1 1 1 1 1 0 0 0',
'0 0 0 0 0 0 0 0 0 0 0 0'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);

const solution =(map) =>{
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    const getAir = (y,x) =>{
        visited.forEach(row => row.fill(false));
        visited[y][x] = true;
        let queue = [[y,x]];
        let startIndex = 0;
        let endIndex ;
        while(startIndex !==queue.length){
            endIndex = queue.length;
            for(let i=startIndex; i<endIndex; i++){
                const [cy,cx] = queue[i];
                for(let i=0; i<4; i++){
                    const [ny,nx] = [cy+dy[i],cx+dx[i]];
                    if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx]) continue;
                    visited[ny][nx] = true;
                    queue.push([ny,nx]);
                }
            }
            startIndex = endIndex;
        }
        return queue;
    } 

    let hours = 0;
    let curCheese = map.flat().filter(el => el).length;
    let preCheese ;
    while(curCheese){
        let air = getAir(0,0);
        let removedCheese = 0;
        for(let i=0; i<air.length; i++){
            const [y,x] = air[i];
            for(let dir=0; dir<4; dir++){
                const [ny,nx] = [y+dy[dir],x+dx[dir]];
                if(!isValidPos(ny,nx) || !map[ny][nx]) continue;
                map[ny][nx]--;
                removedCheese++;
            }
        }
        hours++;
        preCheese = curCheese;
        curCheese-=removedCheese;
    }
    console.log(hours+"\n"+preCheese);
}
solution(map);