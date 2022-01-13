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
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const getAir = (y,x,map) =>{
    const [R,C] = [map.length , map[0].length];
    let visited = Array.from({length:R},()=>Array(C).fill(false));
    visited[y][x] = true;
    let air = [[y,x]] , idx = 0;
    while(idx < air.length){
        const [y,x] = air[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= R || nx >=C || visited[ny][nx] || map[ny][nx]) continue;
            air.push([ny,nx]);
            visited[ny][nx] = true;
        }
    }
    return air;
}
const meltCheese = (air,map) =>{
    const [R,C] = [map.length , map[0].length];
    let meltedCheese = 0;
    let queue = air;
    while(queue.length){
        const [y,x] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= R || nx >=C || map[ny][nx] !== 1) continue;
            map[ny][nx] = 0;
            meltedCheese++;
        }
    }
    return meltedCheese;
}
const solution = (input) =>{
    const [R,C] = input[0].split(' ').map(Number);
    let map = Array.from({length:R},(_,i) =>input[i+1].split(' ').map(Number));
    let curCheese = map.flat().reduce((acc,cur) => acc+= (cur ? 1 : 0),0);
    let prevCheese , hours = 0;
    while(curCheese){
        const air = getAir(0,0,map);
        const meltedCheese = meltCheese(air,map);
        hours++;
        prevCheese = curCheese;
        curCheese -=meltedCheese;
    }
    console.log(`${hours}\n${prevCheese}`)
}
solution(input);