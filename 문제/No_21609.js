// const input = [
// '5 3',
// '2 2 -1 3 1',
// '3 3 2 0 -1',
// '0 0 0 1 2',
// '-1 3 1 3 2',
// '0 3 2 2 1',
// ]
// const input = [
// '6 4',
// '2 3 1 0 -1 2',
// '2 -1 4 1 3 3',
// '3 0 4 2 2 1',
// '-1 4 -1 2 3 4',
// '3 -1 4 2 0 3',
// '1 2 2 2 2 1'
// ]
const input = [
    '4 3',
    '1 1 1 3',
    '3 2 3 3',
    '1 2 -1 3',
    '-1 -1 1 1'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
let visited = Array.from({length:N},()=>Array(N).fill(false));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const rotate = (map) =>{
    let temp = [];
    for(let x=N-1; x>=0; x--){
        temp.push(map.map(array=> array[x]));
    }
    map = temp;
   return map;
}
const gravity = (map) =>{

    let array = [];
    for(let x=0; x<N; x++){
        for(let y=0; y<N; y++){
            if(map[y][x] === -1){
                let i=y-1; 
                while(array.length){
                    map[i][x] = array.pop();
                    i--;
                }
            }
            if(map[y][x] !==null && map[y][x] !==-1){
                array.push(map[y][x]);
                map[y][x] = null;
            }
        }
            let i = N-1;
            while(array.length){
            map[i][x] = array.pop();
            i--;
           }
    }
}
const findGroup = (y,x,map) =>{
    const color = map[y][x];
    let count = 0;
    let rainbow = 0;
    let root = {y:Infinity,x:Infinity};
    visited[y][x] = true;
    let queue = [[y,x]];
    let startIndex = 0;
    let endIndex ;
    let rainbowArr = [];
    while(startIndex !== queue.length){
        endIndex = queue.length;
        for(let i=startIndex; i<endIndex; i++){
            const [cy,cx] = queue[i];
            count++;
            if(cy < root.y && cx < root.x && map[cy][cx] !==0){
                root.y = cy, root.x =cx;
            }
            if(map[cy][cx] === 0){
                rainbow++;
                rainbowArr.push([cy,cx]);
            }
            for(let dir=0; dir<4; dir++){
                const [ny,nx] = [cy+dy[dir],cx+dx[dir]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ===null ||map[ny][nx] === -1 ) continue;
                if(map[ny][nx] ===color || map[ny][nx] === 0){
                queue.push([ny,nx]);
                visited[ny][nx] = true;
                }
            }
        }
        startIndex = endIndex;
    }
    if(count === 1 ) return false;
    rainbowArr.forEach(([y,x]) => visited[y][x] = false);
    return {y:root.y,x:root.x,count,rainbow,queue}; 

}
const earnScore = (map) =>{
    const groups = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x] && map[y][x] !==0 && map[y][x] !==-1 && map[y][x] !==null){
                const group = findGroup(y,x,map);
                if(!group) continue;
                groups.push(group);
            }
        }
    }
    visited.forEach(array => array.fill(false));
    
    if(groups.length ===0 ) return 0;
    groups.sort((a,b)=>{
        if(a.count ===b.count){
            if(a.rainbow === b.rainbow){
                if(a.y ===b.y) return b.x - a.x
                return b.y - a.y
            }
            return b.rainbow - a.rainbow;
        }
        return b.count - a.count;
    })
    //console.log(groups);
    for(let i=0; i<groups[0].queue.length; i++){
        const [y,x] = groups[0].queue[i];
        map[y][x] = null;
    }
    return sum = groups[0].count ** 2
}

const solution = (map) =>{
    let sum = 0;
    while(true){
        let score = earnScore(map);
        
        if(!score) return console.log(sum);
        sum+=score;
        gravity(map);
        map =rotate(map);
        gravity(map);
    }
}
solution(map);