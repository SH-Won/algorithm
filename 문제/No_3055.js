// const input = ['3 3','D.*','...','.S.']
// const input = ['3 3','D.*','...','..S']
 const input = ['3 6','D...*.','.X.X..','....S.']
//const input = ['5 4','.D.*','....','..X.','S.*.','....'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C] = input[0].split(' ').map(Number);
const map = Array.from({length:R},(_,i)=>input[i+1].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);

const getMinTime = (hedgehog,water,map) =>{
    let visited = Array.from({length:R},()=>Array(C).fill(false));
    let waterQueue = water !== undefined ? water : [];
    let hogQueue = [[...hedgehog,0]];
    let waterStart =0 , hogStart=0 , waterEnd , hogEnd ;
    visited[hedgehog[0]][hedgehog[1]] = true;
    while(hogStart !== hogQueue.length){
         waterEnd = waterQueue.length;
         hogEnd = hogQueue.length;
             for(let i=waterStart; i<waterEnd; i++){
                 const [y,x] = waterQueue[i];
                 for(let i=0; i<4; i++){
                     const [ny,nx] = [y+dy[i],x+dx[i]];
                     if(!isValidPos(ny,nx) || map[ny][nx] !=='.') continue;
                     waterQueue.push([ny,nx]);
                     map[ny][nx] = '*';
                 }
         }
         for(let i=hogStart; i<hogEnd; i++){
             const [y,x,time] = hogQueue[i];
             if(map[y][x] ==='D') return time;
             for(let i=0; i<4; i++){
                 const [ny,nx] = [y+dy[i],x+dx[i]];
                 if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='*' || map[ny][nx] ==='X') continue;
                 visited[ny][nx] = true;
                 hogQueue.push([ny,nx,time+1]);
             }
         }
         waterStart = waterEnd;
         hogStart = hogEnd;
    }
    return "KAKTUS";
}
const solution = (map) =>{
    let hedgehog , water=[];
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(map[y][x] ==='S') hedgehog = [y,x], map[y][x] ='.';
            else if(map[y][x] ==='*') water.push([y,x]) ;
        }
    }
    const answer = getMinTime(hedgehog,water,map);
    console.log(answer);
}
solution(map);
