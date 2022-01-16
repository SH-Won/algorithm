// const input = ['3 5','16661','61116','16661']
// const input = ['4 6','999999','955119','955119','999999']
// const input = ['5 9','111111111','115111611','131516161','115111611','111111111']
const input = ['9 13','1111111111111','1555555555551','1511111111151','1511199911151','1511192911151','1511199911151','1511111111151','1555555555551','1111111111111']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const flow = (y,x,map,visited,water,height) =>{
    const [N,M] = [map.length, map[0].length];
    visited[y][x] = true;
    let queue = [[y,x]];
    while(queue.length){
        const [y,x] = queue.shift();
        water[y][x]--;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= M || visited[ny][nx] || !water[ny][nx]) continue;
            if(map[ny][nx] + water[ny][nx] === height){
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
        }
    }
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=> input[i+1].split('').map(Number));
    let water = Array.from({length:N},()=>Array(M).fill(0));
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    const maxHeight = Math.max(...map.flat());
    const minHeight = Math.min(...map.flat());

    for(let y=1; y<N-1; y++){
        for(let x=1; x<M-1; x++){
            water[y][x] = (maxHeight - map[y][x]);
        }
    }
    for(let h = maxHeight; h>minHeight; h--){
        visited.forEach(row => row.fill(false))
        for(let y=1; y<N-1; y++){
            for(let x=1; x<M-1; x++){
                if(water[y][x] && !visited[y][x]){
                    for(let i=0; i<4; i++){
                        const [ny,nx] = [y+dy[i],x+dx[i]];
                        if(map[y][x] + water[y][x] > map[ny][nx] + water[ny][nx]){
                            flow(y,x,map,visited,water,h);
                            break;
                        }
                    }
                }
            }
        }
    }
    const answer = water.reduce((acc,cur)=> acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
    console.log(answer);
}
solution(input);