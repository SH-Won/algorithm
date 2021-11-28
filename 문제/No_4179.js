// const input = ['4 4','####','#JF#','#..#','#..#'];
// const input = ['5 5','....F','...J#','....#','....#','...#.'] // 4
// const input = ['3 3','F.F','.J.','F.F'] //IMPOSIBLE;
// const input = ['5 5','#####','#...#','#.J.#','#...#','#####']; //IMPOSSIBLE
// const input = ['4 4','###F','#J.#','#..#','#..#']; //3 
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C] = input[0].split(' ').map(Number);
const map = Array.from({length:R},(_,i)=>input[i+1].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);

const getMinTime = (jihoon,fires,map) =>{
    let visited = Array.from({length:R},()=>Array(C).fill(false));
    let fireQueue = fires.length ? fires : [];
    let jihoonQueue = [[...jihoon,1]];
    let fireStart = 0 , jihoonStart = 0 , fireEnd , jihoonEnd;
    visited[jihoon[0]][jihoon[1]] = true;
    while(jihoonStart !== jihoonQueue.length){
        jihoonEnd = jihoonQueue.length;
        fireEnd = fireQueue.length;
        for(let i=fireStart; i<fireEnd; i++){
            const [y,x] = fireQueue[i];
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || map[ny][nx] !=='.') continue;
                map[ny][nx] = 'F';
                fireQueue.push([ny,nx]);
            }
        }
        for(let i=jihoonStart; i<jihoonEnd; i++){
            const [y,x,time] = jihoonQueue[i];
            if(y === 0 || x=== 0 || y===R-1 || x===C-1) return time;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] !=='.') continue;
                visited[ny][nx] = true;
                jihoonQueue.push([ny,nx,time+1]);
            }
        }
        jihoonStart = jihoonEnd;
        fireStart = fireEnd;
    }
    return "IMPOSSIBLE";
}
const solution = (map) => {
    let fires = [] , jihoon;
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(map[y][x] ==='J') jihoon = [y,x] , map[y][x] = '.';
            else if(map[y][x] ==='F') fires.push([y,x]);
        }
    }
    const answer = getMinTime(jihoon,fires,map);
    console.log(answer);
}
solution(map);