// const input = [
//     '5 5',
//     '1 2 3 4 5',
//     '5 4 3 2 1',
//     '2 3 4 5 6',
//     '6 5 4 3 2',
//     '1 2 1 2 1',
//     ]
    // const input = [
    // '4 5',
    // '1 2 3 4 5',
    // '1 2 3 4 5',
    // '1 2 3 4 5',
    // '1 2 3 4 5',
    // ]
    const input = [
        '4 10',
        '1 2 1 2 1 2 1 2 1 2',
        '2 1 2 1 2 1 2 1 2 1',
        '1 2 1 2 1 2 1 2 1 2',
        '2 1 2 1 2 1 2 1 2 1'
    ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N}, (_,i) => input[i+1].split(' ').map(Number));
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
const getMinoT = (y,x) =>{
    let max = 0;
loop:for(let i=0; i<4; i++){
        let sum = map[y][x];
        for(let j=0; j<3; j++){
            const [ny,nx] = [y+dy[(i+j) % 4],x+dx[(i+j) % 4]];
            if(!isValidPos(ny,nx)) continue loop;
            sum+=map[ny][nx];
        }
        max = Math.max(max,sum);
    }
    return max;
}
const solution = (map) =>{
    let max = 0;
    let visited = Array.from({length:N}, ()=>Array(M).fill(false));
    const putMino = (y,x,count,sum) =>{
        if(count === 3){
            max = Math.max(sum,max);
            return 
        }
        visited[y][x] = true;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx]) continue;
            visited[ny][nx] = true;
            putMino(ny,nx,count+1,sum+map[ny][nx]);
            visited[ny][nx] = false;
        }
        visited[y][x] = false;
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            putMino(y,x,0,map[y][x]);
            const minoT = getMinoT(y,x);
            max=Math.max(minoT,max);
        }
    }
    console.log(max);
}
solution(map);