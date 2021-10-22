// // a b c d e f;
// let visited = Array.from({length:N},()=>Array.from({length:M},()=>Array(6).fill(false)));
// console.log(1<<0); //01
// console.log(1<<1); //10
// console.log(1<<2); //100
// console.log(1<<0|1<<1|1<<2) //111
//  console.log(1<<3 & (1<<0|1<<1|1<<2)) //1000 111
// const input = ['1 7','f0.F..1'];
// const input = [
//     '5 5',
//     '....1',
//     '#1###',
//     '.1.#0',
//     '....A',
//     '.1.#.'
     
// ]
const input = [
'7 8',
'a#c#eF.1',
'.#.#.#..',
'.#B#D###',
'0....F.1',
'C#E#A###',
'.#.#.#..',
'd#f#bF.1'
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
let visited = Array.from({length:N},()=>Array.from({length:M},()=>Array(1<<6).fill(false)));
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
const bfs = (y,x) =>{
    visited[y][x][0]  = true;
    let queue = [[y,x,0,0]];
    while(queue.length){
        const [cy,cx,time,key] = queue.shift();
        if(map[cy][cx] === '1') return time;
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx][key] || map[ny][nx] ==='#') continue;

            if(map[ny][nx] ==='.' || map[ny][nx] ==='1' || map[ny][nx] ==='0'){
                visited[ny][nx][key] = true;
                queue.push([ny,nx,time+1,key])
            }
            else if(map[ny][nx] >= 'a' && map[ny][nx] <='f'){
                const newKey = key | (1<<(map[ny][nx].charCodeAt() - 'a'.charCodeAt()));
                visited[ny][nx][newKey] = true;
                queue.push([ny,nx,time+1,newKey]);
            }
            else{
                const isUnLock = key & (1<<(map[ny][nx].charCodeAt() - 'A'.charCodeAt()))
                if(isUnLock){
                    visited[ny][nx][key] = true;
                    queue.push([ny,nx,time+1,key]);
                }
            }
            
        }
    }
    return -1
}
const solution = () =>{
    let [y,x] = [null,null]
    for(let i=0; i<N; i++){
        for(let j=0; j<M; j++){
           if(map[i][j] ==='0') y=i , x=j
        }
    }

    const answer = bfs(y,x);
    console.log(answer);
}
solution();