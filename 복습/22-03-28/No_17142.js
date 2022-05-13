// const input = ['7 3','2 0 0 0 1 1 0','0 0 1 0 1 2 0','0 1 1 0 1 0 0','0 1 0 0 0 0 0','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 0 0 2']
// const input =['7 3','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 4','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 5','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 3','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 2','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['5 1','2 2 2 1 1','2 1 1 1 1','2 1 1 1 1','2 1 1 1 1','2 2 2 1 1']


const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const isSafe = (map) =>{
    return map.flat().some(el => !el);
}
const getSpreadTime = (virus,map) =>{
    const [N,dy,dx] = [map.length,[1,-1,0,0],[0,0,1,-1]];
    const times = Array.from({length:N},()=>Array(N).fill(Infinity));
    virus.forEach(([y,x]) => times[y][x] = 0);
    let queue = virus, maxTime = 0;
    while(queue.length){
        const [y,x] = queue.shift();
        if(map[y][x] !== 2) maxTime = Math.max(maxTime,times[y][x]);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= N || map[ny][nx] === 1 || times[ny][nx] <= times[y][x] + 1) continue;
            queue.push([ny,nx]);
            times[ny][nx] = times[y][x] + 1;
            if(map[ny][nx] === 0) map[ny][nx] = 1; 
        }
    }
    if(!isSafe(map)) return maxTime;
    return -1;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(Number));
    const virus = [];
    map.forEach((row,y) =>
       row.forEach((el,x) => el ===2 && virus.push([y,x]))
    )
    let time = [];
    const selectVirus = (index,count,selectedVirus) =>{
        if(count === M){
            const copyMap = map.map(row => [...row]);
            const spreadTime = getSpreadTime([...selectedVirus],copyMap);
            if(spreadTime !== -1) time.push(spreadTime);
            return;
        }
        if(index >= virus.length) return;
        else{
            selectedVirus.push(virus[index]);
            selectVirus(index+1,count+1,selectedVirus);
            selectedVirus.pop();
        }
        return selectVirus(index+1,count,selectedVirus);
    }
    selectVirus(0,0,[]);
    time.length === 0 ? console.log(-1) : console.log(Math.min(...time));
}
solution(input);