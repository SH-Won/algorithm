// const input = [
// '6 6',
// '...#..',
// '.##v#.',
// '#v.#.#',
// '#.o#.#',
// '.###.#',
// '...###',
// ] 
// const input = [
// '8 8',
// '.######.',
// '#..o...#',
// '#.####.#',
// '#.#v.#.#',
// '#.#.o#o#',
// '#o.##..#',
// '#.v..v.#',
// '.######.',
// ]
const input = [
'9 12',
'.###.#####..',
'#.oo#...#v#.',
'#..o#.#.#.#.',
'#..##o#...#.',
'#.#v#o###.#.',
'#..#v#....#.',
'#...v#v####.',
'.####.#vv.o#',
'.......####.',
]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C] = input[0].split(' ').map(Number);
const map = Array.from({length:R},(_,i)=>input[i+1].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);
const getAliveCount = (start,map,visited) =>{
    const [sy,sx] = start;
    visited[sy][sx] = true;
    let wolves = 0;
    let sheep = 0;
    map[sy][sx] ==='v' ? wolves++ : sheep++;
    let queue = [start];
    let index = 0;
    while(index < queue.length){
        const [y,x] = queue[index++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='#') continue;
            if(map[ny][nx] ==='v') wolves++;
            else if(map[ny][nx] ==='o') sheep++;
            queue.push([ny,nx]);
            visited[ny][nx] = true;
        }
    }
    return wolves >= sheep ? [wolves,0] : [0,sheep];
}
const solution = (map) =>{
    let totalWolves = 0;
    let totalSheep = 0;
    let visited = Array.from({length:R},()=>Array(C).fill(false));
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(!visited[y][x] && (map[y][x] ==='v'|| map[y][x] ==='o') ){
               const start = [y,x];
               const [aliveWolves,aliveSheeps] = getAliveCount(start,map,visited);
               totalWolves+=aliveWolves;
               totalSheep+=aliveSheeps;
            }
        }
    }
    console.log(`${totalSheep} ${totalWolves}`)
}
solution(map);