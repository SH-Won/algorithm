// const input = ['4 6','0 0 0 0 0 0','0 0 0 0 0 0','0 0 1 0 6 0','0 0 0 0 0 0'];
// const input = ['6 6','0 0 0 0 0 0','0 2 0 0 0 0','0 0 0 0 6 0','0 6 0 0 2 0','0 0 0 0 0 0','0 0 0 0 0 5']
// const input = ['6 6','1 0 0 0 0 0','0 1 0 0 0 0','0 0 1 0 0 0','0 0 0 1 0 0','0 0 0 0 1 0','0 0 0 0 0 1']
// const input = ['6 6','1 0 0 0 0 0','0 1 0 0 0 0','0 0 1 5 0 0','0 0 5 1 0 0','0 0 0 0 1 0','0 0 0 0 0 1']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[0,-1,0,1],[-1,0,1,0]];
const CCTV = [
    null,
    [[0],[1],[2],[3]],
    [[0,2],[1,3]],
    [[0,1],[1,2],[2,3],[3,0]],
    [[0,1,2],[1,2,3],[2,3,0],[3,0,1]],
    [[0,1,2,3]],
]
const combination = (count,arr,map) =>{
    const result = [];
    const [y,x] = arr[count];
    const length = CCTV[map[y][x]].length;
    const direction = Array(length).fill().map((v,i) => i);
    if(count === arr.length - 1) return direction.map(el => [el]); 
    direction.forEach( num =>{
        const combi = combination(count+1,arr,map);
        const attach = combi.map(com => [num,...com]);
        result.push(...attach);
    })
    return result;
}
const getWatchCount = (cctvPos,direction,map) =>{
    let max = 0;
    let visited = Array.from({length:map.length},()=>Array(map[0].length).fill(false));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<map.length && x<map[0].length);
    for(let i=0; i<direction.length; i++){
        let watch = 0;
       for(let j=0; j<cctvPos.length; j++){
           const [y,x] = cctvPos[j];
           const number = map[y][x];
           const dir = CCTV[number][direction[i][j]];
           for(let k=0; k<dir.length; k++){
               let [ny,nx] = [y+dy[dir[k]],x+dx[dir[k]]];
               while(isValidPos(ny,nx) && map[ny][nx] !==6){
                   if(!visited[ny][nx] && !map[ny][nx]){
                       watch++;
                       visited[ny][nx] =true;
                    }
                   ny+=dy[dir[k]] , nx+=dx[dir[k]];
               }
           }
       }
       max = Math.max(watch,max);
       visited.forEach(row => row.fill(false));
    }
    return max;
}

const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    let unWatch = 0;
    let cctvPos = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(!map[y][x]) unWatch++;
            else if(map[y][x] !== 6) cctvPos.push([y,x]);
        }
    }
    if(!cctvPos.length) return console.log(unWatch);
    const direction = combination(0,cctvPos,map);
    const watch = getWatchCount(cctvPos,direction,map);
    console.log(unWatch - watch);
}
solution(input);
