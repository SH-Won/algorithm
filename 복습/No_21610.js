// const input = [
// '5 4',
// '0 0 1 0 2',
// '2 3 2 1 0',
// '4 3 2 9 0',
// '1 0 2 9 0',
// '8 8 2 1 0',
// '1 3',
// '3 4',
// '8 1',
// '4 8'
// ]
// const input = [
//     '5 8',
//     '0 0 1 0 2',
//     '2 3 2 1 0',
//     '0 0 2 0 0',
//     '1 0 2 0 0',
//     '0 0 2 1 0',
//     '1 9',
//     '2 8',
//     '3 7',
//     '4 6',
//     '5 5',
//     '6 4',
//     '7 3',
//     '8 2'
//     ]
    // const input = [
    // '5 8',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '8 1',
    // '7 1',
    // '6 1',
    // '5 1',
    // '4 1',
    // '3 1',
    // '2 1',
    // '1 1',
    // ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const command = Array.from({length:M},(_,i)=>input[i+N+1].split(' ').map(Number));
const [dy,dx] = [[null,0,-1,-1,-1,0,1,1,1],[null,-1,-1,0,1,1,1,0,-1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);

const waterBug = (d,s,clouds,cloudMap,map) =>{
    s%=N;
    clouds.forEach(([y,x],index) =>{
        const [py,px] = [ (y+(dy[d]*s)+5) % N ,(x+(dx[d]*s)+5) % N ];
        clouds[index] = [py,px] , map[py][px]++;
    })
    clouds.forEach(([y,x])=>{
        let count = 0;
        cloudMap[y][x] = true;
        for(let i=2; i<=8; i+=2){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || !map[ny][nx]) continue;
            count++;
        }
        map[y][x]+=count;
    })
    let nextClouds = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(cloudMap[y][x]){
               cloudMap[y][x] = false;
            }
            else if(map[y][x] >=2){
                map[y][x]-=2;
                nextClouds.push([y,x]);
            }
        }
    }
    return nextClouds;
}
const solution = (map,command) =>{
    let cloudMap = Array.from({length:N},()=>Array(N).fill(false));
    let clouds = [[N-1,0],[N-1,1],[N-2,0],[N-2,1]];
    command.reverse();

    while(command.length){
        const [d,s] = command.pop();
        clouds = waterBug(d,s,clouds,cloudMap,map);
    }
    const sum = map.reduce((acc,cur)=>acc+=cur.reduce((acc,cur) => acc+=cur,0),0);
    console.log(sum);
}
solution(map,command);
