// const input = ['3','0 0 1','0 0 0','0 9 0'];
// const input =['4','4 3 2 1','0 0 0 0','0 0 9 0','1 2 3 4']
// const input =['6','5 4 3 2 3 4','4 3 2 3 4 5','3 2 9 5 6 6','2 1 2 3 4 5','3 2 1 6 5 4','6 6 6 6 6 6']
// const input =['6','6 0 6 0 6 1','0 0 0 0 0 2','2 3 4 5 6 6','0 0 0 0 0 2','0 2 0 0 0 0','3 9 3 0 0 1'];
const input =['6','1 1 1 1 1 1','2 2 6 2 2 3','2 2 5 2 2 3','2 2 2 4 6 3','0 0 0 0 0 6','0 0 0 0 0 9'];

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const getHuntingTime = (babyShark,map) =>{
    const {y,x,size,eaten,time} = babyShark;
    const N = map.length;
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    let visited = Array.from({length:N},()=> Array(N).fill(false));
    let queue = [[y,x,time]] , edible = [];
    let isFind = false;
    while(queue.length){
        const [y,x,time] = queue.shift();
        if(map[y][x] && map[y][x] < size){
            edible.push({ny:y,nx:x,nTime:time});
            isFind = true;
            continue;
        }
        if(isFind) continue;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] > size) continue;
            visited[ny][nx] = true;
            queue.push([ny,nx,time+1]);
        }
    }
    if(!edible.length) return time;
    edible.sort((a,b)=>{
        if(a.nTime === b.nTime){
            if(a.ny === b.ny) return a.nx - b.nx;
            return a.ny - b.ny;
        }
        return a.nTime - b.nTime;
    })
    const {ny,nx,nTime} = edible[0];
    map[ny][nx] = 0 , babyShark = {...babyShark, y:ny, x:nx ,time:nTime};
    if(++babyShark.eaten === size){
        babyShark.eaten = 0 , babyShark.size++;
    }
    return getHuntingTime(babyShark,map);
}
const solution = (input) =>{
    const N = +input[0];
    let map = Array.from({length:N} ,(_,i)=> input[i+1].split(' ').map(Number));
    let babyShark ;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] === 9) babyShark = {y,x,size:2,eaten:0,time:0} , map[y][x] = 0;
        }
    }
    const time = getHuntingTime(babyShark,map);
    console.log(time);
}
solution(input);