const input = [
'......',
'......',
'......',
'......',
'......',
'......',
'......',
'......',
'.Y....',
'.YG...',
'RRYG..',
'RRYGG.'
]
//const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const map = Array.from({length:12},(_,i)=>input[i].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos =(y,x) => (y>=0 && x>=0 && y<12 && x<6);
const solution = (map) =>{
    let visited = Array.from({length:12},()=>Array(6).fill(false));
    const gravity = () =>{
        for(let x=0; x<6; x++){
           let column = [];
           for(let y=0; y<12; y++){
               if(map[y][x] ==='.') continue;
               column.push(map[y][x]);
               map[y][x] ='.'
           }
           let yIndex = 12;
           while(column.length && yIndex--){
                map[yIndex][x] = column.pop()
           }
        }
    }
    const explode = (y,x,color) =>{
        visited[y][x] = true;
        let count = 0;
        let block = [];
        let queue = [[y,x]];
        while(queue.length){
            const [cy,cx] = queue.shift();
            count++;
            block.push([cy,cx]);
            for(let i=0; i<4; i++){
                const [ny,nx] = [cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] !==color) continue;
                visited[ny][nx] = true;
                queue.push([ny,nx]);
            }
        }
        if(count >=4){
            block.forEach(([y,x])=> map[y][x] ='.');
            return true;
        }
        return false;
    }
    let serial = 0;
    while(true){
        let isExploded = false;
        console.log(map.map(row => row.join(' ')).join('\n'));
        console.log('----------------')
        visited.forEach(row => row.fill(false));
        for(let y=0; y<12; y++){
            for(let x=0; x<6; x++){
                if(!visited[y][x] && map[y][x] !=='.'){
                   const checkExplode = explode(y,x,map[y][x]);
                   if(!isExploded && checkExplode) isExploded = true; 
                }
            }
        }
        if(!isExploded) return console.log(serial);
        gravity();
        serial++;
    }
}
solution(map);