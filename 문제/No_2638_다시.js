const input = [
'8 9',
'0 0 0 0 0 0 0 0 0',
'0 0 0 1 1 0 0 0 0',
'0 0 0 1 1 0 1 1 0',
'0 0 1 1 1 1 1 1 0',
'0 0 1 1 1 1 1 0 0',
'0 0 1 1 0 1 1 0 0',
'0 0 0 0 0 0 0 0 0',
'0 0 0 0 0 0 0 0 0'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] =input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
const solution = (map) =>{
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let group = Array.from({length:N},()=>Array(M).fill(2));

    const makeGroup = (y,x,number) =>{
        visited[y][x] = true;
        group[y][x] = number;
        let queue = [[y,x]];
        while(queue.length){
            const [cy,cx] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] !==number) continue;
                visited[ny][nx] = true;
                group[ny][nx] = number;
                queue.push([ny,nx]);
            }
        }
    }
    let hour = 0;
    let curCheese = map.flat().filter(el => el).length;
    while(curCheese){
        visited.forEach(row => row.fill(false));
        group.forEach(row => row.fill(2));
        makeGroup(0,0,0);
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(!visited[y][x] && map[y][x] === 1){
                    makeGroup(y,x,1);
                }
            }
        }  
        let removedCheese = 0;
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(group[y][x] === 1){
                    let count = 0;
                    for(let i=0; i<4; i++){
                        const [ny,nx] = [y+dy[i],x+dx[i]];
                        if(group[ny][nx] === 0) count++;
                    }
                    if(count >=2){
                        map[y][x]--;
                        removedCheese++;
                    }
                }
            }
        }
        curCheese-=removedCheese;
        hour++;
    }
    console.log(hour);
}
solution(map);