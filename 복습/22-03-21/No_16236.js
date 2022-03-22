// const input = ['3','0 0 0','0 0 0','0 9 0'];
// const input =['4','4 3 2 1','0 0 0 0','0 0 9 0','1 2 3 4']
// const input =['6','5 4 3 2 3 4','4 3 2 3 4 5','3 2 9 5 6 6','2 1 2 3 4 5','3 2 1 6 5 4','6 6 6 6 6 6']
// const input =['6','6 0 6 0 6 1','0 0 0 0 0 2','2 3 4 5 6 6','0 0 0 0 0 2','0 2 0 0 0 0','3 9 3 0 0 1'];
// const input =['6','1 1 1 1 1 1','2 2 6 2 2 3','2 2 5 2 2 3','2 2 2 4 6 3','0 0 0 0 0 6','0 0 0 0 0 9'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const getMomCallTime = (babyShark,map,momTime) =>{
    let {y,x,eaten,size} = babyShark;
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const time = Array.from({length:map.length},()=>Array(map.length).fill(Infinity));
    time[y][x] = 0;
    let edible = [];
    let queue = [[y,x]] , isFind = false;
    while(queue.length){
        const [y,x] = queue.shift();
        if(map[y][x] !==0 && map[y][x] < size ){
            isFind = true;
            edible.push({y,x,time:time[y][x]});
        }
        if(isFind) continue;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= map.length || nx >= map.length || time[ny][nx] <= time[y][x]+1 || size < map[ny][nx]) continue;
            queue.push([ny,nx]);
            time[ny][nx] = time[y][x] + 1;
        }
    }
    if(edible.length === 0) return console.log(momTime);
    edible.sort((a,b) =>{
        if(a.time === b.time){
            if(a.y === b.y) return a.x - b.x;
            return a.y - b.y;
        }
        return a.time - b.time;
    })
    const {y:ny,x:nx,time:addTime} = edible[0];
    map[ny][nx] = 0;
    if(++eaten === size){
        eaten = 0;
        size++;
    }
    babyShark = {y:ny,x:nx,eaten,size};
    return getMomCallTime(babyShark,map,momTime+addTime);
}
const solution = input =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    let babyShark = {y:null,x:null,eaten:0,size:2};
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] === 9) babyShark.y = y , babyShark.x = x ,map[y][x] = 0;
        }
    }
    return getMomCallTime(babyShark,map,0);
}
solution(input);