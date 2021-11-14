const input = [
'5',
'4 3',
'####',
'#*@.',
'####',
'7 6',
'###.###',
'#*#.#*#',
'#.....#',
'#.....#',
'#..@..#',
'#######',
'7 4',
'###.###',
'#....*#',
'#@....#',
'.######',
'5 5',
'.....',
'.***.',
'.*@*.',
'.***.',
'.....',
'3 3',
'###',
'#@#',
'###',
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const dy =[1,-1,0,0];
const dx =[0,0,1,-1];

const getMinTime = (sanguen,fires,visited,map,isValidPos) =>{
    const [sy,sx] = sanguen;
    visited[sy][sx] = true;
    let fireQueue = fires.length ? fires : [];
    let sanguenQueue = [[...sanguen,1]];
    let fireStart = 0 , sanguenStart=0 , fireEnd , sanguenEnd;
    while(sanguenStart !== sanguenQueue.length){
        sanguenEnd = sanguenQueue.length;
        fireEnd = fireQueue.length;
        for(let i=fireStart; i<fireEnd; i++){
            const [y,x] = fireQueue[i];
            for(let dir = 0; dir<4; dir++){
               const [ny,nx] = [y+dy[dir],x+dx[dir]];
               if(!isValidPos(ny,nx) || map[ny][nx] !=='.') continue;
               map[ny][nx] = '*';
               fireQueue.push([ny,nx]);
            } 
        }
        for(let i=sanguenStart; i<sanguenEnd; i++){
            const [y,x,time] = sanguenQueue[i];
            if(y === 0 || x === 0 || y===map.length-1 || x===map[0].length-1) return time;
            for(let dir =0; dir<4; dir++){
                const [ny,nx] = [y+dy[dir],x+dx[dir]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] !=='.') continue;
                visited[ny][nx] = true;
                sanguenQueue.push([ny,nx,time+1]);
            }
        }
        sanguenStart = sanguenEnd;
        fireStart = fireEnd
    }
    return 'IMPOSSIBLE';
}
const solution = () =>{
    let answer = "";
    let index = 0;
    let T = +input[index++];
    while(T--){
        const [w,h] = input[index++].split(' ').map(Number);
        let map = Array.from({length:h},()=>input[index++].split(''));
        let visited = Array.from({length:h},()=>Array(w).fill(false));
        const isValidPos = (y,x) => (y>=0 && x>=0 && y<h && x<w);
        let sanguen , fires=[];
        for(let y=0; y<h; y++){
            for(let x=0; x<w; x++){
                if(map[y][x] ==='@') sanguen=[y,x] , map[y][x] ='.';
                else if(map[y][x] ==='*') fires.push([y,x]);
            }
        }
        const time = getMinTime(sanguen,fires,visited,map,isValidPos);
        answer +=`${time}\n`;
    }
    console.log(answer.trim());
}
solution();