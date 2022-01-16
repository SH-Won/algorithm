// const input = [
//     '10',
//     '1 1 1 0 0 0 0 1 1 1',
//     '1 1 1 1 0 0 0 0 1 1',
//     '1 0 1 1 0 0 0 0 1 1',
//     '0 0 1 1 1 0 0 0 0 1',
//     '0 0 0 1 0 0 0 0 0 1',
//     '0 0 0 0 0 0 0 0 0 1',
//     '0 0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 1 1 0 0 0 0',
//     '0 0 0 0 1 1 1 0 0 0',
//     '0 0 0 0 0 0 0 0 0 0'
//     ]
    // const input = [
    // '5',
    // '1 0 0 0 1',
    // '0 0 0 0 0',
    // '0 0 0 0 0',
    // '0 0 0 0 0',
    // '1 1 0 0 1',
    // ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
const numbering = (island) =>{
    const N = island.length;
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    const findSameGround = (y,x,number) =>{
        visited[y][x] = true;
        island[y][x] = number;
        let queue = [[y,x]];
        while(queue.length){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >=N || nx >=N || island[ny][nx] !==1) continue;
                visited[ny][nx] = true;
                island[ny][nx] = number;
                queue.push([ny,nx]);
            }
        }
    }
    let number = 1;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x] && island[y][x]){
                number++;
                findSameGround(y,x,number);
            }
        }
    }
}
const getMinBridgeLength = (island) =>{
    const N = island.length;
    let dist = Array.from({length:N},()=>Array(N).fill(-1));
    let queue = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(island[y][x]) queue.push([y,x]) , dist[y][x] = 0;
        }
    }
    let min = Infinity;
    while(queue.length){
        const [y,x] =queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
            if(island[y][x] === island[ny][nx]) continue;
            if(dist[ny][nx] === -1){
               island[ny][nx] = island[y][x];
               dist[ny][nx] = dist[y][x] + 1;
               queue.push([ny,nx]);
            }
            else min = Math.min(min , dist[y][x] + dist[ny][nx]);
        }
    }
    return min;
}
const solution = (input) =>{
    const N = +input[0];
    let island = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    numbering(island);
    const answer = getMinBridgeLength(island);
    console.log(answer);
}
solution(input);