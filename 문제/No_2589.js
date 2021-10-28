// const input = [
// '5 7',
// 'WLLWWWL',
// 'LLLWLLL',
// 'LWLWLWW',
// 'LWLWLLL',
// 'WLLWLWW'
// ]
const input = ['7 7','WLLLLLW','LWLWLWW','LLLWLWW','LWWWLWW','LLLLLWW','LWWWWWW','WWWWWWW']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [ROW,COLUMN] = input[0].split(' ').map(Number);
const map = Array.from({length:ROW},(_,i)=>input[i+1].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];

const solution = () =>{
    let maxTime = 0;
    let visited = Array.from({length:ROW},()=>Array(COLUMN).fill(false));
    const isValidPos = (y,x)=>(y>=0 && x>=0 && y<ROW && x<COLUMN);
    const bfs = (pos) =>{
        const [y,x] = pos;
        visited[y][x] = true;
        let maxTime = 0;
        let queue = [[y,x,0]];
        let isEnd ;
        while(queue.length){
            const [cy,cx,time] = queue.shift();
            isEnd = true;
            for(let i=0; i<4; i++){
                const [ny,nx] = [cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='W') continue;
                visited[ny][nx] = true
                queue.push([ny,nx,time+1]);
                isEnd = false;
            }
            if(isEnd && time > maxTime){
                // console.log(time,cy,cx);
                maxTime = time;
            }
        }
        // console.log(visited.map(row => row.join(' ')).join('\n'))
        visited.forEach(row => row.fill(false));
        return maxTime;
    }
    for(let y=0; y<ROW; y++){
        for(let x=0; x<COLUMN; x++){
            if(!visited[y][x] && map[y][x] === 'L'){
            //    const time = bfs(bfs([y,x]).pos).time;
               const time =bfs([y,x]);
            //    console.log(time);
               maxTime = Math.max(time,maxTime);
            }
        }
    }
    console.log(maxTime);
}
solution();